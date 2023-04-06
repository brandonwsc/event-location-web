import React from "react";

import PropTypes, {object} from "prop-types";

function AdminEventCard(props) {
    new Date()
    return (
        <div className="rounded container w-100 border border-dark m-2 p-0">
            <div className="rounded row border border-dark m-2 px-4 py-1">
                <section className="col-12">
                    <div className="fs-3 font-weight-bold text-dark mb-2">{props.name}</div>
                    <div className={"d-flex flex-row my-2"}>
                        <section className={"col-6 d-flex flex-row"}>
                            <i className="fa fa-info"></i>
                            <div className={"mx-2"}>{props.description}</div>
                        </section>
                        <section className={"col-6 d-flex flex-row "}>
                            <i className="fas fa-map-marker-alt"></i>
                            <div className={"mx-2"}>{props.location}</div>
                        </section>
                    </div>
                    <div className={"d-flex flex-row my-2"}>
                        <section className={"col-6 d-flex flex-row "}>
                            <i className="fas fa-calendar-times"></i>
                            <div className={"mx-2"}>{props.datetime}</div>
                        </section>
                        <section className={"col-6 d-flex flex-row"}>
                            <i className="fa fa-tag" aria-hidden="true"></i>
                            <div className={"mx-2"}>{props.programTime}</div>
                        </section>
                    </div>
                </section>

            </div>
        </div>

    )
}


AdminEventCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    programTime: PropTypes.string,
    datetime: PropTypes.string
};

export default AdminEventCard