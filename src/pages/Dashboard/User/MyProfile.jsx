import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  return <div>my profile</div>;
};

export default MyProfile;
