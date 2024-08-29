export function AddrDisplay({ acc }) {
  return (
    <div className="w-3/6 bg-zinc-100 p-3 rounded-sm m-1">
      <h1>Address:{acc.address}</h1>
      <div className="flex justify-between items-center">
        <h1>Balance:{acc.balance}</h1>

        <button
          className=" bg-green-500 rounded-sm text-xl p-2 m-1 font-bold text-white"
          onClick={async function () {
            let recvAddr = prompt("Receiver address");
            let amntInWei = prompt("Amount in wei");
            console.log(typeof recvAddr);
            try {
              const tx = await acc.wallet.sendTransaction({
                to: recvAddr,
                value: amntInWei,
              });
              alert("succesful")
              console.log("Transaction sent:", tx.hash);
            } catch (error) {
              console.error("Error sending transaction:", error);
              alert("error occured")
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
