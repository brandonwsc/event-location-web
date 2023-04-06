import PropTypes from "prop-types";
import AdminEventCard from "./AdminEventCard";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

function UpdateEventForm(props) {
    const {register, handleSubmit, control, watch, formState: {errors}} = useForm();
    const [eventSelected, setEventSelected] = useState(null);
    const [venueSelected, setVenueSelected] = useState(null);

    useEffect(()=>{
        setEventSelected(props.eventSelected);
        setVenueSelected(props.eventSelected.venueId);
    },[props]);

    function onSubmit(data) {
        console.log(data);

        props?.updateEvent(
            eventSelected.eventId,
            data.eventTitle,
            data.programDate,
            data.eventDescription,
            data.eventPresenter,
            data.eventPrice,
            data.programTime,
            data.eventLocation,
            data.remark,
        );
    }

    return (
        <div className="container w-50">
            <div className="border border-dark rounded p-2 my-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col">
                            <button type="submit"
                                    className="btn btn-outline-light bg-transparent d-flex align-content-center justify-content-around h-100">
                                <i className="fa fa-circle-plus color-green fa-2x"></i>
                                <div className='color-green'>Update</div>
                            </button>
                        </div>
                        <div className="col">
                            <button type="button" onClick={()=>{props.setEventIdSelected(null)}}
                                    className="btn btn-outline-light bg-transparent d-flex align-content-center justify-content-around h-100">
                                <i className="fas fa-trash-alt color-red fa-2x"></i>
                                <div className='color-red'>Cancel</div>
                            </button>
                        </div>

                    </div>
                    <label>Update Event</label>
                    <div className="container rounded w-100 border border-dark px-3 pt-2 pb-3">
                        <label htmlFor="eventTitle">Event Title</label>
                        <input className="form-control border border-dark w-75" id="eventTitle" defaultValue={eventSelected?.title}
                               placeholder="Event Title" {...register("eventTitle", { required: false})}/>
                        <label>Program Date</label>
                        <input className="form-control border border-dark w-75" id="eventTitle" defaultValue={eventSelected?.datetime}
                               placeholder="Program Date" {...register("programDate", { required: false})}/>
                        <label htmlFor="eventDescription">Event Description</label>
                        <textarea className="form-control border border-dark w-75" id="eventDescription"
                                  cols="40" rows="5" defaultValue={eventSelected?.description}
                                  placeholder="Event Description" {...register("eventDescription", { required: false})}/>
                        <label htmlFor="eventPresenter">Presenter</label>
                        <input className="form-control border border-dark w-75" id="eventPresenter" defaultValue={eventSelected?.presenter}
                               placeholder="Event Presenter" {...register("eventPresenter", { required: false})}/>
                        <label htmlFor="eventPrice">Price</label>
                        <input className="form-control border border-dark w-75" id="eventPrice" defaultValue={eventSelected?.price}
                               placeholder="Event Price" {...register("eventPrice", { required: false})}/>
                        <label>Program Time</label>
                        <input className="form-control border border-dark w-75" id="eventPrice" defaultValue={eventSelected?.programTime}
                               placeholder="Program Time" {...register("programTime", { required: false})}/>
                        {/*<label htmlFor="ageLimit">Age Limit</label>*/}
                        {/*<input className="form-control border border-dark w-75" id="ageLimit" value={eventSelected?.ageLimit}*/}
                        {/*       placeholder="Age Limit" {...register("ageLimit", { required: true})}/>*/}
                        <label htmlFor="remark">Remark</label>
                        <input className="form-control border border-dark w-75" id="remark"  defaultValue={eventSelected?.remark}
                               placeholder="Remark" {...register("remark", { required: false})}/>
                    </div>
                    <label>Location</label>
                    <div className="container rounded w-100 border border-dark px-3 pt-2 pb-3">
                        <label htmlFor="eventLocation">Location</label>
                        <select className="form-select border border-dark w-75" aria-label="Order by"
                                id="eventLocation" {...register("eventLocation")} defaultValue={venueSelected} onChange={(value)=>{setVenueSelected(value)}}>
                            {
                                props?.locations.map((location) => {
                                    return <option value={location.venueId}>{location.name}</option>
                                })
                            }
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

AdminEventCard.propTypes = {
    setEventIdSelected: PropTypes.func
};

export default UpdateEventForm;