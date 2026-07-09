import { LOGIN_CONSTANTS } from './login.constants';

import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="w-full min-h-screen p-0 m-0 bg-[#0F0F0F] flex flex-col md:flex-row">
      <div className="w-full h-1/3 md:w-2/4 md:h-screen flex justify-center items-center py-8 md:py-0">
        <img
          src="/brand.svg"
          alt="actually.mi"
          className="max-h-[33vh] md:max-h-full"
        />
      </div>
      <div className="w-full md:w-2/4 md:h-screen text-white flex flex-col gap-4 justify-center items-center px-4 pb-8 md:pb-0">
        <h1 className="font-semibold text-3xl md:text-5xl text-center m-4 md:m-8 p-2 md:p-4 [text-shadow:1px_1px_0px_rgba(200,200,210,0.6)]">
          {LOGIN_CONSTANTS.HEADING}
        </h1>
        <input
          className="w-full lg:w-9/12 border border-[rgba(200,200,210,0.6)] bg-white rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:border-[rgba(200,200,210,1)]"
          placeholder="Email address"
        />
        <input
          className="w-full lg:w-9/12 border border-[rgba(200,200,210,0.6)] bg-white rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:border-[rgba(200,200,210,1)]"
          placeholder="Password"
        />
        <button className="w-full lg:w-9/12 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-[#333333] hover:text-white transition-colors">
          {LOGIN_CONSTANTS.CONTINUE}
        </button>
        <hr className="w-full border-[rgba(200,200,210,0.4)]" />
        <div className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center">
          <button className="w-full lg:w-9/12 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-[#4285F4] hover:text-white transition-colors">
            {LOGIN_CONSTANTS.GOOGLE}
          </button>
          <button className="w-full lg:w-9/12 bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-[#333333] hover:text-white transition-colors">
            {LOGIN_CONSTANTS.APPLE}
          </button>
        </div>
        <hr className="w-full border-[rgba(200,200,210,0.4)]" />
        <span className="text-center text-sm md:text-base px-4">
          {LOGIN_CONSTANTS.TOS[0]}
          <span className="font-bold">{LOGIN_CONSTANTS.TOS[1]}</span>
        </span>
      </div>
    </div>
  );
};

export default Login;
