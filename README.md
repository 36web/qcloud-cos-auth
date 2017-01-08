# qcloud-cos-auth
Just a simple module which generates signatures for accessing Tencent Cloud COS APIs.

# Install
```sh
npm install qcloud-cos-auth --save
```

# Usage
```javascript
var Auth = require('qcloud-cos-auth');
var auth = new Auth('your app id', 'your secret id', 'your secret key');
var reusableSignature = auth.createReusableSignature(60, 'bucket', 'file name');
var nonReusableSignature = auth.createNonreusableSignature('bucket', 'file name');
```