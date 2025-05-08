import React from "react";
import { useState } from "react";

const Registration = ({ onRegistration }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistration = (e) => {
      e.preventDefault();
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      onRegistration();
    };

    return (
              <>
                <div className="flex bg-cyan-800 h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                      Create account
                    </h2>
                  </div>
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                    onSubmit={handleRegistration} 
                    className="space-y-6">
                      <div>
                        <label htmlFor="text" className="block text-sm/6 font-medium text-white">
                          Username
                        </label>
                        <div className="mt-2">
                          <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                            Password
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
          
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
    );
};

export default Registration;