import mongoose from "mongoose";
const Schema = mongoose.Schema

const PreferencesSchema = new Schema({
    body : String
});

const Preference = mongoose.model("Preferences",PreferencesSchema);
export default Preference