import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import { ethers } from "ethers";
import { AddrDisplay } from "./addrDisplay";

export function Ethereum({ mnemonic }) {
  const infuraapi =
    "https://sepolia.infura.io/v3/ca55624934f1459f90a7ddde588c9212";
  const mainnet =
    "https://mainnet.infura.io/v3/ca55624934f1459f90a7ddde588c9212";
  const network = "sepolia";
  const [index, setIndex] = useState(0);
  const [acc, setAcc] = useState([]);
  // const [addresses, setAddresses] = useState([]);
  // const [pvtAddresses, setPvtAddresses] = useState([]);
  // const [balance,setBalance]=useState([])
  const provider = new ethers.JsonRpcProvider(mainnet);

  return (
    <div>
      <div>
        <button
          className=" bg-green-500 rounded-sm text-xl p-2 m-1 font-bold text-white"
          onClick={async function () {
            const seed = await mnemonicToSeed(mnemonic);
            const hdNode = ethers.HDNodeWallet.fromSeed(seed);

            const derivationPath = `m/44'/60'/${index}'/0'`;
            const childAccount = hdNode.derivePath(derivationPath);
            const pvtkey = childAccount.privateKey;
            //setPvtAddresses([...pvtAddresses,pvtkey])

            const wallet = new ethers.Wallet(pvtkey, provider);

            const pubKey = wallet.address;
            console.log(pvtkey);
            console.log(wallet);
            //setAddresses([...addresses,pubKey])
            setIndex(index + 1);
            const bal = await provider.getBalance(pubKey);
            const numbBal = Number(bal);
            console.log(Number(bal));
            //setBalance([...balance,numbBal])

            setAcc([
              ...acc,
              {
                id: index,
                pvtAddress: pvtkey,
                address: pubKey,
                balance: numbBal,
                wallet: wallet,
              },
            ]);
          }}
        >
          generate account
        </button>
      </div>
      <div>
        {acc.map(function (i) {
          return <AddrDisplay key={i.id} acc={i}></AddrDisplay>;
        })}
        {console.log(acc)}
      </div>
    </div>
  );
}
