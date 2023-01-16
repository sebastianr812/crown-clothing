import { useState, FormEvent, ChangeEvent } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { useDispatch } from "react-redux";


import { SignInContainer, ButtonContainer } from './sign-in-form.styles';

import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";


const defaultFormFields = {

    email: '',
    password: ''

}


const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });

    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };


    const onButtonSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            console.log('user sign in failed', error as Error);
        }
    }


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    return (
        <SignInContainer  >
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={onButtonSubmit}>


                <FormInput label='Email' name="email" type='email' required onChange={handleChange} value={email} />
                <FormInput label='Password' name="password" type='password' required onChange={handleChange} value={password} />

                <ButtonContainer >
                    <Button type='submit' >Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}  >Google Sign In</Button>
                </ButtonContainer>

            </form>
        </SignInContainer>
    );
}

export default SignInForm;