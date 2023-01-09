require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.handler = async (event) => {
    try {

        // temporary to decode the base 64 since 
        // it's not working exactly like it does in the vid
        // const {amount } = JSON.parse(event.body);
        /////////////////////////////////////////
        const decodedBody = atob(event.body);
        //////////////////////////////////////////
        const { amount } = JSON.parse(decodedBody);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        };
    } catch (error) {
        console.log({ error });

        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        };
    }
};