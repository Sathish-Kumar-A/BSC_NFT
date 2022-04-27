const Web3 = require("web3");
require("dotenv").config();
const { URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const web3 = new Web3(URL);
const contractAddress = "0x24b8548C29C8428a1A7828054ba2Ebb2A3f4031F";

const bscNFTContract = new web3.eth.Contract(contract.abi, contractAddress);

const mintBSCNFT = async (tokenURI) => {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY);
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        data: bscNFTContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
        gas:"5000000"
    }

    const signedTX = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY).then((result) => {
        web3.eth.sendSignedTransaction(result.rawTransaction, (err, txHash) => {
            if (err) {
                console.log("somethins went wrong", err);
            }
            else {
                console.log("The transaction hash is ", txHash);
            }
        })
    }).catch((err) => {
        console.log("Error occured in promise",err)
    })
}

mintBSCNFT("ipfs://QmaMWWHrLpdEcFFF57F51eochQhBqxsJUNZ8HtgnS1Ef2g");

