import mongoose from "mongoose";
import moment from "moment";

const NewsSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    formattedCreatedAt: String // Store formatted date as a string
});

NewsSchema.pre("save", function (next) {
    this.formattedCreatedAt = moment(this.createdAt).format("MMM D, YYYY [at] hh:mm A");
    next();
});

const News = mongoose.model("News", NewsSchema);

export default News;
