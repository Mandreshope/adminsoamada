import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, NavController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member/member.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  passwordErrorMessages: string
  cpasswordErrorMessages: string

  memberId: string
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
  mdp: string
  observant: number
  role: string
  avatar: string
  firstMdp: string
  cpassword: string

  constructor(
    public menu: MenuController,
    private alert: AlertController,
    public loading: LoadingController,
    public router: Router,
    public memberService: MemberService,
    public navController: NavController,
    private storage: Storage) {

  }

  async ngOnInit() {
    this.loadMemberData()
  }

  async loadMemberData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.storage.get(environment.tokenKey).then((resp: any) => {
      if (resp) {
        this.memberService.getMember(resp).subscribe((res: any) => {
          if (res.success) {
            this.memberId = res.data._id
            this.nom = res.data.nom
            this.prenom = res.data.prenom
            this.dateDeNaissance = res.data.dateDeNaissance
            this.sexe = res.data.sexe
            this.cin = res.data.cin
            this.pere = res.data.pere
            this.mere = res.data.mere
            this.adresse = res.data.adresse
            this.numMatricule = res.data.numMatricule
            this.tel = res.data.tel
            this.mail = res.data.mail
            this.mdp = res.data.mdp
            this.firstMdp = res.data.mdp
            this.observant = res.data.observant
            this.role = res.data.role
            this.avatar = res.data.avatar
            loading.dismiss();
          } else {
            res.error
            loading.dismiss();
          }
        }, (err) => {
          console.log(err)
          loading.dismiss();

        })
      }
    })


  }

  async editProfile() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    var data: any

    data = {
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
      mdp: this.mdp,
      observant: this.observant,
      role: this.role,
      avatar: this.avatar
    }
    if (this.mdp == this.firstMdp) {
      console.log('not changed')
      console.log(data)

      this.memberService.updateMember(data, this.memberId).subscribe((res: any) => {
        if (res.success) {
          this.navController.navigateBack(['members', 'profile'])
          loading.dismiss();
        } else {
          res.message
          loading.dismiss();
        }
      }, err => {
        console.log(err.message)
        loading.dismiss();

      })
      loading.dismiss();
    } else {
      console.log('changed')
      if (this.mdp == '') {
        this.passwordErrorMessages = 'Mot de passe requis.'
        loading.dismiss();
      } else if (this.mdp.length <= 6) {
        this.passwordErrorMessages = 'La longueur du mot de passe doit être plus longue ou égale à 6 caractères.'
        loading.dismiss();
      } else {
        if (this.cpassword == '') {
          this.cpasswordErrorMessages = 'Confirmation mot de passe est requis. '
        } else if (this.cpassword != this.mdp) {
          this.cpasswordErrorMessages = 'Le mot de passe ne correspond pas au mot de passe de confirmation'
          loading.dismiss();
        } else {
          console.log(data)

          this.memberService.updateMember(data, this.memberId).subscribe((res: any) => {
            if (res.success) {
              this.navController.navigateBack(['members', 'profile'])
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
    }


  }

}
