import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { MemberService } from 'src/app/services/member/member.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit {

  checkIdentity: boolean

  member: any

  nom: string
  prenom: string
  dateDeNaissance: Date
  sexe: string
  cin: number
  pere: string
  mere: string
  adresse: string
  numMatricule: number
  tel: string
  mail: string
  // mdp: string
  // avatar: string
  // firstMdp: string
  // cpassword: string
  role: string
  observant: number
  constructor(
    private storage: Storage,
    public loading: LoadingController,
    public memberService: MemberService,
    private modalController: ModalController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.setMemberData()
    this.identificationCheck()
  }

  identificationCheck() {
    this.storage.get(environment.tokenKey).then((val: any) => {
      if (val == this.member._id) {
        this.checkIdentity = true
      } else {
        this.checkIdentity = false
      }
    })
  }

  setMemberData() {
    this.member = this.navParams.get('memberDetails');
    this.nom = this.member.nom
    this.prenom = this.member.prenom
    this.dateDeNaissance = this.member.dateDeNaissance
    this.sexe = this.member.sexe
    this.cin = this.member.cin
    this.pere = this.member.pere
    this.mere = this.member.mere
    this.adresse = this.member.adresse
    this.numMatricule = this.member.numMatricule
    this.tel = this.member.tel
    this.mail = this.member.mail
    this.role = this.member.role
    this.observant = this.member.observant
    console.log('Membre dans modal  ' + this.member)
  }

  async dimissModal() {
    const member = this.member
    await this.modalController.dismiss([member]);
  }

  async editMember() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    let data = {
      nom: this.nom,
      prenom: this.prenom,
      dateDeNaissance: this.dateDeNaissance,
      sexe: this.sexe,
      cin: this.cin,
      pere: this.pere,
      mere: this.mere,
      adresse: this.adresse,
      numMatricule: this.numMatricule,
      tel: this.tel,
      mail: this.mail,
      role: this.role,
      observant: this.observant
    }
    this.memberService.updateMember(data, this.member._id).subscribe((res: any) => {
      if (res.success) {
        this.dimissModal()
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
