import { loadStripe } from "@stripe/stripe-js";
import SectionTitile from "../../shared/SectionTitle/SectionTitile";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_pk)

const Payment = () => {
    return (
        <div>
            <SectionTitile heading="Payment" subHeading="Please pay ..." />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;