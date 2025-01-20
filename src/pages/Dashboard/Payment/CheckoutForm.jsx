import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [totalPrice, axiosSecure])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement)

        if (card === null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message);
        } else {
            setError('')
        }

        //confirm payment
        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'annonymous',
                    name: user?.displayName || 'annonymous'
                }
            }
        })

        if (cardConfirmError) {
            alert("confirm error")
        } else {
            alert("payment confirmed", paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                
                refetch()
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: 'Payment Successful',
                        text: 'Your payment has been successful',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-700" >Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;