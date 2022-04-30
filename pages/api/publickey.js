const sdk = require('api')('@circle-api/v1#3j78yrx1rl0tlc3mx');


async function handler(req,res){
    sdk.auth(process.env.apikey);
    return sdk.getPublicKey()
        .then(res1 => res.status(200).json(res1))
        .catch(err => console.error(err));
}

export default handler;
