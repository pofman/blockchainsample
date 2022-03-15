const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.1.105:8545'));

const contractAddress = '0xae4e78dfd2807072C85c61Bbc7dA66493A920B1F';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "usdInvested",
				"type": "uint256"
			}
		],
		"name": "buyAwc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "awcToSell",
				"type": "uint256"
			}
		],
		"name": "sellAwc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			}
		],
		"name": "equity_in_awc",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "investor",
				"type": "address"
			}
		],
		"name": "equity_in_usd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "max_awesomecoins",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "total_awc_bought",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usd_to_awc",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



const magic = async () => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const contactList = new web3.eth.Contract(contractABI, contractAddress);
    const COUNTER = Object.keys(contactList._jsonInterface).length;
    console.log(COUNTER);

    for (let i = 0; i < COUNTER; i++) {
        console.log(contactList._jsonInterface[i].name);
    }

    contactList.methods.buyAwc('0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94', 10).send({from: '0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94'})
    .then((result) =>
        contactList.methods.equity_in_awc('0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94').call()
    )
    .then(console.log)
    .then((result) =>
        contactList.methods.equity_in_usd('0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94').call()
    )
    .then(console.log)
    .then(() => 
        contactList.methods.sellAwc('0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94', 200).send({from: '0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94'})
    ).then((result) =>
        contactList.methods.equity_in_awc('0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94').call()
    )
    .then(console.log)
    .then((result) =>
        contactList.methods.equity_in_usd('0x2B6343fF4BD5CFd9935B8e782CdBbe014a9ceC94').call()
    )
    .then(console.log)
    .catch((err) => console.log(err));
    
}

magic();