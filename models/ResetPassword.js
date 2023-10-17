const mongoose = require("mongoose");

const resetPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
});

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);

module.exports = ResetPassword;
