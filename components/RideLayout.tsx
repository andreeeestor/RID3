import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { ReactNode, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";

interface RideLayoutProps {
  children: ReactNode;
  title: string;
  snapPoints?: string[]
}
export default function RideLayout(props: RideLayoutProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-orange-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <ArrowLeftIcon size={24} />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">
              {props.title || "Retornar"}
            </Text>
          </View>
          <Map />
        </View>

        <BottomSheet ref={bottomSheetRef} snapPoints={props.snapPoints || ["40%", "85%"]} index={0}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {props.children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
