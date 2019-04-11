import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member/member.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.page.html',
  styleUrls: ['./team-edit.page.scss'],
})
export class TeamEditPage implements OnInit {
  nom: string
  membres: string
  description: string
  teamId: string

  member: any
  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    public loading: LoadingController,
    public teamService: TeamService,
    public memberService: MemberService
  ) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.params['id']
    this.getMembers()
    this.loadTeamData()
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

  async loadTeamData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.teamService.getTeam(this.teamId).subscribe((res: any) => {
      if (res.success) {
        this.nom = res.data.nom
        this.membres = res.data.membres
        this.description = res.data.description
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

  async editTeam() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    let data = {
      nom: this.nom,
      membres: this.membres,
      description: this.description
    }

    this.teamService.updateTeam(data, this.teamId).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'team'])
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
