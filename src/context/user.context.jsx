import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


// the actual value we want to access ... 
// the default values of the state vars in userProvider vars
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

// the provider ... the actual functional component, anything in here
// will be the actual context. state that is needed

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unSubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unSubscribe;
    }, [])

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
} 