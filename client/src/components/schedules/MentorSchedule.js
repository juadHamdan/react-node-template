import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@mui/material/Button';




const resources = [{
  fieldName: 'isBooked',
  instances: [
    { id: true, text: "Not Available", color: '#ef5350' },
    { id: false, text: "Available", color: '#4caf50' },
  ],
}];

export default class MentorSchedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.meetings,
      currentDate: new Date().toISOString().slice(0, 10),
      startDayHour: 9,
      endDayHour: 19,
    };
  }

  BookMeetingBtn = (({appointmentData, onHide}) => (
    <Button 
      sx={{margin: '5px'}} 
      disabled={appointmentData.isBooked} 
      variant="contained"
      onClick={() => {
      console.log(appointmentData.id)

      this.setState((state) => {
        const { data } = state;
        const newData = [...data]
        const appointmentIndex = newData.findIndex(appointment => appointment.id === appointmentData.id)
        newData[appointmentIndex].isBooked = true
        return { data: newData };
      });
      //render or close the 
      onHide()
    }} 
    >
      Book This Meeting
    </Button>
  ));

  render() {
    const {
      currentDate,
      data,
      startDayHour,
      endDayHour,
    } = this.state;
    this.currentDateChange = (currentDate) => {
      console.log(currentDate)
      this.setState({ currentDate });
    };

    return (
      <Paper>
        <div style={{ height: '80vh', width: '90vw' }}>
          <Scheduler
            data={data}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <WeekView
              startDayHour={startDayHour}
              endDayHour={endDayHour}
            />
            <MonthView />
            <Appointments />
            <AppointmentTooltip
              headerComponent={this.BookMeetingBtn}
            />
            <Resources
              data={resources}
            />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
          </Scheduler>
        </div>
      </Paper>
    );
  }
}
