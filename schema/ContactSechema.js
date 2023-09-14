import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    PropertyId:String,
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
