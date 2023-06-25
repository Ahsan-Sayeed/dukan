"use client"
import { createContext, useEffect, useState } from "react";
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth(app);

export const AuthContext = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUser] = useState({});


    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            setUser(user as object);
        })

        return () => { subscribe(); }
    }, [])

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => signOut(auth);

    const values = { users, createUser, signInUser, logOut, loading };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider;