import { BaseButton, GoogleSignInButton, InvertedSignInButton, ButtonSpinner } from './button.styles.jsx';



export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}


// this helps us leverage ^ with autocomplete ... we can choose which we want to get 
// this takes in a button type and returns an obj where
// the val of our classes is key and the value is the styled component
// it returns that obj with the buttonType as its key meaning we just return the styled component

// basically we made an object and returned that object with the value which is a styled component depending on the buttonType that was passed in

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedSignInButton,
    }[buttonType]
)

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton disabled={isLoading}
            {...otherProps}>{isLoading ? <ButtonSpinner /> : children}</CustomButton>
    );
}

export default Button;