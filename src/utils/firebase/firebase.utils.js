import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEaoonvQZDzsQV-NxE0zqR7yH1Q6MnRwA",
    authDomain: "crown-clothing-db-ad5a4.firebaseapp.com",
    projectId: "crown-clothing-db-ad5a4",
    storageBucket: "crown-clothing-db-ad5a4.appspot.com",
    messagingSenderId: "988282459867",
    appId: "1:988282459867:web:7d385ca2c43458dcd31efe"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocReference = doc(db, 'users', userAuth.uid);



    const userSnapShot = await getDoc(userDocReference);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocReference, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Error creating user, email already in use')
            } else {
                console.log('there was an error creating the user', error.message)
            }

        }
    }
    return userDocReference;

}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

