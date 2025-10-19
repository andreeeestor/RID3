import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChatsCircleIcon } from "phosphor-react-native";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-2xl font-JakartaBold">Chat</Text>
        <View className="flex-1 h-fit flex justify-center items-center">
          <ChatsCircleIcon size={64} />
          <Text className="text-3xl font-JakartaBold mt-3">Sem mensagens</Text>
          <Text className="text-base mt-2 text-center px-7 italic">
            ainda...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
