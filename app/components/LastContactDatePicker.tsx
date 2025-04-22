import { Pressable, Text, View } from "react-native";
import { textInput } from "../styles/styles";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

function LastContactDatePicker({
  setter,
  value,
}: {
  setter: Function;
  value: { [key: string]: string | undefined | null };
}) {
  const [showCalender, setShowCalender] = useState(false);

  function onDateChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    if (event.type === "set" && selectedDate) {
      setter("date_of_last_contact", selectedDate.toISOString());
    }
    setShowCalender(false);
  }

  return (
    <View>
      <Pressable
        className={textInput}
        onPress={() => {
          setShowCalender(true);
        }}
      >
        <Text>
          {value.date_of_last_contact
            ? new Date(value.date_of_last_contact).toLocaleDateString("en-GB")
            : "Can't remember..."}
        </Text>
      </Pressable>

      {showCalender && (
        <DateTimePicker
          value={
            value.date_of_last_contact
              ? new Date(value.date_of_last_contact)
              : new Date(Date.now())
          }
          mode="date"
          onChange={(event, selectedDate) => {
            onDateChange(event, selectedDate);
          }}
        />
      )}
    </View>
  );
}

export default LastContactDatePicker;
