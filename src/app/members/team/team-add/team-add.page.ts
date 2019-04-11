import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TeamService } from 'src/app/services/team/team.service';
import { NavController, LoadingController } from '@ionic/angular';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.page.html',
  styleUrls: ['./team-add.page.scss'],
})
export class TeamAddPage implements OnInit {

  submitError: string;
  addTeamForm: FormGroup;
  member: any

  constructor(private formBuilder: FormBuilder,
    private teamService: TeamService,
    public navController: NavController,
    public memberService: MemberService,
    public loading: LoadingController) {

    this.addTeamForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      membres: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('')
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

  async addTeam(data) {

    //filtrer le membre selectionné puis stocké dans la variable local membres
    // for ( let index = 0; index < data.membres.length; index++) {
    //   const e = data.membres[index]
    //   for (let index = 0; index < this.member.length; index++) {
    //     const t = this.member[index]
    //     if (e == t._id) {
    //       membres.push(t)
    //     }
    //   }

    // }

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.teamService.addTeam(data).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'team'])
        loading.dismiss()
      }else {
        this.submitError = res.message
        loading.dismiss()
      }

    }, (err) => {
      this.submitError = err.message

    });
  }

}
