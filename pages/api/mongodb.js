const { MongoClient } = require('mongodb');


export default async function mongodb() {
const url = "mongodb+srv://shivam:shivam@cluster0.auqwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = await MongoClient.connect(url);

const db = client.db();

const collection = db.collection('customers');



}
