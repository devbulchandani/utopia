import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => (
  <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>
      <p className="text-center text-gray-500 mb-6">Log in with your email or Google account.</p>
      <SignIn />
    </div>
  </div>
);

export default LoginPage;
