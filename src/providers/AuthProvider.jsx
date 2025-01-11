import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
export const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()

    const createUser = (email, passowrd) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, passowrd)
    }
    const signInUser = (email, passowrd) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, passowrd)
    }
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("current user", currentUser)
            const userInfo = { email: currentUser.email }
            if (currentUser) {
                axiosPublic.post('/jwt', userInfo)
                .then(res=>{
                    console.log(res)
                    if(res.data){
                        localStorage.setItem('access-token', res.data)
                    }
                })
            } else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])
    const authInfo = {
        loading,
        user,
        setUser,
        createUser,
        googleSignIn,
        signInUser,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;