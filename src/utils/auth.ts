import UserClass from "@/modules/UserClass";
import LocalStorage from "@/utils/LocalStorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_ROUTES = {
    SIGN_IN: "/api/auth/sign_in",
    LOGOUT: "/api/auth/logout",
};

/**
 * Handles the user sign-in process by sending a POST request to the authentication API.
 */
export async function signIn(email: string, password: string): Promise<boolean> {
    const dataOfSubmit = { email, password };
    try {
        const res = await fetch(API_ROUTES.SIGN_IN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataOfSubmit),
        });

        const contentType = res.headers.get("Content-Type");
        let data;

        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        } else {
            data = await res.text();
            console.error("Unexpected response:", data);
        }

        if (res.ok) {
            const dataOfUser = UserClass.fromJson(data.user);
            LocalStorage().setAttribute("DATA:USER", JSON.stringify(dataOfUser.toJson()));
            toast.success("You have logged in successfully!");
            setTimeout(() => {
                window.location.href = "/dashboard"; // Redirect to sign-in page
            }, 2000);
            return true;
        } else {
            if (res.status === 401) {
                toast.error("Invalid email or password.");
            } else {
                toast.error("Login failed. Please try again.");
            }
            console.log(data.error || "Login failed");
            return false;
        }
    } catch (error) {
        console.error("An error occurred during sign-in:", error);
        toast.error("An unexpected error occurred.");
        return false;
    }
}

/**
 * Handles the user sign-out process by sending a POST request to the logout API.
 */
export async function signUp(id: string,
    username: string,
    email: string,
    password: string,
    contact: string,
    gender: string,
    dateOfBirth: string,
    bio: string): Promise<boolean> {

    try {

        // Create a new User object
        const newUser = new UserClass(
            '',
            username,
            email,
            password,
            contact,
            gender,
            dateOfBirth,
            bio
        );

        // Submit the hashed password and other details
        const res = await fetch('/api/auth/sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser.toJson()),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success('Registration successful!');
            setTimeout(() => {
                window.location.href = "/sign_in"; // Redirect to sign-in page
            }, 2000);
            return true;
        } else {
            toast.error(data.error || 'An error occurred!');
            return false;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error('An error occurred: ' + error.message);
        } else {
            toast.error('An unexpected error occurred');
        }
        return false;
    }
};

/**
 * Handles the user sign-out process by sending a POST request to the logout API.
 */
export async function signOut(): Promise<void> {
    try {
        const res = await fetch(API_ROUTES.LOGOUT, {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            LocalStorage().removeAttribute("DATA:USER");
            toast.success("You have logged out successfully!");
        } else {
            toast.error("Logout failed. Please try again.");
        }

        setTimeout(() => {
            window.location.href = "/sign_in"; // Redirect to sign-in page
        }, 2000);
    } catch (error) {
        console.error("Error during logout:", error);
        toast.error("An unexpected error occurred.");
        setTimeout(() => {
            window.location.href = "/sign_in"; // Fallback redirect
        }, 2000);
    }
}

