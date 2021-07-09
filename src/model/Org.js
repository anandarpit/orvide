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
  architect: {
    id: {
      type: mongoose.Schema.Types.String,
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
    enabled:{
      type: mongoose.Schema.Types.Boolean
    },
    domain: {
      type: mongoose.Schema.Types.String
    }
  }
});

const org = mongoose.model('Orgs', OrgSchema);
module.exports = org;