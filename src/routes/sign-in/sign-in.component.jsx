import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocReference = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>This is sign in component</h1>
            <button onClick={logGoogleUser}>Click to Sign in with Google</button>
        </div>
    );
}

export default SignIn;