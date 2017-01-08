'use strict';

const crypto = require('crypto');
const random = require('random-js')();

const RND_MIN = 0;
const RND_MAX = Math.pow(10, 10);

function Auth(appId, secretId, secretKey) {
  this.appId = appId;
  this.secretId = secretId;
  this.secretKey = secretKey;
}

Auth.prototype.createReusableSignature = function(expiration, bucket, filePath) {
  let current = Math.floor(Date.now() / 1000);
  let expired = current + Math.min(expiration, 7776000);
  let rnd = random.integer(RND_MIN, RND_MAX);
  let fileId = `/${this.appId}/${bucket}/${filePath}`;

  let plainText = `a=${this.appId}&b=${bucket}&k=${this.secretId}&e=${expired}&t=${current}&r=${rnd}&f=${fileId}`;
  let sign = encryptSignature(plainText, this.secretKey);

  return sign;
};

Auth.prototype.createNonreusableSignature = function(bucket, filePath) {
  let sign = this.createReusableSignature(0, bucket, filePath);

  return sign;
};

function encryptSignature(signature, secretKey) {
  let buffer = Buffer.from(signature, 'utf8');
  let encrypted = crypto.createHmac('sha1', secretKey).update(buffer).digest();
  let sign = Buffer.concat([encrypted, buffer]).toString('base64');

  return sign;
}

module.exports = Auth;