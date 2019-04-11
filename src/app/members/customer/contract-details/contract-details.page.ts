import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { ContractModalPageComponent } from '../contract-modal-page/contract-modal-page.component';
import { OverlayEventDetail } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss']
})
export class ContractDetailsPage implements OnInit {
  contractId: string
  contract: any
  constructor(
    private route: ActivatedRoute,
    public teamService: TeamService,
    public modalController: ModalController,
    public customerService: CustomerService,
    public loading: LoadingController) { }

  ngOnInit() {
    this.dropTeamDetails()
    this.contractId = this.route.snapshot.params['id']
    console.log(this.contractId)
    this.loadContractData()
  }

  ionViewDidLeave() {
    this.dropTeamDetails()
  }

  dropTeamDetails() {
    this.teamService.dropTeamDetails().subscribe((res: any) => {
      if(res.success) {
        console.log(res.message)
      }else {
        console.log(res.message)
      }
    })
  }

  async loadContractData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.getContract(this.contractId).subscribe((res: any) => {
      if (res.success) {
        this.customerService.getContractDetails().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (res.data._id == e._id) {
                this.contract = e
                console.log(this.contract)
                loading.dismiss();
              }
              loading.dismiss();
            });
            
          }else {
            loading.dismiss();
            console.log(resp.success)
          }
        }, err => {
          console.log(err.message)
          loading.dismiss();
    
        })
      } else {
        res.message
        loading.dismiss();
      }
    }, err => {
      console.log(err.message)
      loading.dismiss();

    })
  }


  async presentModal(customer: any, team: any) {
    const modal = await this.modalController.create({
      component: ContractModalPageComponent,
      componentProps: { 
        customer: customer,
        team: team 
      }
    });

    // modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    //   if (detail !== null) {
    //     console.log('The result:', detail.data);
    //   }
    // });

    return await modal.present();
  }
}
