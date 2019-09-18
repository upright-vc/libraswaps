import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-swaps-form',
  templateUrl: './swaps-form.component.html',
  styleUrls: ['./swaps-form.component.scss']
})

export class SwapsFormComponent implements OnInit {

  swapsFormGroup: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private cs: ContractsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.swapsFormGroup = this.formBuilder.group({
      pOneEthPublicAddress: [''],
      pOneLibraPublicAddress: [''],
      amountEth: ['', [Validators.required]],
      pOneEthPrivateKey: [''],
      pTwoLibraPublicAddress: [''],
      pTwoEthPublicAddress: [''],
      amountLibra: [''],
      pTwoLibraPrivateKey: [''],
    });
  }
  submitForm(data: object): void {
    this.cs.beginSwap(data).then(() => console.log('payment sent'));
  }
}
