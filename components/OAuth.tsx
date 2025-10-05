import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import CustomButton from "./CustomButton";

export default function OAuth() {
  const handleGoogleSignIn = async () => {};
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-px bg-general-100" />
        <Text className="text-lg">OU</Text>
        <View className="flex-1 h-px bg-general-100" />
      </View>

      <CustomButton
        title="Entrar com Google"
        className="mt-5 w-full shadow-none"
        IconLeft={<Icon name="google" size={16} className="mx-2" />}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
}
