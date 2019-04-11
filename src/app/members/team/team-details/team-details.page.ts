import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {

  membreId = null
  teamId = null
  team: any
  slideOpts = {
    effect: 'flip'
  }

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private teamService: TeamService,
    public loading: LoadingController) {
    console.log(this.team)
  }

  ngOnInit() {
    this.teamId = this.route.snapshot.params['id']
    console.log(this.teamId)
    this.loadEquipeData()

  }

  async loadEquipeData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.teamService.getTeam(this.teamId).subscribe((res: any) => {
      if (res.success) {
        this.teamService.getTeamDetails().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (res.data._id == e._id) {
                this.team = e
                console.log(this.team)
                loading.dismiss();
              }
              loading.dismiss();
            });
          } else {
            loading.dismiss();
            console.log(resp.success)
          }
        })
      } else {
        loading.dismiss()
        console.log(res.message)
      }

    }, (err) => {
      loading.dismiss()
      console.log(err)

    });
  }

  async saveEquipe() {

  }

  async loadMembreEquipe() {

  }

  async saveMembreEquipe() {

  }

}
