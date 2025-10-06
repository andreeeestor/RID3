import { ReactElement } from "react";
import { Text, View } from "react-native";

interface GoogleTextInputProps {
  icon?: ReactElement;
  containerStyle?: string;
  handlePress?: () => void;
  textInputBackgroundColor?: string;
  initialLocation?: any;
}
export default function GoogleTextInput(props: GoogleTextInputProps) {
  return (
    <View className={`flex flex-row items-center justify-center relative z-40 rounded-xl ${props.containerStyle} mb-5`}>
      <Text>Pesquisar</Text>
    </View>
  );
}
