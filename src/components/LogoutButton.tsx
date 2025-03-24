import LocalStorage from "@/utils/LocalStorage";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "@/utils/auth";

export default function LogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="hover:bg-red-600 hover:text-white text-red-400 px-4 py-2 rounded-md font-medium transition duration-200 border border-red-400"
      >
        Logout
      </button>

      {showConfirm && (
        <div className="flex items-center justify-center bg-black-white-10 fixed h-screen w-full inset-0 backdrop-blur-xs z-50">
          <div className="w-1/3 bg-black-white backdrop-blur-md p-6 rounded-xl shadow-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-2 py-1 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={signOut}
                className="hover:bg-red-600 hover:text-white text-red-600 border border-red-600 px-2 py-1 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
