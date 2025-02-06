import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Get the token from localStorage or cookies
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token'); // Replace with cookies.get() if using cookies
  }
  return null;
}

// Check if the token is valid and unexpired
export function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const now = Math.floor(Date.now() / 1000); // Current timestamp (in seconds)
    return decoded.exp > now; // Check if token's expiration is in the future
  } catch (err) {
    console.error('Error validating token:', err);
    return false;
  }
}

// Log the user out
export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token'); // Clear the token from storage
    window.location.href = '/sign_in'; // Redirect user to sign-in page
  }
}
