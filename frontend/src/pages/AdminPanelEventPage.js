import AdminEventCard from "../components/AdminEventCard";
import React, {useEffect, useState} from "react";
import AdminNavBar from "../components/AdminNavBar";
import {backendUrl} from "../variables";
import UpdateEventForm from "../components/UpdateEventForm";
import CreateEventForm from "../components/CreateEventForm";

function AdminPanelEventPage() {
    const [eventTypes, setEventTypes] = useState(["type one", "type two", "type three"])
    const [locations, setLocation] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventIdSelected, setEventIdSelected] = useState(null); //number
    const [eventSelected, setEventSelected] = useState(null); //number
    const [isCreatingEvent, setIsCreatingEvent] = useState(false); //number

    function getLocation() {
        fetch(`${backendUrl}/venue/all`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data.venues);
                setLocation(data.data.venues);
            });
    }

    function getVenue() {
        fetch(`${backendUrl}/event/all`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setEvents(data.data);
            });
    }

    function createNewEvent(eventTitle, programDate, eventDescription, eventPresenter, eventPrice, programTime, eventLocation, remark) {
        let myHeaders = new Headers();
        let urlencoded = new URLSearchParams();
        urlencoded.append("venueId", eventLocation);
        urlencoded.append("title", eventTitle);
        urlencoded.append("datetime", programDate);
        urlencoded.append("description", eventDescription);
        urlencoded.append("presenter", eventPresenter);
        urlencoded.append("price", eventPrice);
        urlencoded.append("programTime", programTime);
        urlencoded.append("remark", remark);
        // urlencoded.append("ageLimit", ageLimit);
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };

        fetch(`${backendUrl}/event/create`, requestOptions)
            .then((response) => {
                reload();
            });
    }

    function updateEvent(eventId, eventTitle, programDate, eventDescription, eventPresenter, eventPrice, programTime, eventLocation, remark) {
        let myHeaders = new Headers();
        let urlencoded = new URLSearchParams();
        urlencoded.append("eventId", eventId);
        urlencoded.append("venueId", eventLocation);
        urlencoded.append("title", eventTitle);
        urlencoded.append("datetime", programDate);
        urlencoded.append("description", eventDescription);
        urlencoded.append("presenter", eventPresenter);
        urlencoded.append("price", eventPrice);
        urlencoded.append("programTime", programTime);
        urlencoded.append("remark", remark);
        // urlencoded.append("ageLimit", ageLimit);
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };

        fetch(`${backendUrl}/event/update`, requestOptions)
            .then((response) => {
                setEventIdSelected(null)
                setEventSelected(null);
                reload();
            });
    }

    function deleteEvent(event) {
        const eventId = event.eventId
        console.log(eventId);
        let myHeaders = new Headers();
        let urlencoded = new URLSearchParams();
        urlencoded.append("eventId", eventId);
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        };
        fetch(`${backendUrl}/event/delete`, requestOptions)
            .then((response) => {
                reload();
            });
    }

    function reload() {
        getLocation();
        getVenue();
    }

    useEffect(() => {
        getLocation();
        getVenue();
    }, []);

    return (
        <div>
            <div className={"row"}>
                <AdminNavBar/>
                <section className="col-6 px-2">
                    <button onClick={() => setIsCreatingEvent(true)}
                            type="button"
                            className="btn btn-outline-light bg-transparent d-flex align-content-center justify-content-center w-100">
                        <i className="fa fa-circle-plus color-green fa-2x"></i>
                        <div className='color-green'>Create</div>
                    </button>
                </section>


                <section className="col-6 px-2 ">
                    <button type="button"
                            className="btn btn-outline-light bg-transparent d-flex align-content-center justify-content-center w-100"
                            onClick={() => {
                                deleteEvent(eventSelected);
                            }}
                    >
                        <i className="fas fa-trash-alt color-red fa-2x"></i>
                        <div className='color-red'>Delete</div>
                    </button>
                </section>
            </div>
            {isCreatingEvent && <CreateEventForm locations={locations} createNewEvent={createNewEvent} reload={reload}
                                                 setIsCreatingEvent={setIsCreatingEvent}/>}
            <div className="container-xl">
                {events?.map((event, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="form-check d-flex flex-row align-items-center">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                       checked={eventIdSelected === event.eventId}
                                       onClick={() => {
                                           if (eventIdSelected === event.eventId) {
                                               setEventIdSelected(null);
                                               setEventSelected(null);
                                           } else {
                                               setEventIdSelected(event.eventId);
                                               setEventSelected(event);
                                           }
                                       }}
                                />
                                <AdminEventCard name={event.title} description={event.presenter}
                                                location={event.venueId} programTime={event.programTime}
                                                datetime={event.datetime}/>
                            </div>
                            {eventSelected && eventIdSelected === event.eventId &&
                                <UpdateEventForm locations={locations}
                                                 eventSelected={eventSelected} updateEvent={updateEvent} reload={reload}
                                                 setEventIdSelected={setEventIdSelected}
                                />}
                        </React.Fragment>
                    )
                })}
            </div>

        </div>
    )
}

export default AdminPanelEventPage;