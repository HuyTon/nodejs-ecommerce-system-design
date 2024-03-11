const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    title: String,
    content: String,
    metadata: Object,
  },
  { timestamps: true }
);

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
