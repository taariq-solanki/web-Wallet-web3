import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { generateMnemonic } from "bip39";
import { Ethereum } from "./components/ethereum";
function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <div className="text-4xl flex justify-center bg-green-400 font-bold p-2">
        <h1>WEB BASED WALLET</h1>
      </div>
      <div className="flex justify-center items-center ">
        <button
          className=" bg-green-500 rounded-sm text-xl p-2 m-1 font-bold text-white"
          onClick={async function () {
            const mn = generateMnemonic();
            setMnemonic(mn);
          }}
        >
          Generate mnemonic
        </button>
        <h1>OR</h1>
        <div>
          {" "}
          <input
            className="min-w-80 w-80 bg-green-100 rounded-sm p-2 m-2"
            width={2000}
            type="text"
            placeholder={"enter your custom mnemonic"}
            onChange={function (i) {
              setMnemonic(i.target.value);
            }}
          />
        </div>
      </div>
      <center className="text-lg">
        <div>Current Mnemonic: {mnemonic} </div>
        <div>
          <Ethereum mnemonic={mnemonic}></Ethereum>
        </div>
      </center>
    </>
  );
}

export default App;
