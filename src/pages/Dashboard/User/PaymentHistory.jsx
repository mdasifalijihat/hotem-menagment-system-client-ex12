import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";
import moment from "moment";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments?email=${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={pay.photoURL}
                      alt="package"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="font-semibold">{pay.package}</td>
                  <td>${pay.amount}</td>
                  <td className="text-sm text-gray-600 break-all">
                    {pay.transactionId}
                  </td>
                  <td>{moment(pay.date).format("MMM D, YYYY h:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
