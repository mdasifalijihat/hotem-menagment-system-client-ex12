// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../api/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const packages = {
  Silver: 9.99,
  Gold: 19.99,
  Platinum: 29.99,
};

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { packageName } = useParams();

  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);

  const amount = packages[packageName] || 0;
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);
    setCardError("");

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setCardError(paymentMethodError.message);
      setLoading(false);
      return;
    }

    try {
      const intentRes = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
      });
      const clientSecret = intentRes.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || "Anonymous",
            email: user.email,            
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          email: user.email,
          package: packageName,
          amount,
          transactionId: result.paymentIntent.id,
          date: new Date(),
          photoURL: user.photoURL,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          await Swal.fire({
            title: "Payment Successful!",
            html: `Thank you for purchasing <strong>${packageName}</strong>.<br><br><strong>Transaction ID:</strong> ${result.paymentIntent.id}`,
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate("/dashboard/myMembership");
        }
      }
    } catch (err) {
      setCardError("Payment failed. Try again.");
      Swal.fire("Payment Failed", "Something went wrong.", "error");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-xl font-bold mb-4 text-center">
            Pay for {packageName} Membership
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-lg font-semibold text-center text-gray-700">
              Amount to Pay: <span className="text-primary">৳{amount}</span>
            </p>

            <div className="p-3 border rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#333",
                      "::placeholder": { color: "#888" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
              />
            </div>

            {cardError && (
              <p className="text-error text-sm font-medium">{cardError}</p>
            )}

            <button
              type="submit"
              className="btn btn-success w-full"
              disabled={!stripe || loading}
            >
              {loading ? "Processing…" : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
