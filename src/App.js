import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [address, setAddress] = useState(null);

  const checkIfWalletConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          //connect to wallet and store the address
          const response = await solana.connect({});

          setAddress(response.publicKey.toString());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    const {solana} = window;

    if(solana){
      const response = await solana.connect();
      setAddress(response.publicKey.toString());
    }
  }

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  });

  return (
    <div className="App">
      <div className="navbar">
        <div className="navbar-logo">
          <h4>Solana Dapp</h4>
        </div>
        <div className="navbar-connect">
          {
            !address ? (
              <button onClick={connectWallet} className="connect">Connect Wallet</button>
            ):
            (
              <button onClick={connectWallet} className="connect">Connected</button>
            )
          }
         
        </div>
      </div>
    </div>
  );
}

export default App;
