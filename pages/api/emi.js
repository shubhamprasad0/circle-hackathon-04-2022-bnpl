import qs from "querystring";
//import { MongoClient } from "mongodb";




export default async function handler(req, res) {
  
  

const { MongoClient, ServerApiVersion } = require('mongodb');


const url = "mongodb+srv://shivam:shivam@cluster0.auqwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = await MongoClient.connect(url);

const db = client.db();

const collection = db.collection('customers');

collection.insertOne({"Test": "Test"});


res.status(200).json({ name: 'John Doe'})

}

// const EASYCRON_API_KEY = process.env.EASYCRON_API_KEY;
// const FRONT_URL = process.env.VERCEL_URL || process.env.FRONT_URL;

// // Localhost doesn't work with easyCron, so I rename it, use ngrok instead
// const frontUrl = FRONT_URL.replace("localhost", "locolhost");

// const url = `https://www.easycron.com/rest/add?${qs.stringify({
//   token: EASYCRON_API_KEY,
//   url: `${frontUrl}/api/saysHappyFourthofEveryMonth`,
//   cron_expression: "0 12 4 * *",
//   cron_job_name: Math.floor(Math.random() * 100 * 213948),
// })}`;

// fetch(url);

