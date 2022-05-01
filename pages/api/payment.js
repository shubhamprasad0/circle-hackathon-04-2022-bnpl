import { NodeNextRequest } from 'next/dist/server/base-http/node';
import { v4 as uuidv4 } from 'uuid';
import { createMessage, encrypt, readKey } from 'openpgp';



const sdk = require('api')('@circle-api/v1#3j78yrx1rl0tlc3mx');
const sdk2 = require('api')('@circle-api/v1#1w4m41l6sl26apylb');



 async function encryptDetails(keyId,publicKey,dataToEncrypt){
       const decodedPublicKey = await readKey({
        armoredKey: Buffer.from(publicKey, 'base64').toString(),
    });

    const message = await createMessage({
        text: JSON.stringify(dataToEncrypt),
    });

    return encrypt({
        message,
        encryptionKeys: decodedPublicKey
    }).then((ciphertext) => {
        return {
            encryptedData: Buffer.from(ciphertext.toString()).toString('base64'),
            keyId,
        };
    });

} 


export default async function handler(req, res) {

    // Get PCI Public Key 
    const idempotencKey = uuidv4();
    sdk.auth(process.env.apikey);
    const x = process.env.apikey
    const publickey = await sdk.getPublicKey();

    const {cardNumber,CVV} = req.body;


    // Get Encryption Details
    //const encryptCard ;
    try{
  //  const encryptCard = await encryptDetails(publickey['data']['keyId'],publickey['data']['publicKey'],{cardNumber,CVV});
   const encryptCard = 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo' 
   sdk2.auth(process.env.apikey);
    const {billingDetails,metadata,expMonth,expYear,amount} = req.body;
    const cardDetails =  await sdk2.createCard({
        billingDetails: billingDetails,
        metadata: metadata,
        idempotencyKey: idempotencKey,
        keyId: publickey['data']['keyId'],
        encryptedData: encryptCard,
        expMonth: expMonth,
        expYear: expYear
    })
console.log(cardDetails)
   const source = {
        id: cardDetails['data']['id'],
        type: 'card'
   }
     const paymentResponse = await sdk2.createPayment({
      metadata: metadata,
      amount: amount,
      autoCapture: true,
      source: source,
      idempotencyKey: idempotencKey,
      keyId: publickey['data']['keyId'],
      verification: 'none',
      description: 'Payment',
      encryptedData: encryptCard
  //channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
})
      res.status(200).json({ paymentResponse });
  }catch(e){
  res.status(500).json({ e })
  ;    }

    // Create Card Payment 


       

    
  //   const card = await sdk2.createCard({
  //   billingDetails: {
  //   name: 'Satoshi Nakamoto',
  //   city: 'Boston',
  //   country: 'US',
  //   line1: '100 Money Street',
  //   postalCode: '01234',
  //   district: 'MA'
  // },
  // metadata: {
  //   email: 'satoshi@circle.com',
  //   sessionId: 'DE6FA86F60BB47B379307F851E238617',
  //   ipAddress: '244.28.239.130'
  // },
  // idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
  // keyId: 'key1',
  // encryptedData: 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
  // expMonth: 1,
  // expYear: 2020})
    

    // return encrypt({
    //     message,
    //     encryptionKeys: decodedPublicKey,
    // }).then((ciphertext) => {
    //     return {
    //         encryptedData: Buffer.from(ciphertext.toString()).toString('base64'),
    //         keyId,
    //     };
    // });

    // Start Payment


  
   // const {metadata,encryptedData,amount,source,idempotencyKey,keyId} = req.body;

  //  const source = {
  //       id: cardDetails['data']['id'],
  //       type: 'card'
  //  }
//    try{
//     const paymentResponse = await sdk2.createPayment({
//       metadata: {
//     email: 'satoshi@circle.com',
//     sessionId: 'DE6FA86F60BB47B379307F851E238617',
//     ipAddress: '244.28.239.130'
//   },
//   amount: {amount: '3.14', currency: 'USD'},
//   autoCapture: true,
//   source: {id: 'b8627ae8-732b-4d25-b947-1df8f4007a29', type: 'card'},
//   idempotencyKey: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
//   keyId: 'key1',
//   verification: 'none',
//   description: 'Payment',
//   encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
//   channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
// })
//       res.status(200).json({ paymentResponse });
//   } catch(error){
//     res.status(500).json({ error });
//   }
   
//    try{
//     const paymentResponse = await sdk2.createPayment({
//       metadata: metadata,
//   amount: amount,
//   autoCapture: true,
//   source: source,
//   idempotencyKey: idempotencKey,
//   keyId: publickey['data']['keyId'],
//   verification: 'none',
//   description: 'Payment',
//   encryptedData: encryptCard
//   //channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
// })
//       res.status(200).json({ paymentResponse });
//   } catch(error){
//     res.status(500).json({ error });
//   }
   


  
   //     res.status(200).json({ paymentResponse });
   // } catch (error) {
        
    //}
  // Example response payment in example-payloads
// sdk.createPayment({
//   metadata: {
//     email: 'satoshi@circle.com',
//     ipAddress: '244.28.239.130',
//     sessionId: 'DE6FA86F60BB47B379307F851E238617'
//   },
//   amount: {amount: '3.14', currency: 'USD'},
//   autoCapture: true,
//   source: {id: 'b8627ae8-732b-4d25-b947-1df8f4007a29', type: 'card'},
//   idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
//   keyId: 'key1',
//   verification: 'none',
//   description: 'Payment',
//   encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA=='
// })
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
// }

}