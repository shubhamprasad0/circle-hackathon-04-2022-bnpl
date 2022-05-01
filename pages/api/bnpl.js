import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
const sdk = require("api")("@circle-api/v1#3j78yrx1rl0tlc3mx");
const sdk2 = require("api")("@circle-api/v1#1w4m41l6sl26apylb");


async function encryptDetails(keyId, publicKey, dataToEncrypt) {
  const decodedPublicKey = await readKey({
    armoredKey: Buffer.from(publicKey, "base64").toString(),
  });

  const message = await createMessage({
    text: JSON.stringify(dataToEncrypt),
  });

  return encrypt({
    message,
    encryptionKeys: decodedPublicKey,
  }).then((ciphertext) => {
    return {
      encryptedData: Buffer.from(ciphertext.toString()).toString("base64"),
      keyId,
    };
  });
}

export default async function handler(req, res) {
  const url =
    "mongodb+srv://shivam:shivam@cluster0.auqwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = await MongoClient.connect(url);

  const db = client.db();

  const collection = db.collection("customers");

  const idempotencKey = uuidv4();
  sdk.auth(process.env.apikey);
  const x = process.env.apikey;
  const publickey = await sdk.getPublicKey();

  const encryptCard =
    "LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo";
  //const encryptCard = await encryptDetails(publickey['data']['keyId'],publickey['data']['publicKey'],{cardNumber,CVV});

  const { billingDetails, metadata, expMonth, expYear, amount, paymentType } =
    req.body;
       sdk2.auth(process.env.apikey);
  const cardDetails = await sdk2.createCard({
    billingDetails: billingDetails,
    metadata: metadata,
    idempotencyKey: idempotencKey,
    keyId: publickey["data"]["keyId"],
    encryptedData: encryptCard,
    expMonth: expMonth,
    expYear: expYear,
  });

  const source = {
    id: cardDetails["data"]["id"],
    type: "card",
  };


//   await collection.insertOne({
//     idempotencyKey: idempotencKey,
//     source: source,
//     paymentType: paymentType,
//     amount: amount,
//     metadata: metadata,
//     billingDetails: billingDetails,
//     expMonth: expMonth,
//     expYear: expYear,
//     encryptedData : encryptCard
//   });

  if (paymentType === "bnpl") {
        await collection.insertOne({
          idempotencyKey: idempotencKey,
          source: source,
          paymentType: paymentType,
          amount: amount,
          metadata: metadata,
          billingDetails: billingDetails,
          expMonth: expMonth,
          expYear: expYear,
          publicKey: publickey,
          encryptDetails: encryptCard
        });
    res
      .status(200)
      .json({
        message: `Amount of $${amount['amount']} will be deducted from your account on 30th next month.`,
      });

  } else {
    const remainingInstallment = 8;
    const emi = amount['amount'] / remainingInstallment;
      await collection.insertOne({
        idempotencyKey: idempotencKey,
        source: source,
        paymentType: paymentType,
        amount: amount,
        metadata: metadata,
        billingDetails: billingDetails,
        expMonth: expMonth,
        expYear: expYear,

        remainingInstallment: remainingInstallment,
        emi: emi,
        publicKey : publickey,
        encryptDetails: encryptCard

      });
    res
      .status(200)
      .json({
        message:
           `An amount of $${emi} will be deducted from your account every week on Sunday for next 8 weeks.`
      });
  }
}
