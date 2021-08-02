const mongoose = require("mongoose");

const OrgSchema = new mongoose.Schema({
  orgName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  orgId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  totalMembers: {
    type: mongoose.Schema.Types.Number
  },
  architect: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    lastName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  orgDomain: {
    enabled: {
      type: mongoose.Schema.Types.Boolean,
    },
    domain: {
      type: mongoose.Schema.Types.String,
    },
  },
  structures: [{
      structureId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      structureName: {
        type: mongoose.Schema.Types.String,
        required: true,
      }
  }],
  
});

const org = mongoose.model("Orgs", OrgSchema);
module.exports = org;
