import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { pickerInput } from "../styles/styles";
import { NewUser } from "../../types/NewUserType";

function TimezonesDropdown({
  countryTimezones,
  setNewUserDetails,
  newUserDetails,
}: {
  setNewUserDetails: Function;
  countryTimezones: string[];
  newUserDetails: NewUser;
}) {
  const timezonesMapped = countryTimezones.map((timezone) => {
    return { timezone: timezone };
  });

  return (
    <View className={pickerInput}>
      <Dropdown
        mode="auto"
        data={timezonesMapped}
        labelField="timezone"
        valueField="timezone"
        placeholder="Select your timezone"
        value={newUserDetails.timezone}
        onChange={(item) => {
          setNewUserDetails((current: NewUser) => {
            return { ...current, timezone: item.timezone };
          });
        }}
      />
    </View>
  );
}

export default TimezonesDropdown;
