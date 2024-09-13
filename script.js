// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjkQGr8vAqT2lRnB2v9a4ApMQnZG0jPFM",
  authDomain: "ping-data-6f691.firebaseapp.com",
  databaseURL: "https://ping-data-6f691-default-rtdb.firebaseio.com",
  projectId: "ping-data-6f691",
  storageBucket: "ping-data-6f691.appspot.com",
  messagingSenderId: "738608800311",
  appId: "1:738608800311:web:17bb3eca3ec33d546215b2",
  measurementId: "G-RVXDV4PBYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const pingRef = ref(database, 'ping');

// Function to send a ping
document.getElementById('pingButton').addEventListener('click', () => {
  set(pingRef, {
    alert: true,
    timestamp: Date.now()
  });
});

// Listen for changes to the "ping" node
onValue(pingRef, (snapshot) => {
  const data = snapshot.val();
  if (data && data.alert) {
    playSound();
    set(pingRef, { alert: false }); // Reset after alert
  }
});

// Function to play sound
function playSound() {
  const audio = new Audio('ping-sound.mp3'); // Ensure you have this file in the same directory
  audio.play().catch(error => {
    console.error("Error playing sound:", error);
  });
}
