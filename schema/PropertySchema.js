import mongoose from "mongoose";

const Property = mongoose.Schema({
    name: String,
    address: String,
    location: String,
    price: String,
    size: String,
    imageThumbnail: [String],
    status: String,
    floor: String,
    Furnished: String,
    Facing: String,
    Transaction: String,
    bed: String,
    baths: String,
    balcony: String,
    parking: String,
    reasons: [String],
    landmark: String,
    ageOfConstruction: String,
})

export default mongoose.model("Property",Property)