"use client";
import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth_firebase } from "@/configs/firebase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const optionsMethodLogin = [
  {
    name: "Google",
    // icon: <GoogleSVG />,
    type: "google",
  },
  {
    name: "Facebook",
    // icon: <FacebookSVG />,
    type: "facebook",
  },
  {
    name: "twitter",
    // icon: <FacebookSVG />,
    type: "twitter",
  },
];

export default function Home() {
  const [user, setUser] = useState<any>(null);
  console.log("user", user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth_firebase,
      async (currentUser: any) => {
        setUser(currentUser);
      }
    );
    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth_firebase, provider);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const facebookSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth_firebase, provider);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const twitterSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new TwitterAuthProvider();
      await signInWithPopup(auth_firebase, provider);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = useCallback(
    (type: string) => {
      switch (type) {
        case "google":
          googleSignIn();
          break;
        case "facebook":
          facebookSignIn();
          break;
        case "twitter":
          twitterSignIn();
          break;
        case "ios":
          break;
        default:
          break;
      }
    },
    [auth_firebase]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>THis is home</div>
      <span
        onClick={() => signOut(auth_firebase)}
        className="w-full cursor-pointer"
      >
        Logout
      </span>
      <div className="flex items-center gap-4 flex-col mt-7">
        {optionsMethodLogin.map((social, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2  border border-base-300 p-3 rounded-lg w-full cursor-pointer transition-all hover:bg-gray-100"
            onClick={() => handleSign(social.type)}
          >
            <div className="text-base text-heading font-bold">
              {social.name}
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <form></form>
      </div>
    </main>
  );
}
