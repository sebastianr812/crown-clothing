import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver,
    User
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';

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

export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    const collectionReference = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionReference, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
};




export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionReference = collection(db, 'categories');

    const q = query(collectionReference);
    const querySnapshot = await getDocs(q);
    // const categoryMap = querySnapshot.docs.reduce((total, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();

    //     total[title.toLowerCase()] = items;
    //     return total;
    // }, {})

    return querySnapshot.docs.map(docSnapShot => docSnapShot.data() as Category);

};

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}


export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInfo = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
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
            console.log('error creating the user', error);

        }
    }
    return userSnapShot as QueryDocumentSnapshot<UserData>;

}


export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    onAuthStateChanged(auth, callback)
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unSubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}

