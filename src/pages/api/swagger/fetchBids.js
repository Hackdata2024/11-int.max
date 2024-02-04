import Cors from 'cors';
import initMiddleware from '../../../lib/cors'
import { fetchPropertyTopic } from '../../../../contracts/NewContractDetails';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  // 0x23fb658c1698b92f5fe511a079c17ecf7965cbc3f1b873328c67e2c3c0820f1f
  try {
    
    const response = await fetch(`https://deep-index.moralis.io/api/v2/0x635eD4418Fdf219F8D8A9233AeAA10dc2d77Af0C/events?chain=mumbai&topic=0xe0dbc3226384ac2b8c8a255834c5eb313179aefdd33db44dd2e6208830cfb05f`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjYwMzlhNDBlLWJmMzgtNDlmNS1iODgyLTA5MzU2MDEwNWQ3OSIsIm9yZ0lkIjoiMzc1NTcxIiwidXNlcklkIjoiMzg1OTUwIiwidHlwZUlkIjoiZDM2YTk2MmUtOTViMi00OTUxLTg3MzQtZWQ2MTk2MTk2MTQxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDY5NTU5ODUsImV4cCI6NDg2MjcxNTk4NX0.KtftUebcmVBdG61XeUqBjO96tT5h79PARwPFUn3bKsw',
      },
      body:JSON.stringify
      (	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "propertyId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "cancelled",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "accepted",
						"type": "bool"
					}
				],
				"indexed": false,
				"internalType": "struct RealEstate.Bid[]",
				"name": "bids",
				"type": "tuple[]"
			}
		],
		"name": "ShowAllBids",
		"type": "event"
	}),
    });
    
    const data = await response.json();

    console.log("server side")
   // console.log(data)
    // console.log('Data:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
