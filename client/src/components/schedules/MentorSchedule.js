import * as React from "react";
import Paper from "@mui/material/Paper";
import sendEmail from "./sendEmail";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import Button from "@mui/material/Button";
import { fetchMeetings, bookMeeting, cancelMeeting } from "../../MeetingsApi";

const resources = [
  {
    fieldName: "isBooked",
    instances: [
      { id: true, text: "Not Available", color: "#ef5350" },
      { id: false, text: "Available", color: "#4caf50" },
    ],
  },
];

export default class MentorSchedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: new Date().toISOString().slice(0, 10),
      startDayHour: 9,
      endDayHour: 19,
    };
  }

  componentDidMount() {
    const getMeetings = async () => {
      const meetings = await fetchMeetings(this.props.mentorId);
      this.setState({ data: meetings });
    };
    getMeetings();
  }

  MeetingControllers = ({ appointmentData, onHide }) => (
    <>
      <Button
        sx={{ margin: "5px" }}
        disabled={appointmentData.isBooked}
        variant="contained"
        onClick={() => {
          this.props.user
            ? bookMeeting(appointmentData.id, this.props.user._id).then(
                (response) => {
                  const newData = [...this.state.data];
                  const appointmentIndex = newData.findIndex(
                    (appointment) => appointment.id === appointmentData.id
                  );
                  newData[appointmentIndex].isBooked = true;
                  sendEmail(
                    this.props.mentorId,
                    this.props.user,
                    appointmentData,
                    'book'
                  );
                  this.setState({ data: newData });
                  onHide();
                }
              )
            : alert("You have to be logged in to book a meeting.");
        }}
      >
        Book This Meeting
      </Button>
      {appointmentData.mentee === this.props.user._id &&
      <Button
        sx={{ margin: "5px" }}
        disabled={!appointmentData.isBooked}
        variant="contained"
        onClick={() => {
          this.props.user
            ? cancelMeeting(appointmentData.id, this.props.user._id).then(
                (response) => {
                  this.setState((state) => {
                    const { data } = state;
                    const newData = [...data];
                    const appointmentIndex = newData.findIndex(
                      (appointment) => appointment.id === appointmentData.id
                    );
                    newData[appointmentIndex].isBooked = false;
                    sendEmail(
                      this.props.mentorId,
                      this.props.user,
                      appointmentData,
                      'cancel'
                    );
                    return { data: newData };
                  });
                  onHide();
                }
              )
            : alert("You have to be logged in to book a meeting.");
        }}
      >
        Cancel This Meeting
      </Button>
      }
    </>
  );

  

  render() {
    const { currentDate, data, startDayHour, endDayHour } = this.state;
    this.currentDateChange = (currentDate) => {
      console.log(currentDate);
      this.setState({ currentDate });
    };

    return (
      <div
        style={{
          width: "min(800px, 100%)",
          backgroundColor: "white",
          borderRadius: "5px",
          border: '1px solid gray'
        }}
      >
        <Scheduler data={data} height={600}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
          <MonthView />
          <Appointments />
          <AppointmentTooltip headerComponent={this.MeetingControllers} />
          <Resources data={resources} />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </div>
    );
  }
}
