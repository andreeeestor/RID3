import { useLocationStore } from "@/store/useLocationStore";
import { Text, View } from "react-native";

export default function FindRidePage() {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return <View>
    <Text className="text-2xl"></Text>
  </View>;
}
