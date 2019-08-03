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

## Running the project
To run the atomic_swap implementation test, you should perform the following steps:

 Clone the Libra Core Repository:

```
git clone https://github.com/libra/libra.git
```

Change to the libra directory:

```
cd libra
```

Setup Libra Core:

To setup Libra Core, run the setup script to install the dependencies
```
./scripts/dev_setup.sh
```

The setup script performs these actions:

- Installs rustup — rustup is an installer for the Rust programming language, which Libra Core is implemented in.
- It Installs the required versions of the rust-toolchain.
- Installs CMake — to manage the build process.
- Installs protoc — a compiler for protocol buffers.
- Also, installs Go — for building protocol buffers.


Copy the atomic_swap.mvir (Move IR source code) to the test folder in the Libra repository located at language/functional_tests/tests/testsuite/modules


Execute the following command in the Libra repository:

```
cargo test -p functional_tests atomic_swap
```

Note: If your tests failed, edit the `atomic_swap.mvir` file and run the following command to rerun the tests:

```
cargo test -p functional_tests --test testsuite
```

