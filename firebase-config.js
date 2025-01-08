// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"; 
import { getAuth, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXTm9E4mITmaV_NUqS6A8EvI4ksOSmFIg",
  authDomain: "phone-f5cc8.firebaseapp.com",
  projectId: "phone-f5cc8",
  storageBucket: "phone-f5cc8.firebasestorage.app",
  messagingSenderId: "48315138970",
  appId: "1:48315138970:web:e6d6c84a387360c01cb023"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Setup reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    console.log('Recaptcha verified');
  }
}, auth);

export { auth };
