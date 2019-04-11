import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MemberService } from 'src/app/services/member/member.service';
import { LoadingController, NavController } from '@ionic/angular';
import { RecruitmentService } from 'src/app/services/recruitment/recruitment.service';

@Component({
  selector: 'app-recruitment-add',
  templateUrl: './recruitment-add.page.html',
  styleUrls: ['./recruitment-add.page.scss'],
})
export class RecruitmentAddPage implements OnInit {
  submitError: string;
  loginError: string;
  recruitmentForm: FormGroup;
  member: any
  constructor(private formBuilder: FormBuilder,
    public memberService: MemberService,
    public loading: LoadingController,
    public recruitmentService: RecruitmentService,
    public navController: NavController) { 
    this.recruitmentForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      sexe: new FormControl('', Validators.compose([
        Validators.required
      ])),
      recruteur: new FormControl('', Validators.compose([
        Validators.required
      ])), 
      postulePour: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cv: new FormControl('', Validators.compose([
        Validators.required
      ])),
      interview: new FormControl('', Validators.compose([
        Validators.required
      ])),
      note: new FormControl('', Validators.compose([
        Validators.required
      ])),
      qualite: new FormControl('', Validators.compose([
        Validators.required
      ])),
      tel: new FormControl('', Validators.compose([
        Validators.required
      ])),
      mail: new FormControl('', Validators.compose([
        Validators.required
      ])),
      profileRS: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
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

  async addRecruitment(data) {
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

    this.recruitmentService.addRecruitment(data).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'recruitment'])
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
