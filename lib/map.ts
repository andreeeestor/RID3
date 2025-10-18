import { Driver, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: -19.9167,
      longitude: -43.9345,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3;
  const longitudeDelta = (maxLng - minLng) * 1.3;

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateTimeFromDistance = (distanceKm: number): number => {
  const avgSpeed = 30;
  return (distanceKm / avgSpeed) * 60;
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  if (!directionsAPI || directionsAPI === 'missing api key') {
    console.warn('Google Maps API key não configurada, usando cálculo por distância');
    
    return markers.map((marker) => {
      const distToUser = calculateDistance(
        marker.latitude,
        marker.longitude,
        userLatitude,
        userLongitude
      );
      const distToDestination = calculateDistance(
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude
      );

      const totalTime =
        calculateTimeFromDistance(distToUser) +
        calculateTimeFromDistance(distToDestination);
      const price = (totalTime * 0.5).toFixed(2);

      return { ...marker, time: totalTime, price };
    });
  }

  try {
    const timesPromises = markers.map(async (marker) => {
      try {
        const responseToUser = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
        );
        
        if (!responseToUser.ok) {
          throw new Error(`HTTP error! status: ${responseToUser.status}`);
        }

        const dataToUser = await responseToUser.json();

        if (dataToUser.status === 'REQUEST_DENIED') {
          console.error('Google Maps API: REQUEST_DENIED -', dataToUser.error_message);
          throw new Error('API_KEY_INVALID');
        }

        if (dataToUser.status === 'OVER_QUERY_LIMIT') {
          console.error('Google Maps API: OVER_QUERY_LIMIT');
          throw new Error('QUOTA_EXCEEDED');
        }

        if (!dataToUser.routes || dataToUser.routes.length === 0) {
          throw new Error('NO_ROUTES_FOUND');
        }

        const responseToDestination = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
        );

        if (!responseToDestination.ok) {
          throw new Error(`HTTP error! status: ${responseToDestination.status}`);
        }

        const dataToDestination = await responseToDestination.json();

        if (!dataToDestination.routes || dataToDestination.routes.length === 0) {
          throw new Error('NO_ROUTES_FOUND');
        }

        const timeToUser = dataToUser.routes[0].legs[0].duration.value;
        const timeToDestination = dataToDestination.routes[0].legs[0].duration.value;

        const totalTime = (timeToUser + timeToDestination) / 60;
        const price = (totalTime * 0.5).toFixed(2);

        return { ...marker, time: totalTime, price };
      } catch (error) {
        console.warn(`Usando cálculo por distância para motorista ${marker.id}:`, error);

        const distToUser = calculateDistance(
          marker.latitude,
          marker.longitude,
          userLatitude,
          userLongitude
        );
        const distToDestination = calculateDistance(
          userLatitude,
          userLongitude,
          destinationLatitude,
          destinationLongitude
        );

        const totalTime =
          calculateTimeFromDistance(distToUser) +
          calculateTimeFromDistance(distToDestination);
        const price = (totalTime * 0.5).toFixed(2);

        return { ...marker, time: totalTime, price };
      }
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
    
    return markers.map((marker) => {
      const distToUser = calculateDistance(
        marker.latitude,
        marker.longitude,
        userLatitude,
        userLongitude
      );
      const distToDestination = calculateDistance(
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude
      );

      const totalTime =
        calculateTimeFromDistance(distToUser) +
        calculateTimeFromDistance(distToDestination);
      const price = (totalTime * 0.5).toFixed(2);

      return { ...marker, time: totalTime, price };
    });
  }
};