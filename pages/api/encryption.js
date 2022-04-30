/**
 * Encrypt card data function
 */

export async function encryptCard(
    dataToEncrypt) {
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