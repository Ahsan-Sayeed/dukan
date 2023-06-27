"use client"
import { createContext, useEffect, useState } from "react";
import { app } from '../Firebase/firebase.config';
import { User, Auth, UserCredential, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { promises } from "dns";

const auth = getAuth(app);

type FirebaseContextProps = {
    users: User | null;
    createUser?:(email:string,password:string) =>Promise<UserCredential>; 
    signInUser?:(email:string,password:string) =>Promise<UserCredential>; 
    logOut?:() => Promise<void>;
    loading:boolean;
  }

export const AuthContext = createContext<Partial<FirebaseContextProps>>({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUser] = useState<User | null>();


    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user: User | null) => {
            setLoading(false);
            setUser(user);
        })

        return subscribe;
    }, [])

    const createUser = (email: string, password: string): Promise<UserCredential> => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email: string, password: string): Promise<UserCredential> => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = (): Promise<void> => signOut(auth);

    const values = { users, createUser, signInUser, logOut, loading };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider;