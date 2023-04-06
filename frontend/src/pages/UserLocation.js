import React, { useEffect } from "react";
import {
  UserVenueFileCard,
  UserVenueFileCard_favorite,
} from "./UserVenueFileCard";
import Map from "../components/Map";
import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { backendUrl, googleMapApiKey } from "../variables";
import { Search } from "react-bootstrap-icons";

function LocationPage() {
  const [locationArray, setLocationArray] = useState("");
  const [favouriteArray, setFavouriteArray] = useState("");
  const [mapArray, setMapArray] = useState("");

  useEffect(() => {
    fetchVenue();
    var userId = sessionStorage.getItem("userId");
    // console.log("session", userId);
    fetch(`${backendUrl}/venue/favourite/user/?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("fav", data.data);
        setFavouriteArray(data.data);
      });
  }, []);

  const fetchVenue = () => {
    fetch(`${backendUrl}/venue/all`)
      .then((response) => response.json())
      .then((data) => {
        let countArray = data.data.eventCount;
        // console.log("countArray", countArray);
        let tmp = data.data.venues;
        let i;
        for (i = 0; i < tmp.length; i++) {
          tmp[i].eventCount = countArray[tmp[i].venueId];
          // tmp[i].eventCount = i;
        }
        // console.log("tmp", tmp);
        setLocationArray(tmp);
        let tmpMap = data.data.venues.map((venue) => ({
          id: venue.venueId,
          name: venue.name,
          position: { lat: venue.latitude, lng: venue.longitude },
        }));
        // console.log("tmpMap", tmpMap);
        setMapArray(tmpMap);
      });
  };
  return (
    locationArray.length > 0 && (
      <>
        <MapSection mapArray={mapArray} />
        <VenueSection
          locationArray={locationArray}
          favouriteArray={favouriteArray}
        />
      </>
    )
  );
}

function MapSection(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapApiKey, // this is Janice's personal API key
  });
  return isLoaded ? (
    <section className="col-lg-7">
      <div className="align-middle bg-light mt-4 py-1">
        <div className="row rounded-top border border-dark b-3 mx-3 mt-3">
          <Map
            markers={props.mapArray}
            style={{ width: "100vw", height: "100vh" }}
          />
        </div>
      </div>
    </section>
  ) : null;
}

function VenueSection(props) {
  const [locationArray, setLocationArray] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [keyword, setKeyword] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setLocationArray(props.locationArray);
    sorting(2);
    var time = sessionStorage.getItem("lastUpdate");
    setTime(time);
  }, []);

  const sorting = (option) => {
    // console.log("sort in", option);
    // console.log("locationArray", locationArray);
    let tmp;
    if (!locationArray) {
      // console.log("no");
      tmp = props.locationArray;
    } else {
      tmp = locationArray;
    }
    if (option == 1) {
      tmp.sort((a, b) => a.eventCount - b.eventCount);
    } else if (option == 2) {
      tmp.sort((a, b) => b.eventCount - a.eventCount);
    }
    setLocationArray(tmp);
  };

  const handleSelectChange = (event) => {
    setSelectedClient(event.target.value);
    sorting(event.target.value);
  };

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const fetchSearch = () => {
    // console.log("keyword=", keyword);
    if (keyword === "") {
      setLocationArray(props.locationArray);
    } else {
      fetch(`${backendUrl}/venue/all/keywords/?keyword=${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.data);
          let countArray = data.data.eventCount;
          // console.log("countArray", countArray);
          let tmp = data.data.venues;
          let i;
          for (i = 0; i < tmp.length; i++) {
            tmp[i].eventCount = countArray[tmp[i].venueId];
            // tmp[i].eventCount = i;
          }
          // console.log("tmp", tmp);
          setLocationArray(tmp);
        });
    }
  };
  return (
    locationArray.length > 0 && (
      <section className="col-lg-5 ">
        <div className="container-fluid bg-light mt-4 pb-4  table-responsive table-bordered">
          <div className="row">
            <div className="col-7 mx-1 mr-0 my-3">
              <div className="rounded input-group">
                <input
                  type="search"
                  className="form-control search-input"
                  placeholder="Find Venue"
                  onChange={handleKeyword}
                  value={keyword}
                />
                <button
                  className="btn navbar-btn bg-dark nav-item-text "
                  onClick={fetchSearch}
                >
                  <Search />
                </button>
              </div>
            </div>

            <div className="col-4 mr-3 my-3 p-0 d-inline">
              <select
                class="form-select rounded input-group"
                value={selectedClient}
                onChange={handleSelectChange}
                aria-label=""
              >
                <option selected>Sort by no. of events</option>
                <option value="1">Low to high</option>
                <option value="2">High to low</option>
              </select>
            </div>
          </div>
          <table className="col-5 table table-hover">
            <thead className="shadow shadow-sm border-bottom-1">
              <tr className="" style={{ textAlign: "center" }}>
                <th scope="col" colspan="2" className="border border-dark ">
                  <h3>
                    <strong>Locations</strong>
                  </h3>
                  <div>Last Update: {time} </div>
                </th>
              </tr>
            </thead>

            <tbody className="mt-1">
              {locationArray.map((loc, index) => (
                <UserVenueFileCard
                  data={loc}
                  favourite={props.favouriteArray}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="container-fluid bg-light mt-4 pb-4">
          <h4 className="mx-2">Locations</h4>
          <div className="mx-2">
            {locationArray.map((loc, index) => (
              <UserVenueFileCard data={loc} />
            ))}
          </div>
        </div> */}
      </section>
    )
  );
}

export { MapSection, VenueSection, LocationPage };
