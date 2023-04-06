import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import placeholder_canRemove from "./placeholder_canRemove.png";
import { UserEventFileCardSmall } from "./UserEventFileCard";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { backendUrl } from "../variables";

// Components for showing location/venue information of different pages

//UserVenueFileCard: location and latest event in the location pages http://localhost:3000/Location/

function UserVenueFileCard(props) {
  return (
    props.data && (
      <tr>
        <th scope="row">
          <div className="row">
            <Link
              to={`/location/event?venueId=${props.data.venueId}`}
              className="col-10"
            >
              <h5 style={{ color: "#181E84" }}>{props.data.name}</h5>
            </Link>
            <HeartIcon data={props.data} favourite={props.favourite} />
          </div>

          <div className="row">
            <div>
              Latitude: {props.data.latitude}, Longitude: {props.data.longitude}
            </div>
          </div>
        </th>
        {/* 
        <td className="">
          <div>
            <UserEventFileCardSmall />
          </div>
        </td> */}
      </tr>
    )
  );
}

function UserFavouriteVenueFileCard(props) {
  //   console.log("props.data", props.data);
  const addFavourite = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    var userId = sessionStorage.getItem("userId");
    urlencoded.append("userId", userId);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:1337/venue/favourite/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    props.data && (
      <tr>
        <th scope="row">
          <div className="row">
            <Link
              to={`/Location/${props.data.venueId}/Events`}
              className="col-10"
            >
              <h5 style={{ color: "#181E84" }}>{props.data.name}</h5>
            </Link>
          </div>

          <div className="row">
            <div>
              Latitude: {props.data.latitude}, Longitude: {props.data.longitude}
            </div>
          </div>
        </th>
        {/* 
        <td className="">
          <div>
            <UserEventFileCardSmall />
          </div>
        </td> */}
      </tr>
    )
  );
}

function HeartIcon(props) {
  const [isFavourite, setIsFavourite] = useState("");

  useEffect(() => {
    let i;
    setIsFavourite(false);
    for (i = 0; i < props.favourite.length; i++) {
      if (props.data.venueId === props.favourite[i]) {
        // console.log(props.data.venueId, props.favourite[i]);
        setIsFavourite(true);
        break;
      }
    }
  }, []);

  const addFavourite = () => {
    setIsFavourite(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    var userId = sessionStorage.getItem("userId");
    urlencoded.append("userId", userId);
    urlencoded.append("venueId", props.data.venueId);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${backendUrl}/venue/favourite/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const removeFavourite = () => {
    setIsFavourite(false);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    var userId = sessionStorage.getItem("userId");
    urlencoded.append("userId", userId);
    urlencoded.append("venueId", props.data.venueId);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${backendUrl}/venue/favourite/remove`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return isFavourite === false ? (
    <div className="custom-checkbox d-inlineBlock col-2 mt-1">
      <Heart onClick={addFavourite} />
    </div>
  ) : (
    <div className="custom-checkbox d-inlineBlock col-2 mt-1">
      <HeartFill onClick={removeFavourite} />
    </div>
  );
}

/**
 * UserVenueFileCard_favorite: location and latest events in the favourite pages http://localhost:3000/Location/Favorite_Venue
 * What's special about the component is: it integrates the following component "UserVenueFileCard_favorite_A" & "UserVenueFileCard_favorite_A" (can show A&B in different sequence)
 */

function UserVenueFileCardFavorite(props) {
  if (props.cardOrder == "AB")
    return (
      <div className="col-12 px-2 my-2">
        <div className="row m-0">
          <div className="col-1"></div>
          <UserVenueFileCardFavorite_A />
          <UserVenueFileCardFavorite_B />
          <div className="col-1"></div>
        </div>
      </div>
    );
  else
    return (
      <div className="col-12 col-12 px-0 my-2 ">
        <div className="row m-0">
          <div className="col-1 "></div>
          <UserVenueFileCardFavorite_B />
          <UserVenueFileCardFavorite_A />
          <div className="col-1 "></div>
        </div>
      </div>
    );
}

/**
 * Part of UserVenueFileCard_favorite: Image and address
 */
function UserVenueFileCardFavorite_A(props) {
  return (
    <div
      className="card col-lg-5 col-md-3"
      style={{ maxWidth: "28rem", padding: "0px", margin: "auto" }}
    >
      <h5 className="card-title mt-2 text-center"> Location Photo </h5>
      <img
        className="card-img-top"
        src={placeholder_canRemove}
        alt="img"
        style={{ maxWidth: "50%", margin: "auto" }}
      />
      <div className="card-body">
        <h6 className="mx-3">
          <i className="fa fa-map"></i> This is a address
        </h6>
        <h6 className="mx-3">
          <i className="fa fa-info"></i> This is some information about the
          location
        </h6>
      </div>
    </div>
  );
}

/**
 * Part of UserVenueFileCard_favorite: Name and upcomming event
 */
function UserVenueFileCardFavorite_B(props) {
  let zeroPadding = { paddingRight: "0px", paddingLeft: "0px" };

  return (
    <div
      className="card bg-lighttag-center col-lg-6 col-md-6 ms-3 mt-3 border-0"
      style={{ maxWidth: "36rem", padding: "0", margin: "auto" }}
    >
      <div className="card-header row mb-0">
        <Link to="/Location/Location_A/Events" className="col-9">
          <h3 style={{ color: "#181E84" }}>Location A</h3>
        </Link>

        <form className="custom-checkbox d-inlineBlock col-3 mt-1">
          <label
            for={/**assign a unique id*/ "LikeButton"}
            id="likeButtionLabel"
          >
            <input
              type="checkbox"
              id={/**assign a unique id*/ "LikeButton"}
              className="label"
              style={{}}
            />
            <i className="fa fa-star-o"></i>
            <i className="fa fa-star"></i>
            <span>Like</span>
          </label>
        </form>
      </div>
      
      <div className="card-body">
        <h5 className="mx-2 card-title text-primary">Upcoming Event</h5>
        <div className="container ">
          <div className="row" style={zeroPadding}>
            <div className="col-4" style={zeroPadding}>
              <UserEventFileCardSmall />
            </div>
            <div className="col-4" style={zeroPadding}>
              <UserEventFileCardSmall />
            </div>
            <div className="col-4" style={zeroPadding}>
              <UserEventFileCardSmall />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




export { UserVenueFileCard, UserVenueFileCardFavorite, UserFavouriteVenueFileCard };
