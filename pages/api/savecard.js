
const sdk = require('api')('@circle-api/v1#1w4m41l6sl26apylb');



 async function createCard(req,res){
    // const {billingDetails,metadata,encryptedData,expMonth,expYear,keyId} = req.body;
    // const cardDetails =  await sdk.createCard({
    //     billingDetails: billingDetails,
    //     metadata: metadata,
    //     idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
    //     keyId: keyId,
    //     encryptedData: encryptedData, 
    //     expMonth: expMonth,
    //     expYear: expYear
    // })
    //     .then(res1 => console.log(res1))
    //     .catch(err => console.error(err));

sdk.auth('QVBJX0tFWTo4NWVmYWU1NzI0NTA0ZGU5NjY1MTBmMjVkMGI3YzBjMDo5MzFhNTMyMTA5YWViN2RkNDdkMzFkMzk2YjFiZGIxZg==');
const card = await sdk.createCard({
  billingDetails: {
    name: 'Satoshi Nakamoto',
    city: 'Boston',
    country: 'US',
    line1: '100 Money Street',
    postalCode: '01234',
    district: 'MA'
  },
  metadata: {
    email: 'satoshi@circle.com',
    sessionId: 'DE6FA86F60BB47B379307F851E238617',
    ipAddress: '244.28.239.130'
  },
  idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
  keyId: 'key1',
  encryptedData: 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
  expMonth: 1,
  expYear: 2020
})

return res.status(201).json(card);




    // res.status(200).json({ cardDetails });

}
// export default function handler(req, res) {

//     const {billingDetails,metadata,encryptedData,expMonth,expYear,keyId} = req.body;

//     sdk.auth(process.env.CIRCLE_API_KEY);
//     sdk.createCard({
//         billingDetails: {
//             name: 'Vijay Sharma',
//             city: 'Shivnagar',
//             country: 'In',
//             postalCode: '804401',
//             line1: '100 Money Street'
//         },
//         metadata: {
//             email: 'chotu.kv@gmail.com',
//             ipAddress: '244.28.239.130',
//             sessionId: 'DE6FA86F60BB47B379307F851E238617'
//         },
//         idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
//         keyId: 'key1',
//         encryptedData: 'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
//         expMonth: 1,
//         expYear: 2020
//     })
//         .then(res => console.log(res))
//         .catch(err => console.error(err));
//     res.status(200).json({ card: 'Added Successfully' })
// }


export default createCard;