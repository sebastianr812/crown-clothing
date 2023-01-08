require("dotenv").config();
const stripe = require("stripe")('sk_test_51MNJbAA21suNN2kreCFZ6MRRQsWipZFml3bLOuNJqdmmZWRIXXgWaC5OOmCpcML5ZelN8XfxuVKTtrL0xqf0vpEd00wcKWgbFD');

exports.handler = async (event) => {
    try {

        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ amount }),
        };
    } catch (error) {
        console.log({ error });

        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        };
    }
};