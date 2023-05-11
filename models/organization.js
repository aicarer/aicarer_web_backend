const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
  organisationName: { type: String, required: true },
  abnDuns: { type: Number },
  organisationType: { type: String, required: true },
  phoneNumber: { type: Number },
  organisationAddress: { type: String },
  organisationCountry: { type: String, required: true },
  referenceId: { type: String, required: true, maxlength: 10 },
  adminFirstName: { type: String, required: true },
  adminLastName: { type: String, required: true },
  adminEmailAddress: { type: String, required: true },
  adminMobileNumber: { type: Number, required: true },
  adminPassword: { type: String, required: true },
  billingContactName: { type: String },
  billingEmailAddress: { type: String },
  billingAddress: { type: String },
  billingPhoneNumber: { type: String }
});

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;