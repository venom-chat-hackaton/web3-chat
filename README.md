# Venomchat.co is the a Web 3 Messenger with native on-chain message processing, making the most out of TVM architecture of Venom. 

:green_heart: [Watch Venom Chat Pitch Deck Presentation](https://www.youtube.com/watch?v=gh99-yFUxeo&feature=youtu.be)

:green_heart: [Pitch Deck Slides from the Video Presentation](https://docs.google.com/presentation/d/1pYn7STvRaf4iE6LoZnB3aAN5BOiUSl1OVlKbij-L-k4/edit?usp=sharing)

:green_heart: [Watch Product Demo](https://youtu.be/6tkwZ8SCLpA)

:green_heart: [DoraHacks BUIDL](https://dorahacks.io/buidl/5564)


### Features

   1. Decentralization & Encryption: total privacy and control in your conversations, free from third-party meddling, no matter where you are.
   2. Monetize Messaging: Set minimal fees for new connection messages and tap into new revenue opportunities.
   3. Seamless Integration: Easily integrate Venom Chat's SDK into any dApp on Venom for smooth, borderless communication.

Embrace the revolution with Venom Chat – the passport to global messaging freedom, powered by your Venom Wallet.

:key: # How does it work? 
1. During first connection, at initialization stage, app generates key-pair with [tweetnacl.js](https://www.section.io/engineering-education/implementing-public-key-cryptography-in-javascript/) that uses Diffie Hellman Algorithm. Then it encrypts generated private key with Venom Wallet private key using Venom encryptData method. At the last step it creates user’s chat contract, that stores encrypted generated private key, generated public key and nonce.

2. On user login, app gets generated keys data and decrypts it using Venom decryptData method.

3. On send message, it encrypts message using tweetnacl encryption method, sender's generated private key and recipient's generated public key, resulting in encrypted message with nonce that is stored in chat contract's events.

4. On get message, app gets chat contract's events and decrypts message with nonce using tweetnacl decryption method, recipient's generated private key and sender's generated public key.
