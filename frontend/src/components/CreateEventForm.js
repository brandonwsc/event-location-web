import PropTypes from "prop-types";
import React from "react";
import {useForm} from "react-hook-form";

function CreateEventForm(props) {
    const {register, handleSubmit, control, watch, formState: {errors}} = useForm();

    function onSubmit(data) {
        console.log(data);
        props?.createNewEvent(
            data.eventTitle,
            data.programDate,
            data.eventDescription,
            data.eventPresenter,
            data.eventPrice,
            data.programTime,
            data.eventLocation,
            data.remark,
        );
        props?.setIsCreatingEvent(false)
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
                                <div className='color-green'>Create</div>
                            </button>
                        </div>
                        <div className="col">
                            <button type="button" onClick={()=>{props.setIsCreatingEvent(false)}}
                                    className="btn btn-outline-light bg-transparent d-flex align-content-center justify-content-around h-100">
                                <i className="fas fa-trash-alt color-red fa-2x"></i>
                                <div className='color-red'>Cancel</div>
                            </button>
                        </div>

                    </div>
                    <label>Create Event</label>
                    <div className="container rounded w-100 border border-dark px-3 pt-2 pb-3">
                        <label htmlFor="eventTitle">Event Title</label>
                        <input className="form-control border border-dark w-75" id="eventTitle"
                               placeholder="Event Title" {...register("eventTitle", {required: true})}/>
                        <label>Program Date</label>
                        <input className="form-control border border-dark w-75" id="eventPrice"
                               placeholder="Program Time" {...register("programDate", {required: true})}/>

                        <label htmlFor="eventDescription">Event Description</label>
                        <textarea className="form-control border border-dark w-75" id="eventDescription"
                                  cols="40" rows="5"
                                  placeholder="Event Description" {...register("eventDescription", {required: false})}/>
                        <label htmlFor="eventPresenter">Presenter</label>
                        <input className="form-control border border-dark w-75" id="eventPresenter"
                               placeholder="Event Presenter" {...register("eventPresenter", {required: false})}/>
                        <label htmlFor="eventPrice">Price</label>
                        <input className="form-control border border-dark w-75" id="eventPrice"
                               placeholder="Event Price" {...register("eventPrice", {required: false})}/>
                        <label>Program Time</label>
                        <input className="form-control border border-dark w-75" id="eventPrice"
                               placeholder="Program Time" {...register("programTime", {required: false})}/>
                        {/*<label htmlFor="ageLimit">Age Limit</label>*/}
                        {/*<input className="form-control border border-dark w-75" id="ageLimit"*/}
                        {/*       placeholder="Age Limit" {...register("ageLimit", { required: true})}/>*/}
                        <label htmlFor="remark">Remark</label>
                        <input className="form-control border border-dark w-75" id="remark"
                               placeholder="Remark" {...register("remark", {required: false})}/>
                    </div>
                    <label>Location</label>
                    <div className="container rounded w-100 border border-dark px-3 pt-2 pb-3">
                        <label htmlFor="eventLocation">Location</label>
                        <select className="form-select border border-dark w-75" aria-label="Order by"
                                id="eventLocation" {...register("eventLocation")}>
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

CreateEventForm.defaultProps = {};

CreateEventForm.propTypes = {
    createNewEvent: PropTypes.func,
    reload: PropTypes.func,
    setIsCreatingEvent: PropTypes.func,
    dialogTitle: PropTypes.string
};

export default CreateEventForm;