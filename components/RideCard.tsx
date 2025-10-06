import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import { Image, Text, View } from "react-native";
import Fa5Icon from "./Fa5Icon";

interface RideCardProps {
  ride: Ride;
}
export default function RideCard(props: RideCardProps) {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-center justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${props.ride.destination_longitude},${props.ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Fa5Icon name="location-arrow" size={24} />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {props.ride.origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Fa5Icon name="map-pin" size={24} />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {props.ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Data & Hora
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {formatDate(props.ride.created_at)},{" "}
              {formatTime(props.ride.ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Motorista
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {props.ride.driver.first_name}, {props.ride.driver.last_name}
            </Text>
          </View>

          {/* Essa parte pode colocar as cilindradas da moto */}
          {/* <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Motorista
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {props.ride.driver.first_name},{" "}
              {props.ride.driver.last_name}
            </Text>
          </View> */}

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Status do Pagamento
            </Text>
            <Text
              className={`text-md uppercase font-JakartaMedium text-gray-500 ${
                props.ride.payment_status === "paid"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {props.ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
