import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecruitmentService } from 'src/app/services/recruitment/recruitment.service';
import { LoadingController, NavController } from '@ionic/angular';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-recruitment-edit',
  templateUrl: './recruitment-edit.page.html',
  styleUrls: ['./recruitment-edit.page.scss'],
})
export class RecruitmentEditPage implements OnInit {
  nom: string
  prenom: string
  sexe: string
  recruteur: string
  recruteurId: string
  postulePour: string
  cv: string
  interview: string
  note: number
  qualite: number
  tel: string
  mail: string
  profileRS: string
  recruitmentId: string

  member: any
  constructor(
    private route: ActivatedRoute,
    public recruitmentService: RecruitmentService,
    public memberService: MemberService,
    private navController: NavController,
    public loading: LoadingController) { }

  ngOnInit() {
    this.recruitmentId = this.route.snapshot.params['id']
    this.loadRecruitmentData()
    this.getMembers()
  }

  getMembers() {
    this.memberService.getMembers().subscribe((res: any) => {
      if (res.success) {
        this.member = res.data
        console.log(this.member)
        console.log(res.success)
      } else {
        console.log(res.success)
      }
    }, err => {
      console.log(err.message)

    })
  }

  async loadRecruitmentData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.recruitmentService.getRecruitment(this.recruitmentId).subscribe((res: any) => {
      if (res.success) {
        this.nom = res.data.nom
        this.prenom = res.data.prenom
        this.sexe = res.data.sexe
        this.recruteur = res.data.recruteur
        this.recruteurId = res.data.recruteur._id
        this.postulePour = res.data.postulePour
        this.cv = res.data.cv
        this.interview = res.data.interview
        this.note = res.data.note
        this.qualite = res.data.qualite
        this.tel = res.data.tel
        this.mail = res.data.mail
        this.profileRS = res.data.mail
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

  async editRecruitment() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    let avatar: string
    if (this.sexe == "Homme") {
      avatar = '/assets/user.jpg'
    } else {
      avatar = '/assets/userf.jpg'
    }

    let data = {
      nom: this.nom,
      prenom: this.prenom,
      sexe: this.sexe,
      recruteur: this.recruteurId,
      postulePour: this.postulePour,
      cv: this.cv,
      interview: this.cv,
      note: this.note,
      qualite: this.qualite,
      tel: this.tel,
      mail: this.mail,
      profileRS: this.profileRS,
      recruitmentId: this.recruitmentId,
      avatar: avatar
    }

    this.recruitmentService.updateRecruitment(data, this.recruitmentId).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'recruitment'])
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
