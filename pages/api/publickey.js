const sdk = require('api')('@circle-api/v1#3j78yrx1rl0tlc3mx');


async function handler(){
    await sdk.auth(process.env.apikey);
    return sdk.getPublicKey()
        .then(res1 => console.log(res1))
        .catch(err => console.error(err));
}

export default handler;
