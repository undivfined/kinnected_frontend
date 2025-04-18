import { Pressable, Text, TextInput, View } from "react-native";
import {
  container,
  headingTwo,
  inputLabel,
  logIn,
  textInput,
} from "../styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "SearchedUserScreen">;

export default function SearchedUserScreen({ route }: Props) {
  const { user } = route.params;
  return (
    <>
      <View className={container}>
        <Text className={headingTwo}>User</Text>
      </View>

      <View className={container}>
        <Text className={inputLabel}>
          {user.first_name + " " + user.last_name}
        </Text>
        <TextInput className={textInput} />

        <Text className={inputLabel}>Birthday</Text>
        <TextInput className={textInput} />

        <Text className={inputLabel}>City</Text>
        <TextInput className={textInput} />
      </View>

      <Pressable className={logIn}>
        <Text className="text-white">Add Connection</Text>
      </Pressable>
    </>
  );
}
