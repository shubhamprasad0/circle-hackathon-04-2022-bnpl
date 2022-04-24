import { NodeNextRequest } from 'next/dist/server/base-http/node';

const sdk = require('api')('@circle-api/v1#9kvo29l1wa6b24');

 async function encryptDetails(){
       const decodedPublicKey = await readKey({
        armoredKey: Buffer.from(publicKey, 'base64').toString(),
    });

    const message = await createMessage({
        text: JSON.stringify(dataToEncrypt),
    });

    return encrypt({
        message,
        encryptionKeys: decodedPublicKey,
    }).then((ciphertext) => {
        return {
            encryptedData: Buffer.from(ciphertext.toString()).toString('base64'),
            keyId,
        };
    });

} 

export default async function handler(req, res) {

    // Get PCI Public Key 
    await sdk.auth(process.env.apikey);
    const publickey = await sdk.getPublicKey(); 


    // Encrypt Details 
       const decodedPublicKey = await readKey({
        armoredKey: Buffer.from(publicKey, 'base64').toString(),
    });

    const message = await createMessage({
        text: JSON.stringify(dataToEncrypt),
    });

    //const encryptedDatas = await encrypt({message,encryptKeys: decodedPublicKey})

    const encryptCard = await encryptDetails();

    const {billingDetails,metadata,encryptedData,expMonth,expYear,keyId} = req.body;
    const cardDetails =  await sdk.createCard({
        billingDetails: billingDetails,
        metadata: metadata,
        idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
        keyId: keyId,
        encryptedData: encryptedData, 
        expMonth: expMonth,
        expYear: expYear
    })



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

    const paymentResponse = await sdk.creatPayment({
        metadata: metadata,
        amount: amount,
        autoCapture : true,
        idempotencKey : '', // Todo: UUID v4 generator
        keyId: keyId,
        verification : 'none',
        encryptedData: encryptedData // CVV and Card Number Encrypter
    })

    return paymentResponse; // Example response payment in example-payloads
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