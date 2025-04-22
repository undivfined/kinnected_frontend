import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { pickerInput } from "../styles/styles";

function RelationshipDropdown({
  value,
  setter,
}: {
  setter: Function;
  value: { [key: string]: string | undefined | null };
}) {
  const data = [
    { type: "Family" },
    { type: "Friend" },
    { type: "Colleague" },
    { type: "Neighbour" },
    { type: "Other" },
  ];

  return (
    <View className={pickerInput}>
      <Dropdown
        mode="auto"
        data={data}
        labelField="type"
        valueField="type"
        placeholder="Select"
        value={value.type_of_relationship}
        onChange={(item) => {
          setter("type_of_relationship", item.type);
        }}
      />
    </View>
  );
}

export default RelationshipDropdown;
