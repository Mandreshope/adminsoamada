import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { CustomerModalPageComponent } from './customer-modal-page/customer-modal-page.component';
import { OverlayEventDetail } from '@ionic/core';
import { MemberService } from 'src/app/services/member/member.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { MenuPopoverComponent } from 'src/app/components/menu-popover/menu-popover.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  confident: boolean

  contractContent: boolean
  customerContent: boolean
  customer: any
  contract: any
  checked: string

  customerDetails: any
  memberId: any;
  notification: any[] = []

  constructor(public menu: MenuController,
    public navController: NavController,
    public modalController: ModalController,
    private popoverController: PopoverController,
    private storage: Storage,
    public notificationService: NotificationService,
    public memberService: MemberService,
    public customerService: CustomerService,
    public loading: LoadingController) {

    this.contractContent = true
    this.checked = 'segment-button-checked'

  }

  ngOnInit() {
    this.checkUserConfidential()
    this.loadNotificationData()
  }

  ionViewDidEnter() {
    this.loadCustomerData()
    this.loadContractData()
  }

  segmentChanged(ev: any) {
    if (ev.detail.value == 'contrat') {
      this.contractContent = true
      this.customerContent = false
    } else {
      this.checked = null
      this.contractContent = false
      this.customerContent = true
    }
  }

  checkUserConfidential() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberService.getMember(res).subscribe((resp: any) => {
          if (resp.success) {
            if(res == resp.data._id){
              if(resp.data.role == 'simple user') {
                this.confident = true
                console.log('you are simple user')
              }else {
                this.confident = false
                console.log('you are chef de projet or admin')
              }
            }
          }
        }, (error: any) => {
          console.log(error.message)
        })
      }
    })
  }

  async loadNotificationData() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        let id = res
        this.notificationService.getNotifications().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if(e.membre == id) {
                this.notification.push(e)
              }
            });
          } else {
            resp.message
          }
        }, err => {
          console.log(err.message)
    
        })
      }
    })
  }

  async loadCustomerData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.getCustomers().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.customer = res.data
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

  async loadContractData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.getContracts().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.contract = res.data
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

  async removeCustomer(id: string) {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.removeCustomer(id).subscribe((res: any) => {
      if (res.success) {
        this.customerService.getCustomers().subscribe((res: any) => {
          if (res.success) {
            console.log(res.data)
            this.customer = res.data
            loading.dismiss();
          } else {
            res.message
            loading.dismiss();
          }
        }, err => {
          console.log(err.message)
          loading.dismiss();

        })
      } else {
        loading.dismiss()
        console.log(res.message)
      }
    }, (error: any) => {
      console.log(error.message)
    });
  }

  async removeContract(id: string) {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.removeContract(id).subscribe((res: any) => {
      if (res.success) {
        this.customerService.getContracts().subscribe((res: any) => {
          if (res.success) {
            console.log(res.data)
            this.contract = res.data
            loading.dismiss();
          } else {
            res.message
            loading.dismiss();
          }
        }, err => {
          console.log(err.message)
          loading.dismiss();

        })
      } else {
        loading.dismiss()
        console.log(res.message)
      }
    }, (error: any) => {
      console.log(error.message)
    });
  }

  async presentModal(customerDetails: any) {
    const modal = await this.modalController.create({
      component: CustomerModalPageComponent,
      componentProps: { 
        customerDetails: customerDetails
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuPopoverComponent,
      event: ev,
      cssClass: 'menu-popover',
      animated: true
    });
    return await popover.present();
  }

}
