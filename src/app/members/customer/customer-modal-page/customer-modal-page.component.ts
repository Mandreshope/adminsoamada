import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-customer-modal-page',
  templateUrl: './customer-modal-page.component.html',
  styleUrls: ['./customer-modal-page.component.scss']
})
export class CustomerModalPageComponent implements OnInit {
  customerDetails: any
  constructor(private modalController: ModalController,
    public navParams: NavParams) {
    // componentProps can also be accessed at construction time using NavParams
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.customerDetails = this.navParams.get('customerDetails');
  }

  async dimissModal() {
    const customerDetails = this.customerDetails
    await this.modalController.dismiss(customerDetails);
  }

}
