import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.page.html',
  styleUrls: ['./customer-add.page.scss'],
})
export class CustomerAddPage implements OnInit {

  submitError: string;
  loginError: string;
  addCustomerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public loading: LoadingController,
    public customerService: CustomerService,
    public navController: NavController) {

      this.addCustomerForm = this.formBuilder.group({
        nom: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        prenom: new FormControl('', Validators.compose([
          Validators.required
        ])),
        sexe: new FormControl('', Validators.compose([
          Validators.required
        ])),
        tel: new FormControl('', Validators.compose([
          Validators.required
        ])),
        mail: new FormControl('', Validators.compose([
          Validators.required
        ])),
        adresse: new FormControl('', Validators.compose([
          Validators.required
        ])),
        type: new FormControl('', Validators.compose([
          Validators.required
        ])),
        tailleIdeal: new FormControl('', Validators.compose([
          Validators.required
        ])),
        probaCloture: new FormControl('', Validators.compose([
          Validators.required
        ])),
        montant: new FormControl('', Validators.compose([
          Validators.required
        ])),
        qualite: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });
    }

  ngOnInit() {
  }

  async addCustomer(data) {
    console.log(data)
    if (!data) {
      return
    }
    console.log(data)

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.addCustomer(data).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'customer'])
        loading.dismiss()
      }else {
        this.submitError = res.message
        loading.dismiss()
      }

    }, (err) => {
      this.submitError = err.error

    });
  }

}
