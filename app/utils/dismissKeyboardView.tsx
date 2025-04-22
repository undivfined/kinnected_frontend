import React, { ReactNode } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

type DismissKeyboardViewProps = {
  children: ReactNode;
};

const DismissKeyboardView = ({ children }: DismissKeyboardViewProps) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  if (Platform.OS === "web") {
    return (
      <Pressable
        onPress={(e) => {
          const target = e.target as unknown as HTMLElement;
          const tag = target.tagName.toLowerCase();
          if (tag !== "input" && tag !== "textarea") {
            dismissKeyboard();
          }
        }}
        style={styles.container}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DismissKeyboardView;