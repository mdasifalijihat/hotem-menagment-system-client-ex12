import {
  FaUserCircle,
  FaEye,
  FaShoppingCart,
  FaComments,
  FaUsers as FaUsersAlt,
  FaClock,
  FaClipboard,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
} from "react-icons/fa";

const AdminInformation = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Main Dashboard Content */}
        <div className="p-6 bg-gray-100 flex-grow">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>           
          </div>

          {/* Top Summary Cards (from Screenshot_80.png) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Daily Visits Card */}
            <div className="card bg-white shadow-md">
              <div className="card-body items-center text-center p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-3">
                  <FaEye className="text-white text-3xl" />
                </div>
                <p className="text-3xl font-bold text-gray-800">8,457</p>
                <h3 className="text-md text-gray-500">Daily Visits</h3>
              </div>
            </div>

            {/* Sales Card */}
            <div className="card bg-white shadow-md">
              <div className="card-body items-center text-center p-6">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mb-3">
                  <FaShoppingCart className="text-white text-3xl" />
                </div>
                <p className="text-3xl font-bold text-gray-800">52,160</p>
                <h3 className="text-md text-gray-500">Sales</h3>
              </div>
            </div>

            {/* Comments Card (from Screenshot_80.png) */}
            <div className="card bg-white shadow-md">
              <div className="card-body items-center text-center p-6">
                <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center mb-3">
                  <FaComments className="text-white text-3xl" />
                </div>
                <p className="text-3xl font-bold text-gray-800">15,823</p>
                <h3 className="text-md text-gray-500">Comments</h3>
              </div>
            </div>

            {/* No. of Visits Card */}
            <div className="card bg-white shadow-md">
              <div className="card-body items-center text-center p-6">
                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-3">
                  <FaUsersAlt className="text-white text-3xl" />
                </div>
                <p className="text-3xl font-bold text-gray-800">36,752</p>
                <h3 className="text-md text-gray-500">No. of Visits</h3>
              </div>
            </div>
          </div>

          {/* Additional Summary Cards (from Screenshot_78.png) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Welcome Card */}
            <div className="card bg-white shadow-md">
              <div className="card-body flex-row items-center justify-between p-6">
                {" "}
                {/* Added flex-row for horizontal layout */}
                <FaUserCircle className="text-4xl text-orange-400" />
                <div>
                  <p className="text-gray-500 text-sm">2500</p>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Welcome
                  </h3>
                </div>
              </div>
            </div>

            {/* Average Time Card */}
            <div className="card bg-white shadow-md">
              <div className="card-body flex-row items-center justify-between p-6">
                <FaClock className="text-4xl text-blue-400" />
                <div>
                  <p className="text-gray-500 text-sm">123.50</p>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Average Time
                  </h3>
                </div>
              </div>
            </div>

            {/* Collections Card */}
            <div className="card bg-white shadow-md">
              <div className="card-body flex-row items-center justify-between p-6">
                <FaClipboard className="text-4xl text-green-400" />
                <div>
                  <p className="text-gray-500 text-sm">1,805</p>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Collections
                  </h3>
                </div>
              </div>
            </div>

            {/* Comments Card (from Screenshot_78.png) */}
            <div className="card bg-white shadow-md">
              <div className="card-body flex-row items-center justify-between p-6">
                <FaComments className="text-4xl text-pink-400" />
                <div>
                  <p className="text-gray-500 text-sm">54</p>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Comments
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Cards (from Screenshot_78.png) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Facebook Card */}
            <div className="card bg-blue-700 text-white shadow-md">
              <div className="card-body items-center p-6">
                <FaFacebookF className="text-3xl mb-2" />
                <p className="text-2xl font-bold">35K</p>
                <p className="text-sm opacity-80">Friends</p>
                <p className="text-sm opacity-80 mt-1">128 Feeds</p>
              </div>
            </div>
            {/* Twitter Card */}
            <div className="card bg-blue-400 text-white shadow-md">
              <div className="card-body items-center p-6">
                <FaTwitter className="text-3xl mb-2" />
                <p className="text-2xl font-bold">584K</p>
                <p className="text-sm opacity-80">Followers</p>
                <p className="text-sm opacity-80 mt-1">978 Tweets</p>
              </div>
            </div>
            {/* LinkedIn Card */}
            <div className="card bg-blue-800 text-white shadow-md">
              <div className="card-body items-center p-6">
                <FaLinkedinIn className="text-3xl mb-2" />
                <p className="text-2xl font-bold">758+</p>
                <p className="text-sm opacity-80">Contacts</p>
                <p className="text-sm opacity-80 mt-1">365 Feeds</p>
              </div>
            </div>
            {/* Google+ Card */}
            <div className="card bg-red-600 text-white shadow-md">
              <div className="card-body items-center p-6">
                <FaGooglePlusG className="text-3xl mb-2" />
                <p className="text-2xl font-bold">450</p>
                <p className="text-sm opacity-80">Followers</p>
                <p className="text-sm opacity-80 mt-1">57 Circles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInformation; // Exporting AdminInformation
