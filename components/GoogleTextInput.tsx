import { ReactElement } from "react";
import { Text, View } from "react-native";
import "react-native-get-random-values";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface GoogleTextInputProps {
  icon?: ReactElement;
  containerStyle?: string;
  handlePress?: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  textInputBackgroundColor?: string;
  initialLocation?: string;
}

export default function GoogleTextInput({
  icon,
  containerStyle,
  handlePress,
  textInputBackgroundColor,
  initialLocation = "",
}: GoogleTextInputProps) {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey || apiKey === "missing api key") {
    return (
      <View
        className={`flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5 bg-red-100 p-4`}
      >
        <Text className="text-red-600 text-sm font-semibold text-center">
          ⚠️ Google Maps API Key não configurada.{"\n"}
          Adicione EXPO_PUBLIC_GOOGLE_API_KEY no arquivo .env
        </Text>
      </View>
    );
  }

  return (
    <View
      className={`flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Para onde você quer ir?"
        debounce={200}
        minLength={2}
        predefinedPlaces={[]}
        query={{
          key: apiKey,
          language: "pt-BR",
          components: "country:br",
        }}
        onPress={(data, details = null) => {
          if (details && handlePress) {
            handlePress({
              latitude: details.geometry.location.lat!,
              longitude: details.geometry.location.lng!,
              address: data.description,
            });
          }
        }}
        onFail={(error) => {
          console.error("Erro no GooglePlacesAutocomplete:", error);
        }}
        textInputProps={{
          placeholderTextColor: "#9CA3AF",
          placeholder: initialLocation || "Para onde você quer ir?",
        }}
        styles={{
          container: {
            flex: 0,
            position: "relative",
            width: "100%",
          },
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            marginHorizontal: 0,
            position: "relative",
            backgroundColor: textInputBackgroundColor || "#F5F5F5",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "#F5F5F5",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 0,
            width: "100%",
            borderRadius: 12,
            paddingLeft: icon ? 50 : 20,
            height: 45,
            color: "#1F2937",
          },
          listView: {
            backgroundColor: "#FFFFFF",
            position: "relative",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
            marginTop: 8,
            zIndex: 99,
          },
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            height: 60,
            flexDirection: "row",
            alignItems: "center",
          },
          separator: {
            height: 1,
            backgroundColor: "#F3F4F6",
          },
          description: {
            fontSize: 14,
            color: "#1F2937",
            fontWeight: "500",
          },
          poweredContainer: {
            display: "none",
          },
        }}
        renderLeftButton={() =>
          icon ? (
            <View className="absolute left-4 top-3 z-50">{icon}</View>
          ) : null
        }
        enablePoweredByContainer={false}
        isRowScrollable={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        keepResultsAfterBlur={false}
        listEmptyComponent={() => (
          <View className="p-4">
            <Text className="text-gray-500 text-center text-sm">
              Nenhum resultado encontrado
            </Text>
          </View>
        )}
        
      />
    </View>
  );
}
