// app.js
import { auth } from './firebase-config.js';
import { signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const sendCodeButton = document.getElementById('sendCode');
const verifyCodeButton = document.getElementById('verifyCode');
const result = document.getElementById('result');
let confirmationResult;

// Send OTP
sendCodeButton.addEventListener('click', () => {
  const phoneNumber = document.getElementById('phoneNumber').value;
  const appVerifier = window.recaptchaVerifier;

  console.log('Sending OTP to:', phoneNumber);

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmation) => {
      confirmationResult = confirmation;
      console.log('OTP sent successfully');
      result.innerText = 'OTP sent! Please check your phone.';
    })
    .catch((error) => {
      console.error('Error during OTP sending:', error);
      result.innerText = 'Error: ' + error.message;
    });
});

// Verify OTP
verifyCodeButton.addEventListener('click', () => {
  const otp = document.getElementById('otp').value;

  console.log('Verifying OTP:', otp);

  confirmationResult.confirm(otp)
    .then((userCredential) => {
      console.log('OTP verified successfully');
      result.innerText = 'Phone number verified successfully!';
      console.log(userCredential.user);
    })
    .catch((error) => {
      console.error('Error during OTP verification:', error);
      result.innerText = 'Error: ' + error.message;
    });
});
