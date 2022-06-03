const contract = require('../artifacts/contracts/SalamunZombie.sol/SalamunZombie.json');
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const Web3 = require('web3');
const web3 = new Web3("ws://localhost:8545");
const nftContract = new web3.eth.Contract(contract.abi,contractAddress);

const ACCOUNT_PUBLIC_KEY = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';
const ACCOUNT_PRIVATE_KEY = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';

async function mintNft(){
    const nonce = await web3.eth.getTransactionCount(ACCOUNT_PUBLIC_KEY,'latest');

    const tx = {
        'from': ACCOUNT_PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 1000000,
        'data': nftContract.methods.mint(4).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx,ACCOUNT_PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function getBalanceNft(){
    const balanceOf = await nftContract.methods.balanceOf(ACCOUNT_PUBLIC_KEY).call();

    console.log(`Total nft from address ${ACCOUNT_PUBLIC_KEY} is : ${balanceOf}`);
}

mintNft();
// getBalanceNft();