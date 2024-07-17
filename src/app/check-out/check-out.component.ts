import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  paymentStatus: boolean = false
  grandTotal: any = ""
  payStatus: boolean = false
  constructor(private fb: FormBuilder) { }
  public payPalConfig?: IPayPalConfig;

  checkOutForm = this.fb.group({
    uname: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    flat: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9:, ]*')]],
    place: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    pincode: ["", [Validators.required, Validators.pattern('[0-9]*')]]
  })

  cancel() {
    this.checkOutForm.reset()
  }

  confirmAddress() {
    if (this.checkOutForm.valid) {
      this.paymentStatus = true
      this.grandTotal = sessionStorage.getItem('total')
    }
    else {
      alert('Please fill the form Properly')
    }
  }

  back() {
    this.paymentStatus = false
  }

  payment() {
    this.payStatus = true
    this.initConfig()
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);


      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }
}
