import { useState } from "react";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {


    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = defaultFormFields;


    console.log(formFields);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });

    }


    return (
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit={() => { }}>
                <label>Display Name</label>
                <input name="displayName" type='text' required onChange={handleChange} value={displayName} />

                <label>Email</label>
                <input name='email' type='email' required onChange={handleChange} value={email} />

                <label>Password</label>
                <input name="password" type='password' required onChange={handleChange} value={password} />

                <label>Confirm Password</label>
                <input name="confirmPassword" type='password' required onChange={handleChange} value={confirmPassword} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;