import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionReference = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionReference, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
};


export const getCategoriesAndDocuments = async () => {
    const collectionReference = collection(db, 'categories');

    const q = query(collectionReference);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((total, docSnapshot) => {
        const { title, items } = docSnapshot.data();

        total[title.toLowerCase()] = items;
        return total;
    }, {})

    return categoryMap;
}


export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

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


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}

