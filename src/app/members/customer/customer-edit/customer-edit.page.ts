import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.page.html',
  styleUrls: ['./customer-edit.page.scss'],
})
export class CustomerEditPage implements OnInit {
  nom: string
  prenom: string
  sexe: string
  tel: string
  mail: string
  adresse: string
  type: string
  tailleIdeal: string
  probaCloture: number
  montant: string
  qualite: number
  customerId: string

  constructor(
    private route: ActivatedRoute,
    public customerService: CustomerService,
    private navController: NavController,
    public loading: LoadingController) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['id']
    this.loadCustomerData()
  }

  async loadCustomerData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.getCustomer(this.customerId).subscribe((res: any) => {
      if (res.success) {
        this.nom = res.data.nom
        this.prenom = res.data.prenom
        this.sexe = res.data.sexe
        this.tel = res.data.tel
        this.mail = res.data.mail
        this.adresse = res.data.adresse
        this.type = res.data.type
        this.tailleIdeal = res.data.tailleIdeal
        this.probaCloture = res.data.probaCloture
        this.montant = res.data.montant
        this.qualite = res.data.qualite
        loading.dismiss();
        console.log(res.message)
      }else {
        loading.dismiss();
        console.log(res.message)
      }
    }, err => {
      console.log(err.message)
      loading.dismiss();

    })
  }

  async editCustomer() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    let avatar: string
    if (this.sexe == "Homme") {
      avatar = '/assets/user.jpg'
    }else {
      avatar = '/assets/userf.jpg'
    }

    let data = {
      nom: this.nom,
      prenom: this.prenom,
      sexe: this.sexe,
      tel: this.tel,
      mail: this.mail,
      adresse: this.adresse,
      type: this.type,
      tailleIdeal: this.tailleIdeal, 
      probaCloture: this.probaCloture, 
      montant: this.montant,
      qualite: this.qualite,
      avatar: avatar
    }

    this.customerService.updateCustomer( data, this.customerId ).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'customer'])
        loading.dismiss();
      } else {
        res.message
        loading.dismiss();
      }
    }, err => {
      console.log(err.message)
      loading.dismiss();

    })
  }

}
