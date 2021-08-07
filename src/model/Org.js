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
  membersCount: mongoose.Schema.Types.Number,
  architectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  orgDomain: {
    enabled: {
      type: mongoose.Schema.Types.Boolean,
    },
    domain: {
      type: mongoose.Schema.Types.String,
    },
  },
});

const org = mongoose.model("Orgs", OrgSchema);
module.exports = org;