import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import UserNavBar from "../components/UserNavBar";
import { MapSection, VenueSection, LocationPage } from "./UserLocation";
import { UserEventLocationHead, UserEventList } from "./UserEventPage";
import {
  UserVenueFileCard,
  UserVenueFileCardFavorite,
  UserFavouriteVenueFileCard,
} from "./UserVenueFileCard";
import { UserCommentSection } from "./UserCommentSection";
import { useState } from "react";
import { backendUrl, googleMapApiKey } from "../variables";

/** Full webpage for the location page in user view e.g., http://localhost:3000/Location/ */
function UserMainLocation() {
  let venueName = useParams();
  return (
    <>
      <header className="row">
        <UserNavBar venue={String(venueName)} />
      </header>
      <main>
        <div className="row mt-1">
          {/* <MapSection />
          <VenueSection /> */}
          <LocationPage />
        </div>
      </main>
    </>
  );
}

/** Full webpage for the event page of particular location in user view e.g., http://localhost:3000/Location/event?venueId=123 */
function UserMainEvents() {
  let venueName = useParams();
  return (
    <>
      <header className="row">
        <UserNavBar venue={String(venueName)} />
      </header>

      <main className="row">
        <section className="col-lg-12">
          <div className="container-lg bg-light mt-3 pt-1 pb-4">
            <UserEventLocationHead />
            {/* <UserCommentSection /> */}
          </div>
          <br />
          <div className="container-lg mt-3 pb-1">
            <UserEventList />
          </div>
        </section>
      </main>
    </>
  );
}

/** Full webpage for the favorite page of all the liked location in user view e.g., http://localhost:3000/Location/ABC/Events */
function UserMainFavorite() {
  const [listArray, setListArray] = useState("");

  var userId = sessionStorage.getItem("userId");
  useEffect(() => {
    fetch(`${backendUrl}/venue/favourite/user/?userId=${userId}`)
      .then((response) => response.json())
      .then(async (data) => {
        // console.log("fav", data.data);
        let i;
        let tmp = [];
        for (i = 0; i < data.data.length; i++) {
          // console.log("i", i);
          await fetch(`${backendUrl}/venue/one/?venueId=${data.data[i]}`)
            .then((response) => response.json())
            .then((result) => {
              // console.log(result.data.venue);
              tmp.push(result.data.venue);
              // console.log(i, "tmp", tmp);
              // console.log("listArray", listArray);
              if (i == data.data.length - 1) {
                setListArray(tmp);
              }
            })
            .catch((error) => console.log("error", error));
        }
      });
  }, []);
  return listArray.length > 0 ? (
    <>
      <header className="row">
        <UserNavBar />
      </header>
      <section className="col-lg-12 ">
        <div className="container-fluid bg-light mt-4 pb-4  table-responsive table-bordered">
          <table className="col-5 table table-hover">
            <thead className="shadow shadow-sm border-bottom-1">
              <tr className="" style={{ textAlign: "center" }}>
                <th scope="col" colspan="2" className="border border-dark ">
                  <h3>
                    <strong>My Favourite Locations</strong>
                  </h3>
                </th>
              </tr>
            </thead>

            <tbody className="mt-1">
              {listArray.map((loc, index) => (
                <UserFavouriteVenueFileCard data={loc} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  ) : (
    <>
      <header className="row">
        <UserNavBar />
      </header>
      <section className="col-lg-12 ">
        <div className="container-fluid bg-light mt-4 pb-4  table-responsive table-bordered">
          <table className="col-5 table table-hover">
            <thead className="shadow shadow-sm border-bottom-1">
              <tr className="" style={{ textAlign: "center" }}>
                <th scope="col" colspan="2" className="border border-dark ">
                  <h3>
                    <strong>My Favourite Locations</strong>
                  </h3>
                </th>
              </tr>
            </thead>

            <tbody className="mt-1"></tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export { UserMainLocation, UserMainEvents, UserMainFavorite };
