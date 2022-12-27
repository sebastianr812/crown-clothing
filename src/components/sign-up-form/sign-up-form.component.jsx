import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';


import './sign-up-form.styles.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;






    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });

    }

    const onButtonSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);



            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            console.log('error signing up user ', error)
        }

    }


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    return (
        <div className="sign-up-container" >
            <h2>Sign up with email and password</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={onButtonSubmit}>

                <FormInput label='Display Name' name="displayName" type='text' required onChange={handleChange} value={displayName} />


                <FormInput label='Email' name="email" type='email' required onChange={handleChange} value={email} />


                <FormInput label='Password' name="password" type='password' required onChange={handleChange} value={password} />


                <FormInput label='Confirm Password' name="confirmPassword" type='password' required onChange={handleChange} value={confirmPassword} />

                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;