const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs"),
  SALT_WORK_FACTOR = 10;
const mongoose = require("mongoose");

// updated by Carson&Allen 2022-12-11 yymmdd
const userSchema = new Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  favouriteVenues: [Number],
});

// hash the password
userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

/*
userSchema.pre('updateOne', async function() {
    const docToUpdate = await this.model.findOne(this.getQuery());
    console.log(docToUpdate); // The document that findOneAndUpdate() will modify

    // only hash the password if it has been modified (or is new)
    if (!docToUpdate.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(docToUpdate.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            docToUpdate.password = hash;
            next();
        });
    });
});
*/
// hash the password
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const commentSchema = new Schema({
  id: Number,
  userId: Number,
  venueId: Number,
  text: String,
});

const venueSchema = new Schema({
  id: Number,
  name: String,
  latitude: Number,
  longitude: Number,
});

const eventSchema = new Schema({
  eventId: Number,
  title: String,
  venueId: Number,
  datetime: String,
  description: String,
  presenter: String,
  price: String,
  programTime: String,
  ageLimit: String,
  remark: String,
});

module.exports = { userSchema, commentSchema, venueSchema, eventSchema };
