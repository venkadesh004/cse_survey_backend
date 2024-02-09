const mongoose = require("mongoose");

const peerFeedback = new mongoose.Schema({
  designation: {
    type: String,
  },
  expert: {
    type: String,
  },
  generalFeedback: {
    type: String,
  },
  name: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  suggestions: {
    type: String,
  },
});

const PeerFeedback = mongoose.model("PeerFeedback", peerFeedback);

module.exports = PeerFeedback;
