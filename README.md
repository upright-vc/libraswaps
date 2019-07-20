# Libraswaps

In this open source project lead by Dr. Yaron Velner (Founder, CTO @ Kyber Network) supported by the Libracamp grant program,
we present a simple & straightforward implementation of Libra ⇔ ETH atomic swaps.

To learn more about Libraswaps head over to [www.libraswaps.com](https://www.libraswaps.com).

In atomic swaps, two parties, namely, Alice and Bob want to exchange coins without any trusted third party.
In this example Alice own an asset on the Libra chain, and Bob own Ether on the Ethereum blockchain.
The atomic swap is being done in the following way:

1. Alice picks up a random string as a secret and publish the outcome of keccak256(secret). Where keccak256 is a one-way cryptographic hash function.

2. Then Alice deploys a contract that sends libra to Bob, provided he gives the secret as an input

3. Bob deploys a contract over Ethereum that sends ETH to Alice, provided she gives the secret as an input.

4. Alice execute the contract on the Ethereum blockchain (and reveal her secret).

5. Bob witness the ethereum transaction and learn what is the secret.

6. Bob execute the swap on the Libra blockchain.

For the sake of simplicity we ignore the case where Alice does not reveal her secret, or the case where Bob does not deploy his contract. However these cases can be easily handled by putting a time lock in the contract that will allow the deployer to withdraw his or her assets in case the counter party acted maliciously.


