import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { TeamService } from 'src/app/services/team/team.service';


@Component({
  selector: 'app-contract-modal-page',
  templateUrl: './contract-modal-page.component.html',
  styleUrls: ['./contract-modal-page.component.scss']
})
export class ContractModalPageComponent implements OnInit {

  // "value" passed in componentProps
  public customer: any;
  public team: any;

  constructor(private modalController: ModalController,
    public navParams: NavParams,
    public teamService: TeamService,
    public loading: LoadingController) {
    // componentProps can also be accessed at construction time using NavParams
  }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.customer = this.navParams.get('customer');
    this.team = this.navParams.get('team');
  }

  async dimissModal() {
    const customer = this.customer
    const team = this.team
    await this.modalController.dismiss([customer, team]);
  }

}
