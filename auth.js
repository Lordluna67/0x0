// auth.js — put in your repo root
const PASSWORD = "726f6f74"; // Change this

const entered = prompt("Enter the site password:");
if (entered !== PASSWORD) {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>Access Denied</h1>";
    throw new Error("Unauthorized");
}
