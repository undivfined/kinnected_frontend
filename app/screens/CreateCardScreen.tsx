import { Text, View } from "react-native";
import DismissKeyboardView from "../utils/dismissKeyboardView";


export default function CreateCardScreen () {

    return (
        <DismissKeyboardView>
            <View>
                <Text>
                    Hi
                </Text>
            </View>
        </DismissKeyboardView>
    )
} 