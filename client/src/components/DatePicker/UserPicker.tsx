/*import React from "react";
import { useState } from "react";
import { Stylesheet, Text, View } from "react-native";
import { DateRangePicker } from "./dateRangePicker/DateRangePicker";
function UserPicker() {
  const [state, setState] = useState({
    fromDate: "",
    toDate: "",
    dateError: "",
  });
  const [holidayList, setHolidayList] = userState([]);
  return (
    <View>
      <DateRangePicker
        onSuccess={(start: any, end: any) => {
          setState({
            ...state,
            fromDate: start,
            toDate: end,
            dateError: "",
          });
        }}
        holidayList={holidayList}
        errorMessage={state?.dateError}
      />
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {" "}
          Start Date:{state.fromDate}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {" "}
          End Date:{state.toDate}
        </Text>
      </View>
    </View>
  );
}
const style = Stylesheet.create({});
export default UserPicker;*/
