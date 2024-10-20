import React, { createContext, useContext, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

// instantiate context object
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // attempt sign in to auth instance with Google's provider instance
            await signInWithPopup(auth, provider);
            console.log("Sign-in successful.");
        } catch (error) {
            console.log(error);
        }
    };

    // whenever someone signs in or out, update the user appropriately
    // runs on first render, then unsubscribes before rerunning effect
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User", currentUser);
        });
        return ()=> {
            unsubscribe();
        }
    }, []);

    const googleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sign-out successful.");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        // global context, all children receive these props
        <AuthContext.Provider value={{ user, googleSignIn, googleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};