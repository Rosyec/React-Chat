import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { facebookAuth, googleAuth } from "./config";

const loginWithFacebook = async () => {
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, facebookAuth);
    // The signed-in user info.
    const { displayName, email, uid, photoURL } = result.user;
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    return {
      displayName, 
      email,
      uid,
      photoURL,
      token: accessToken
    };
  } catch (error: any) {
    console.log("onError-Facebook: ", error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    return null;
  }
};

const loginWithGoogle = async () => {
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, googleAuth);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const { displayName, email, photoURL, uid } = result.user;
    return {
      displayName,
      email,
      photoURL,
      uid,
      token
    };
  } catch (error: any) {
    console.log("onError-Google: ", error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return null;
  }
};

const getCurrentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user;
  } else {
    return null;
  }
};

const logout = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Logout");
    })
    .catch((error) => {
      // An error happened.
    });
};

export { loginWithFacebook, loginWithGoogle, getCurrentUser, logout };
