const {
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
} = require("./route/database");

const {
  login,
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUser,
} = require("./route/login_database");

function mountRouter(app) {
  app.post("/login", login);

  //   CRUD user
  app.post("/admin/createuser", createUser);
  app.post("/admin/getuser", getUser);
  app.post("/admin/getuserbyid", getUserById);
  app.put("/admin/updateuser", updateUser);
  app.delete("/admin/deleteuser", deleteUser);
  app.get("/admin/getalluser", getAllUser);

  app.get("/event/venue/all", getAllEventsByVenueRoute);
  app.get("/event/all", getAllEventsRoute);
  app.post("/event/create", createEventRoute);
  app.post("/event/update", updateEventRoute);
  app.post("/event/delete", deleteEventRoute);

  app.get("/venue/one", getOneVenueRoute);
  app.get("/venue/all", getAllVenuesRoute);
  app.get("/venue/all/keywords", getVenuesByKeywordRoute);
  app.get("/venue/favourite/user", getUserFavouriteVenuesRoute);
  app.post("/venue/favourite/add", addVenueToUserFavouriteRoute);
  app.post("/venue/favourite/remove", removeVenueFromUserFavouriteRoute);

  app.get("/venue/comment/get", getCommentsByVenueRoute);
  app.post("/venue/comment/create", addCommentByVenueRoute);

  app.all("/*", (req, res) => res.redirect("/login"));
}

module.exports = { mountRouter };
