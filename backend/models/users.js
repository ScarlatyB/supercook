import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);
export default User;

function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (name && email && password) {
      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      alert("Account created successfully! Redirecting to login.");
      window.location.href = "login.html";
  } else {
      alert("Please fill out all fields.");
  }
}