import { GoogleAuthProvider } from "firebase/auth";
import Button from "./components/Button";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "./config";
import "./App.css";
import { useState, useEffect } from "react";
import Channel from "./components/Channel";

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Set language to the default browser preference

    auth.languageCode = "it";
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="fireChat">
      {user ? (
        <>
          <header>
            <div className="groupName">Kieu Dac</div>
            <Button onClick={logOut}>Đăng xuất</Button>
          </header>
          <Channel user={user} />
        </>
      ) : (
        <div className="logIn">
          <Button onClick={signInWithGoogle}>Đăng nhập với Google</Button>
        </div>
      )}
    </div>
  );
}

export default App;
