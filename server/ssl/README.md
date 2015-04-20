ca.pem and sub.class1.server.ca.pem are included in the repo as they are the root certs for startssl.

Steps to install on a new server:
- Copy ssl certificate as ssl.crt
- Copy ssl encrypted private key as ssl.key
- Decrypt private key to private.key by running the following in git bash

```
openssl rsa -in ssl.key -out private.key
```
