import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(
  `pk_test_51Rjh7i04lLLa6OZy1E4f70IydkgxvK3Db4onyPI7syQVMNfPydq58w63trvO0QpvhppCjTJFw4Hx29e7K7v2gvYd00XqDDZY46`
);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default Payment;
