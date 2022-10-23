require('dotenv').config()
// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const pubKey = process.env.PUBLIC_KEY

const airDrop = async () => {
     try {
       // Connect to the Devnet and make a wallet from privateKey
       const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

       // Request airdrop of 2 SOL to the wallet
       console.log("Airdropping some SOL to my wallet!");
       const fromAirDropSignature = await connection.requestAirdrop(
         new PublicKey(pubKey),
         2 * LAMPORTS_PER_SOL
       );
       await connection.confirmTransaction(fromAirDropSignature);
     } catch (err) {
       console.log(err);
     }
}

const getWalletBalance = async () => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // console.log("Connection object is:", connection);

    // Make a wallet (keypair) from privateKey and get its balance
    const walletBalance = await connection.getBalance(
      new PublicKey(pubKey)
    );
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

const mainFunction = async () => {
    // await getWallet();
    await airDrop();
    await getWalletBalance();
}

mainFunction()