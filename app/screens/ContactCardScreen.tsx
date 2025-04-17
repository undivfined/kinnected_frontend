import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { View } from "react-native";
import { container } from "../styles/styles";

type Props = NativeStackScreenProps<RootStackParamList, 'ContactCardScreen'>;


export default function ContactCardScreen({ navigation }: Props){
    return (
    <View className={container}>

    </View>
    )
}