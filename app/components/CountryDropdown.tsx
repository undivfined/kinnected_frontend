import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { pickerInput } from "../styles/styles";
import countryData from "../../countriesData";

function CountryDropdown({
  setCountryTimezones,
}: {
  setCountryTimezones: Function;
}) {
  const [country, setCountry] = useState("");

  return (
    <View className={pickerInput}>
      <Dropdown
        mode="modal"
        data={countryData}
        search
        labelField="country"
        valueField="timezones"
        placeholder={country ? country : "Select your country"}
        searchPlaceholder="Search..."
        value={country}
        onChange={(item) => {
          setCountry(item.country);
          setCountryTimezones(item.timezones);
        }}
      />
    </View>
  );
}

export default CountryDropdown;
