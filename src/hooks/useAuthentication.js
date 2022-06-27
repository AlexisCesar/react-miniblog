import { db } from '../firebase/config';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // Cleanup
    // Deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {

            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, { displayName: data.displayName });

            setLoading(false);

            return user;

        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "Password must contains 6 or more characters.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail already in use.";
            } else {
                systemErrorMessage = "Something went wrong, please try again later."
            }

            setError(systemErrorMessage);

            setLoading(false);
        }

    };

    const logOut = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    const logIn = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);

            setLoading(false);
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "User not found.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Wrong password.";
            } else {
                systemErrorMessage = "Something went wrong, please try again later.";
            }

            setError(systemErrorMessage);

            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { auth, createUser, logIn, logOut, error, loading };

};