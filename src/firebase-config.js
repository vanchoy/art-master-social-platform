// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfk5RIn3NFHWaX9o4NXHcphi2X5Qc2rN8",
  authDomain: "art-master-some.firebaseapp.com",
  databaseURL: "https://art-master-some-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "art-master-some",
  storageBucket: "art-master-some.appspot.com",
  messagingSenderId: "679146337062",
  appId: "1:679146337062:web:ca681ffd60fd75789e07e7",
  measurementId: "G-3SRV4XE4R9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize auth
export const auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence
});
// Create database reference
export const database = getDatabase(app);
// Reference to posts in Realtime DB
export const postsRef = ref(database, "posts");
// Reference to users in Realtime DB
export const usersRef = ref(database, "users");
// Get reference to specific post using post id
export function getPostRef(postId) {
    return ref(database, "posts/" + postId);
}
// Get reference to specific user using user id
export function getUserRef(userId) {
    return ref(database, "users/" + userId);
}

// Reference to the storage service
export const storage = getStorage(app);
