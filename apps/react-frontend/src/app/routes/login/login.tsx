import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="w-screen h-screen p-0 m-0 bg-[#0F0F0F] flex">
      <div className="w-2/4 h-screen flex justify-center items-center">
        <img src="/brand.svg" alt="actually.mi" />
      </div>
      <div className="w-2/4 h-screen text-white [text-shadow:1px_1px_0px_rgba(200,200,210,0.6)] flex flex-col gap-4 justify-center items-center">
        <h1 className="font-semibold text-5xl text-center m-8 p-4">
          What's actually happening now.
        </h1>

        <input
          className="w-6/12 border border-[rgba(200,200,210,0.6)] bg-white rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:border-[rgba(200,200,210,1)]"
          placeholder="Email address"
        />
        <input
          className="w-6/12 border border-[rgba(200,200,210,0.6)] bg-white rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:border-[rgba(200,200,210,1)]"
          placeholder="Password"
        />

        <button className="w-6/12 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-gray-100 transition-colors">
          Continue
        </button>

        <hr className="w-full border-[rgba(200,200,210,0.4)]" />

        <div className="w-full flex gap-4 justify-center items-center">
          <button className="w-5/12 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-gray-100 transition-colors">
            Continue with Google
          </button>

          <button className="w-5/12 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-gray-100 transition-colors">
            Continue with Apple
          </button>
        </div>

        <hr className="w-full border-[rgba(200,200,210,0.4)]" />

        <span className="text-center">
          By continuing, you are agreeing to our
          <span className="font-bold">
            Terms of Service, Privacy Policies, and Cookie use.
          </span>
        </span>
      </div>
    </div>
  );
};

export default Login;
