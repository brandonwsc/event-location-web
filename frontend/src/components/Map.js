import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";

function Map(props) {
  //   const markers = [
  //     {
  //       id: 1,
  //       name: "Chicago, Illinois",
  //       position: { lat: 41.881832, lng: -87.623177 },
  //     },
  //     {
  //       id: 2,
  //       name: "Denver, Colorado",
  //       position: { lat: 39.739235, lng: -104.99025 },
  //     },
  //   ];

  const [activeMarker, setActiveMarker] = useState(null);
  const navigate = useNavigate();

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    navigate(`/location/event?venueId=${marker}`);
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    props.markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };
  //   console.log("props.markers: ", props.markers);
  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={props.style}
    >
      {props.markers.map(({ id, name, position }) => (
        <MarkerF
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {/* {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null} */}
        </MarkerF>
      ))}
    </GoogleMap>
  );
}

export default Map;
