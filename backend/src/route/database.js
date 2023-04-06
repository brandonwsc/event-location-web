const {
    getAllEventsByVenue,
    getAllEvents,
    countEventsInVenue,
    createEvent,
    updateEvent,
    deleteEvent,
    getOneVenue,
    getAllVenues,
    getVenuesByKeyword,
    getUserFavouriteVenues,
    addVenueToUserFavourite,
    removeVenueFromUserFavourite,
    getCommentsByVenue,
    createCommentByVenue,
} = require("../service/database/database");

async function getAllEventsByVenueRoute(req, res) {
    const {venueId} = req.query;
    const events = await getAllEventsByVenue(venueId);
    res.send({
        data: events,
    })
}

async function getAllEventsRoute(req, res) {
    const events = await getAllEvents();
    res.send({
        data: events,
    })
}

async function createEventRoute(req, res) {
    const {venueId, title, description, datetime, presenter, price, programTime, ageLimit, remark} = req.body;
    console.log(req.body);
    const eventId = await createEvent(venueId, title, description, datetime, presenter, price, programTime, ageLimit, remark);
    res.send({
        data: {eventId}
    });
}

async function updateEventRoute(req, res) {
    const {eventId, venueId, title, description, datetime, presenter, price, programTime, ageLimit, remark} = req.body;
    await updateEvent(eventId, venueId, title, description, datetime, presenter, price, programTime, ageLimit, remark);
    res.send({
        success: true,
    });

}

async function deleteEventRoute(req, res) {
    const {eventId} = req.body;
    await deleteEvent(eventId);
    res.send({
        success: true,
    });
}

async function getOneVenueRoute(req, res) {
    const venueId = req.query.venueId;
    const venue = await getOneVenue(venueId);
    res.send({
        data: {venue},
    });
}

async function getAllVenuesRoute(req, res) {
    const venues = await getAllVenues();
    const eventCount = {};
    for (let venue of venues) {
        eventCount[venue.venueId] = await countEventsInVenue(venue.venueId);
    }
    res.send({
        data: {venues, eventCount},
    });
}

async function getVenuesByKeywordRoute(req, res) {
    const keyword = req.query.keyword;
    const venues = await getVenuesByKeyword(keyword);
    const eventCount = {};
    for (let venue of venues) {
        eventCount[venue.venueId] = await countEventsInVenue(venue.venueId);
    }
    res.send({
        data: {venues, eventCount},
    });
}

async function getUserFavouriteVenuesRoute(req, res) {
    const {userId} = req.query;
    const venues = await getUserFavouriteVenues(userId);
    res.send({
        data: venues,
    });
}

async function addVenueToUserFavouriteRoute(req, res) {
    const {userId, venueId} = req.body;
    await addVenueToUserFavourite(userId, venueId);
    res.send({
        success: true,
    })
}

async function removeVenueFromUserFavouriteRoute(req, res) {
    const {userId, venueId} = req.body;
    await removeVenueFromUserFavourite(userId, venueId);
    res.send({
        success: true,
    })
}

async function getCommentsByVenueRoute(req, res) {
    const venueId = parseInt(req.query.venueId);
    const comments = await getCommentsByVenue(venueId);
    res.send({
        data: comments,
    })
}

async function addCommentByVenueRoute(req, res) {
    const {userId, venueId, commentText,} = req.body;
    await createCommentByVenue(userId, venueId, commentText);
    res.send({
        success: true,
    });

}

module.exports = {
    getAllEventsByVenueRoute,
    getAllEventsRoute,
    createEventRoute,
    updateEventRoute,
    deleteEventRoute,

    getOneVenueRoute,
    getAllVenuesRoute,
    getVenuesByKeywordRoute,
    getUserFavouriteVenuesRoute,
    addVenueToUserFavouriteRoute,
    removeVenueFromUserFavouriteRoute,
    getCommentsByVenueRoute,
    addCommentByVenueRoute,
}
