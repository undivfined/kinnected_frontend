import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "../styles/styles";

function TimezonesDropdown({
  countryTimezones,
  setNewUserDetails,
  newUserDetails,
}: {
  setNewUserDetails: Function;
  countryTimezones: string[];
  newUserDetails: { [key: string]: string | null };
}) {
  const timezonesMapped = countryTimezones.map((timezone) => {
    return { timezone: timezone };
  });

  return (
    <View className={styles.pickerInput}>
      <Dropdown
        mode="auto"
        data={timezonesMapped}
        labelField="timezone"
        valueField="timezone"
        placeholder="Select timezone"
        value={newUserDetails.timezone}
        onChange={(item) => {
          setNewUserDetails((current: { [key: string]: string }) => {
            return { ...current, timezone: item.timezone };
          });
        }}
      />
    </View>
  );
}

export default TimezonesDropdown;
