const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
  orgName: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  oId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  membersCount: mongoose.Schema.Types.Number,
  architectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orgDomain: {
    enabled: {
      type: mongoose.Schema.Types.Boolean
    },
    domain: {
      type: mongoose.Schema.Types.String
    }
  },
  link: {
    id: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    sta: {
      type: mongoose.Schema.Types.Boolean,
      default: true
    }
  }
})

const org = mongoose.model('Orgs', orgSchema)
module.exports = org
