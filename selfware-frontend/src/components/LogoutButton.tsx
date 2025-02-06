import LocalStorage from "@/utils/LocalStorage";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
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
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
      >
        Logout
      </button>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/45 backdrop-blur-xs z-50">
          <div className="bg-white/20 p-6 rounded-md text-white shadow-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="hover:bg-white hover:text-black text-white-600 border border-white px-2 py-1 rounded-md"
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
