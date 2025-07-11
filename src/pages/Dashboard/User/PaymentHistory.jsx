import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../api/useAxiosSecure';

const PaymentHistory = () => {
    const {user} =useAuth();
      const axiosSecure = useAxiosSecure();
    return (
        <div>
            payment history 
        </div>
    );
};

export default PaymentHistory;