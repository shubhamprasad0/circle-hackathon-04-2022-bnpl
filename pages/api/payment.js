import { NodeNextRequest } from 'next/dist/server/base-http/node';

const sdk = require('api')('@circle-api/v1#9kvo29l1wa6b24');



export default async function handler(req, res) {

    const {metadata,encryptedData,amount,source,idempotencyKey,keyId} = req.body;

    await sdk.auth(process.env.apikey);

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