import { Injectable } from '@angular/core';

// @ts-ignore
import Web3 from 'web3';

declare let require: any;
declare let window: any;

const tokenAbi = require('./tokenContract.json');

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private _account: string = null;
  private _web3: any;
  private _tokenContract: any;
  private _tokenContractAddress = '0x58241fECb3435AB02f20C0906A3083C81a98948f';

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
      this._tokenContract = new this._web3.eth.Contract(tokenAbi, this._tokenContractAddress);

      if (window.web3.currentProvider.networkVersion !== '3') {
        alert('Please connect to the Ropsten network');
      }
    } else {
      alert( 'Please use a dapp browser like mist or MetaMask plugin for chrome');
    }
    console.log('contract methods:', this._tokenContract.methods);
  }

  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accounts) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }

          if (accounts.length === 0) {
            alert(
                'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          resolve(accounts[0]);
        });
      }) as string;
      this._web3.eth.defaultAccount = this._account;
    }
    return Promise.resolve(this._account);
  }

  public async beginSwap(data): Promise<number> {
    await window.ethereum.enable();
    const account = await this.getAccount();

    console.log(data);

    return new Promise((resolve, reject) => {
      const val = this._web3.utils.toWei(data.amountEth, 'ether');
      const rand = URL.createObjectURL(new Blob([])).slice(-36).replace(/-/g, '');

      this._tokenContract.methods.startSwap(this._tokenContractAddress, 0, '0x' + rand)
          .send({from: account, value: val}, (err, result) => {
        if (err != null) {
          reject(err);
          console.log('swap start error', err);
        }
        console.log('result', result);
        resolve(result);
      });
    }) as Promise<number>;
  }
}
