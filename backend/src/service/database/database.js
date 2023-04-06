const mongoose = require("mongoose");
const {
  userSchema,
  commentSchema,
  venueSchema,
  eventSchema,
} = require("./schema");

// const DATABASE_CONNECT_STRING = "mongodb://localhost:27017/csci2720project";
// mongoose.connect(DATABASE_CONNECT_STRING);

const userModel = mongoose.model("User", userSchema);
const commentModel = mongoose.model("Comment", commentSchema);
const venueModel = mongoose.model("Venue", venueSchema);
const eventModel = mongoose.model("Event", eventSchema);

async function getAllEventsByVenue(venueId) {
  return await eventModel.find({ venueId: venueId }).exec();
}

async function getAllEvents(venueId) {
  //const events = await eventModel.find({}).exec();
  return await eventModel.find().exec();
}

async function getNextEventId() {
  const event = await eventModel.findOne({}).sort("-eventId");

  return event == null ? 1 : event.eventId + 1;
}

async function createEvent(
  venueId,
  title,
  description,
  datetime,
  presenter,
  price,
  programTime,
  ageLimit,
  remark
) {
  const nextEventId = await getNextEventId();
  await eventModel.create({
    eventId: nextEventId,
    venueId,
    title,
    description,
    datetime,
    presenter,
    price,
    programTime,
    ageLimit,
    remark,
  });
  return nextEventId;
}

async function updateEvent(
  eventId,
  venueId,
  title,
  description,
  datetime,
  presenter,
  price,
  programTime,
  ageLimit,
  remark
) {
  await eventModel.findOneAndUpdate(
    { eventId },
    {
      venueId,
      title,
      description,
      datetime,
      presenter,
      price,
      programTime,
      ageLimit,
      remark,
    }
  );
}

async function deleteEvent(eventId) {
  await eventModel.deleteOne({ eventId });
}

async function countEventsInVenue(venueId) {
  console.log(venueId);
  return await eventModel.count({ venueId: venueId }).exec();
}

async function getOneVenue(venueId) {
  return await venueModel.findOne({ id: venueId }).exec();
}

async function getAllVenues() {
  const venues = await venueModel.find({}).exec();

  return venues.map((venue) => ({
    _id: venue._id,
    venueId: venue.id,
    name: venue.name,
    latitude: venue.latitude,
    longitude: venue.longitude,
  }));
}

async function getVenuesByKeyword(keyword) {
  const venues = await venueModel.find({ name: { $regex: keyword } }).exec();
  return venues.map((venue) => ({
    _id: venue._id,
    venueId: venue.id,
    name: venue.name,
    latitude: venue.latitude,
    longitude: venue.longitude,
  }));
}

async function getUserFavouriteVenues(userId) {
  const user = await userModel.findOne({ userId }).exec();
  if (user != null) {
    return user.favouriteVenues;
  }
  return [];
}

async function addVenueToUserFavourite(userId, venueId) {
  await userModel
    .updateOne(
      { userId, favouriteVenues: { $ne: venueId } },
      { $push: { favouriteVenues: venueId } }
    )
    .exec();
}

async function removeVenueFromUserFavourite(userId, venueId) {
  await userModel
    .updateOne(
      { userId, favouriteVenues: { $in: venueId } },
      { $pull: { favouriteVenues: venueId } }
    )
    .exec();
}

async function getCommentsByVenue(venueId) {
  const comments = await commentModel.find({ venueId: venueId }).exec();

  return comments.map((comment) => ({
    userId: comment.userId,
    venueId: comment.venueId,
    text: comment.text,
  }));
}

async function createCommentByVenue(userId, venueId, text) {
  await commentModel.create({ userId, venueId, text });
}

// **** add more functions here to extend the database interfaces ****

// getVenuesByKeyword("cuhk").then(e => console.log(e))
getCommentsByVenue(1).then((e) => console.log(e));
countEventsInVenue(1).then((e) => console.log(e));

module.exports = {
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
};
