"use client";

import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { Box, Typography, CircularProgress } from "@mui/material";

interface DeliveryMapProps {
  address: string;
  merchantAddress?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

function GeocoderComponent({
  address,
  onCoordinatesFound,
  onError,
}: {
  address: string;
  onCoordinatesFound: (coords: Coordinates) => void;
  onError: (error: string) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !address) return;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (
        status === google.maps.GeocoderStatus.OK &&
        results &&
        results.length > 0
      ) {
        const location = results[0].geometry.location;
        onCoordinatesFound({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        onError(`Geocoding failed: ${status}`);
      }
    });
  }, [map, address, onCoordinatesFound, onError]);

  return null;
}

function DirectionsRenderer({
  origin,
  destination,
}: {
  origin: Coordinates;
  destination: Coordinates;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#4285F4",
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
    });

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      },
    );

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [map, origin, destination]);

  return null;
}

export default function DeliveryMap({
  address,
  merchantAddress,
}: DeliveryMapProps) {
  const [deliveryCoordinates, setDeliveryCoordinates] =
    useState<Coordinates | null>(null);
  const [merchantCoordinates, setRestaurantCoordinates] =
    useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const handleDeliveryCoordinatesFound = (coords: Coordinates) => {
    setDeliveryCoordinates(coords);
    if (!merchantAddress || merchantCoordinates) {
      setLoading(false);
    }
  };

  const handleRestaurantCoordinatesFound = (coords: Coordinates) => {
    setRestaurantCoordinates(coords);
    if (deliveryCoordinates) {
      setLoading(false);
    }
  };

  const handleError = (errorMessage: string) => {
    console.error("Error geocoding address:", errorMessage);
    setError("Could not find location on map");
    setLoading(false);
  };

  const getCenter = () => {
    if (!deliveryCoordinates) return undefined;

    if (!merchantCoordinates) return deliveryCoordinates;

    return {
      lat: (deliveryCoordinates.lat + merchantCoordinates.lat) / 2,
      lng: (deliveryCoordinates.lng + merchantCoordinates.lng) / 2,
    };
  };

  const getZoom = () => {
    if (!deliveryCoordinates || !merchantCoordinates) return 15;

    const latDiff = Math.abs(deliveryCoordinates.lat - merchantCoordinates.lat);
    const lngDiff = Math.abs(deliveryCoordinates.lng - merchantCoordinates.lng);
    const maxDiff = Math.max(latDiff, lngDiff);

    if (maxDiff > 0.1) return 11; // Very far
    if (maxDiff > 0.05) return 12; // Far
    if (maxDiff > 0.01) return 13; // Medium
    if (maxDiff > 0.005) return 14; // Closer
    return 15; // Very close
  };

  if (!address) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography>No address provided</Typography>
      </Box>
    );
  }

  if (
    loading &&
    !error &&
    (!deliveryCoordinates || (merchantAddress && !merchantCoordinates))
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
        <APIProvider apiKey={apiKey}>
          <div style={{ display: "none" }}>
            <Map mapId="hidden-map">
              <GeocoderComponent
                address={address}
                onCoordinatesFound={handleDeliveryCoordinatesFound}
                onError={handleError}
              />
              {merchantAddress && (
                <GeocoderComponent
                  address={merchantAddress}
                  onCoordinatesFound={handleRestaurantCoordinatesFound}
                  onError={handleError}
                />
              )}
            </Map>
          </div>
        </APIProvider>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!deliveryCoordinates) {
    return (
      <Box sx={{ my: 2 }}>
        <Typography>Could not locate delivery address on map</Typography>
      </Box>
    );
  }

  const center = getCenter();
  const zoom = getZoom();

  return (
    <Box sx={{ height: 300, width: "100%", my: 2 }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={zoom}
          defaultCenter={center}
          mapId="delivery-map"
          gestureHandling="cooperative"
        >
          <Marker
            position={deliveryCoordinates}
            title="Delivery Location"
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
          {merchantCoordinates && (
            <>
              <Marker
                position={merchantCoordinates}
                title="Merchant Location"
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />

              <DirectionsRenderer
                origin={merchantCoordinates}
                destination={deliveryCoordinates}
              />
            </>
          )}
        </Map>
      </APIProvider>
    </Box>
  );
}
