import { initializeApp } from "firebase/app";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzwvYXaKfKhFAqQJju5oOfZfBhDhcySD0",
  authDomain: "test-61272.firebaseapp.com",
  projectId: "test-61272",
  storageBucket: "test-61272.appspot.com",
  messagingSenderId: "92555227782",
  appId: "1:92555227782:web:d5b21c6ecb02d0b23b9707",
  measurementId: "G-X4RWQ458X5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);

const useFirebase = () => {
  const setUpCaptcha = (number: string) => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        Auth
      );
      recaptchaVerifier.render();
      return signInWithPhoneNumber(Auth, `+91${number}`, recaptchaVerifier);
    } catch (error) {
      console.log(error);
    }
  };

  return { setUpCaptcha };
};
export { useFirebase, Auth };
