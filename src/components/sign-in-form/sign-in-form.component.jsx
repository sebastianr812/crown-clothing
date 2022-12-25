import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-in-form.styles.scss';


const defaultFormFields = {

    email: '',
    password: ''

}


const SignInForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    console.log(formFields);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });

    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }


    const onButtonSubmit = async (event) => {
        event.preventDefault();



        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('wrong password for email');
                    break
                case 'auth/user-not-found':
                    alert('incorrect password');
                    break
                default:
                    console.log(error)
            }
        }
    }


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    return (
        <div className="sign-up-container" >
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={onButtonSubmit}>


                <FormInput label='Email' name="email" type='email' required onChange={handleChange} value={email} />
                <FormInput label='Password' name="password" type='password' required onChange={handleChange} value={password} />

                <div className="buttons-container">
                    <Button type='submit' >Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}  >GoogleSignIn</Button>
                </div>

            </form>
        </div>
    );
}

export default SignInForm;