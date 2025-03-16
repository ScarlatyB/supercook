import mongoose from "mongoose";
const checkboxSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isChecked: { type: Boolean, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  });
  const Checkbox = mongoose.model('Checkbox', checkboxSchema);
export default Checkbox;