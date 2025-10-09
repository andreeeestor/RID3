import { drivers } from "@/data/mockData";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore } from "@/store/useDriverStore";
import { useLocationStore } from "@/store/useLocationStore";
import { MarkerData } from "@/types/type";
import { cssInterop } from "nativewind";
import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { images } from "@/constants";

cssInterop(MapView, {
  className: "style",
});

export default function Map() {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setSelectedDriver } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers]);

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="h-full w-full rounded-2xl"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
    >
      {markers.map((marker) => (
        <Marker key={marker.id}
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude
        }}
        title={marker.title}
        image={selectedDriver === marker.id && images.marker}
        />
      ))}
    </MapView>
  );
}
