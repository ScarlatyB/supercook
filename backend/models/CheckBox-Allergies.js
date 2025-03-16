const mongoose = require("mongoose");
const checkboxSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isChecked: { type: Boolean, required: true }
  });
  const Checkbox = mongoose.model('Checkbox', checkboxSchema);
  module.exports = Checkbox;