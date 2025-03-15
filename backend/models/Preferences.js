import mongoose from "mongoose";
const preferenceSchema = new mongoose.Schema({
    body: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // 🔗 Reference to User
});
export default mongoose.model("Preference", preferenceSchema);