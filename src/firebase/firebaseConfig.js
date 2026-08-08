import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
            apiKey: "AIzaSyC_zBxZ7J1tQMUJWGOSB4wVKcFwEtfbZts",
            authDomain: "mybudget-11d45.firebaseapp.com",
            projectId: "mybudget-11d45",
            storageBucket: "mybudget-11d45.appspot.com",
            messagingSenderId: "883252995975",
            appId: "1:883252995975:web:d2d87202b428e9e5ed9522",
            measurementId: "G-6WXSPFE95B"
        };
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
