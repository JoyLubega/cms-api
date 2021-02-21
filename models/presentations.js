const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presentationSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    files:[String],
  },
  {
    timestamps: true
  }
);

const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation;
