import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    message:String,
});

const ContactUs = mongoose.model("ContactUs", ContactUsSchema);

export default ContactUs;
