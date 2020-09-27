import React from "react";
import "./tailwind.output.css";

function App() {
  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-400 leading py-2">
          CRA + tailwind + auth template
        </h1>
        <p className="text-base text-gray-800 leading-normal py-3">
          build event starter; <br /> <b>for use with build-backend-auth </b>.
        </p>
        <a className="text-base text-gray-600 font-bold" href="https://build-starter-auth-backend.herokuapp.com/auth/google">
          Login with Google
        </a>
      </div>
    </div>
  );
}

export default App;
