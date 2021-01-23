import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function signup(email, password){
    return auth.createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}



export  function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setLoading] = useState(true);    

    const logout = () => auth.signOut();

    const resetPassword = (email) => auth.sendPasswordResetEmail(email);

    const updateEmail = (email) => currentUser.updateEmail(email);

    const updatePassword = (password) => currentUser.updatePassword(password);

    useEffect(() => {
        const unsubscribe =   auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
        
    }, [])


    const value = { currentUser, signup, login, logout, resetPassword, updateEmail, updatePassword };

    return (

        <AuthContext.Provider value={ value }>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
