/**
 * @Author: Resynz
 * @Date: 2020/4/24 17:49
 */
const helper = require('../index');
const assert = require('assert');
const fs=require('fs');

console.info('==Testing Crypto==');

console.time('[Crypto.md5]');
assert.strictEqual(helper.Crypto.md5("hello world"),"5eb63bbbe01eeed093cb22bb8f5acdc3");
console.timeEnd('[Crypto.md5]');

console.time('[Crypto.symmetryEncrypt]');
let secretKey = '5eb63bbbe01eeed093cb22bb8f5acdc3';
let content = 'hello world';
let encryptContent=helper.Crypto.symmetryEncrypt(secretKey,content);
assert.strictEqual(encryptContent,'da2faec7019e8b06e6a03f7fcea81f13');
console.timeEnd('[Crypto.symmetryEncrypt]');


console.time('[Crypto.symmetryDecrypt]');
assert.strictEqual(helper.Crypto.symmetryDecrypt(secretKey,encryptContent),content);
console.timeEnd('[Crypto.symmetryDecrypt]');

console.time('[Crypto.asymmetricEncrypt/Decrypt]');
let rsaPublicKey=fs.readFileSync(__dirname+'/rsa/rsa_public_key.pem');
let rsaPrivateKey = fs.readFileSync(__dirname+'/rsa/rsa_private_key.pem');
let asEncryptContent=helper.Crypto.asymmetricEncrypt(rsaPublicKey, content);
assert.strictEqual(content,helper.Crypto.asymmetricDecrypt(rsaPrivateKey,asEncryptContent));
console.timeEnd('[Crypto.asymmetricEncrypt/Decrypt]');

console.info('==Testing Crypto Pass==');
