import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {

  member: any

  constructor(
    private modalController: ModalController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.member = this.navParams.get('memberDetails');
    console.log('Membre dans modal  '+this.member)
  }

  async dimissModal() {
    const member = this.member
    await this.modalController.dismiss([member]);
  }

}
