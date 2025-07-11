import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user (Email/Password)
  const createUser = (email, password, name, photo) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          setUser({
            ...userCredential.user,
            displayName: name,
            photoURL: photo,
          });
          return userCredential;
        });
      }
    );
  };

  // Login user (Email/Password)
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign-In
  const googleProvider = new GoogleAuthProvider();
  const socialLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).then((result) => {
      setUser(result.user);
      return result;
    });
  };

  // Log out user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    socialLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
