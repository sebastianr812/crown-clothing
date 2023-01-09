import { useEffect, useState } from "react";
import { ConfirmationPageContainer, ConfirmationNumber } from './payment-successful.styles';


const PaymentSucessful = () => {


    const [confirmationNumber, setConfirmationNumber] = useState(null);


    useEffect(() => {
        const getConfirmationNumberHashed = async () => {
            const randomNumber = Math.floor(Math.random() * 1000);
            const randomNumberAsString = randomNumber.toString();
            const utf8 = new TextEncoder().encode(randomNumberAsString);
            const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray
                .map((bytes) => bytes.toString(16).padStart(2, '0'))
                .join('');
            setConfirmationNumber(hashHex);
        }
        getConfirmationNumberHashed();
    }, []);



    return (
        <ConfirmationPageContainer>
            <h2>Thank you!</h2>
            <div>
                <p>We are getting started on your order, you will receive
                    a email confirmation shortly.
                </p>
                Your confirmation number is:<ConfirmationNumber> {confirmationNumber}</ConfirmationNumber>
            </div>
        </ConfirmationPageContainer>
    );
}


export default PaymentSucessful;




