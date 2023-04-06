import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import { UserEventFileCardRegular } from "./UserEventFileCard";
import placeholder_canRemove from "./placeholder_canRemove.png";
import {
  UserCommentSection,
  UserCommentInput,
  UserCommentParent,
} from "./UserCommentSection";
import Map from "../components/Map";
import { backendUrl } from "../variables";

/** Components for Event Pages http://localhost:3000/Location/ABC/Events
 */

/**
 * UserEventLocationHead: Information of the location e.g. address, map and Comment input box
 */
function UserEventLocationHead() {
  const [locationData, setLocationData] = useState("");
  const [mapArray, setMapArray] = useState("");
  //   const [eventArray, setEventArray] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  useEffect(() => {
    fetchLocation();
  }, []);
  const fetchLocation = () => {
    const venueId = params.get("venueId");
    // console.log("url venueId", venueId);
    fetch(`${backendUrl}/venue/one/?venueId=${venueId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setLocationData(data.data.venue);
        let tmpMap = [
          {
            id: data.data.venue.id,
            name: data.data.venue.name,
            position: {
              lat: data.data.venue.latitude,
              lng: data.data.venue.longitude,
            },
          },
        ];
        // console.log("tmpMap", tmpMap);
        setMapArray(tmpMap);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    mapArray.length > 0 && (
      <div className="row mt-3">
        <div className="col-7">
          <h2 className="mx-1 mt-3" style={{ color: "#181E84" }}>
            {locationData.name}
          </h2>

          <div className="row">
            <p className="mx-1 mt-3">
              Latitude: {locationData.latitude}, Longitude:
              {locationData.longitude}
            </p>
            {/* <p className="mx-3">
            <i className="fa fa-info"></i> This is some information about the
            location
          </p> */}
          </div>

          {/* <div className="row">
            <UserCommentInput />
          </div> */}
          <UserCommentSection />
          {/* <UserCommentParent /> */}
        </div>

        <div className="row col-5">
          <Map markers={mapArray} style={{ width: "100vw", height: "50vh" }} />
        </div>
      </div>
    )
  );
}

/**
 * UserEventLocationHead: A list of event and searching bar
 */
function UserEventList() {
  const [eventArray, setEventArray] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  useEffect(() => {
    fetchEvent();
  }, []);
  const fetchEvent = () => {
    const venueId = params.get("venueId");
    fetch(`${backendUrl}/event/venue/all/?venueId=${venueId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setEventArray(data.data);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    eventArray.length > 0 && (
      <section className="pb-3">
        <h2 className="m-3 text-center">Events</h2>

        <div className="row mx-1">
          {eventArray.map((event, index) => (
            <UserEventFileCardRegular event={event} />
          ))}
        </div>
      </section>
    )
  );
}

export { UserEventLocationHead, UserEventList };
