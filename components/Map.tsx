import { cssInterop } from "nativewind";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

cssInterop(MapView, {
  className: "style",
});

export default function Map() {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="h-full w-full rounded-2xl"
      showsPointsOfInterest={false}
      showsUserLocation={true}
    />
  );
}
