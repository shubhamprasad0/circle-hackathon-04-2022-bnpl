import qs from "querystring";
//import { MongoClient } from "mongodb";
const sdk2 = require("api")("@circle-api/v1#1w4m41l6sl26apylb");

const { MongoClient, ServerApiVersion } = require("mongodb");



export default async function handler(req, res) {
  
const url =
  "mongodb+srv://shivam:shivam@cluster0.auqwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = await MongoClient.connect(url);

const db = client.db();

const collection = db.collection("customers");

const users = await collection.find({ paymentType: "bnpl" }).toArray();

sdk2.auth(process.env.apikey);
console.log("userdetails" + users);
const paymentResponses = [];
try {
    const user = users[0]
    console.log(user.encryptDetails)
 // for (const user of users) {
      const payment = {
        amount: 10,
        currency: "USD",
      };
    const paymentResponse = await sdk2.createPayment({
      metadata: user.metadata,
      amount: payment,
      autoCapture: true,
      source: user.source,
      idempotencyKey: uuidv4(),
      keyId: user.publicKey["data"]["keyId"],
      verification: "none",
      description: "Payment",
      encryptedData: user.encryptDetails,
      //channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
    });
    //console.log(paymentResponse)
    paymentResponses.push(paymentResponse);
    console.log(paymentResponse)
  
  //   });
  //console.log(paymentResponses);
  res.status(200).json(paymentResponses);
} catch (e) {
  res.status(500).json({ e });
}

//res.status(200).json({ name: 'John Doe'})

}

