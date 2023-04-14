import React from "react";
import { useMetamask } from "@thirdweb-dev/react";

function Login() {
  const loginWithMetaMask = useMetamask();

  return (
    <div className="bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img
          className="rounded-full h-56 w-56 mb-10"
          src="https://lh3.googleusercontent.com/a/AGNmyxYFk2I4AnUJhSAjTB7IUDFEfrNy1PnHqwZwmLLexQ=s576"
        />
        <h1 className="text-6xl text-white font-bold">DAFT DRAW</h1>
        <h2 className="text-white">
          Get started by logging in with your MetaMask
        </h2>

        <button
          onClick={loginWithMetaMask}
          className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold"
        >
          Connect MetaMask
        </button>
      </div>
    </div>
  );
}

export default Login;
