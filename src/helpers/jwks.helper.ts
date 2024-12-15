import forge from 'node-forge';

export const encryptData = (data: string, publicKeyBase64: string) => {
    const publicKeyPem = forge.util.decode64(publicKeyBase64);
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(forge.util.encodeUtf8(JSON.stringify(data)), 'RSA-OAEP', {
        md: forge.md.sha256.create()
    });
    return forge.util.encode64(encrypted);
};