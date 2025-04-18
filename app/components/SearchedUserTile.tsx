import moment from "moment";
import { Pressable, View } from "react-native";
import { contactTileImage, logIn } from "../styles/styles";
import ImageViewer from "./ImageViewer";
import { User } from "../../types/databaseTypes";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useNavigation } from "@react-navigation/native";
const blankProfileImg = require("../../assets/freepik-basic-placeholder-profile-picture.png");

export default function SearchedUserTile({ user }: { user: User }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <View>
        <ImageViewer
          imgSource={blankProfileImg}
          selectedImage={user.avatar_url}
          className={contactTileImage}
        />
        <Text>{user.first_name + " " + user.last_name}</Text>
        <Text>
          {moment(user.date_of_birth)
            .fromNow()
            .split(" ")
            .slice(0, 2)
            .join(" ") + " old"}
        </Text>
        <Text>Timezone: {user.timezone.split("/")[1].replace("_", " ")} </Text>
        <Pressable
          className={logIn}
          onPress={() => {
            navigation.navigate("SearchedUserScreen", { user });
          }}
        >
          <Text className="text-white">Kinnect with {user.first_name}</Text>
        </Pressable>
      </View>
    </View>
  );
}
