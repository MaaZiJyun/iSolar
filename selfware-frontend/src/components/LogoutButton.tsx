import LocalStorage from "@/utils/LocalStorage";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // 确保Cookie被发送
      });

      if (response.ok) {
        LocalStorage().removeAttribute("DATA:USER");
        toast.success("You have logged out successfully!");
        setTimeout(() => {
          window.location.href = "/sign_in";
        }, 2000);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="hover:bg-red-600 hover:text-white text-red-400 px-4 py-2 rounded-md font-medium transition duration-200 border border-red-400"
      >
        Logout
      </button>

      {showConfirm && (
       <div className="bg-black-white-10 fixed h-screen w-full inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="w-1/3 bg-black-white-10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-2 py-1 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
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
