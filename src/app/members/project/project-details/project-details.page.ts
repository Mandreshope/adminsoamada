import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  projectId: string
  project: any
  timeline: any
  progression: number
  percent: number
  taskLength: number

  progressBar: boolean
  duration: string

  slideOpts = {
    effect: 'flip'
  }
  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    public momentService: MomentService,
    private nav: NavController,
    public projectService: ProjectService,
    public loading: LoadingController,
    public storage: Storage,
    public teamService: TeamService) {
  }

  ngOnInit() {
    //drop the table teamDetails on ngOnInit
    this.dropTeamDetails()
    this.projectId = this.route.snapshot.params['id']
    this.loadProjectData()
  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
    this.dropTeamDetails()
  }

  dropTeamDetails() {
    this.teamService.dropTeamDetails().subscribe((res: any) => {
      if (res.success) {
        console.log(res.message)
      } else {
        console.log(res.message)
      }
    })
  }

  updateProjectData(data: any, id: string) {
    this.projectService.updateProject(data, id).subscribe((ress: any) => {
      if (ress.success) {
        this.reloadProjectData()
        console.log(ress.message)
      } else {
        console.log(ress.message)
      }
    })
  }

  async presentToastWithOptions(message: string, positions:any) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: positions,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  async loadProjectData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.projectService.getProject(this.projectId).subscribe((res: any) => {
      if (res.success) {
        this.projectService.getProjectDetails().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (res.data._id == e._id) {
                this.project = e
                this.timeline = this.momentService.calculateRestOfMomentBetweenTwoDates(e.dateFin)
                this.percent = this.momentService.calculateDaysInPercentage(e.dateDebut, e.dateFin)
                this.duration = this.momentService.calculateDuration(e.dateDebut, e.dateFin)

                var tot = 0
                var tabDays: number[] = []
                for (let index = 0; index < e.taches.length; index++) {
                  const el = e.taches[index];

                  // return percentage_rounded 
                  let calc: number
                  // sum array elements
                  if (el.statut == 'Fait') {
                    calc = 1.0
                  } else if (el.statut == 'Encours') {
                    calc = this.momentService.calculateDaysInPercentage(el.dateDebut, el.dateFin)
                  }

                  if (calc <= 1) {
                    tabDays.push(this.momentService.calculateDays(el.dateFin))
                    tot += calc
                    this.progression = (tot) / e.taches.length
                  } else {
                    this.progression = 1.0
                  }

                }

                if (this.progression == 1) {
                  let data = {
                    developpement: 'Fait'
                    // completeDate: this.momentService.dateNow()
                  }

                  this.dropTeamDetails()

                  this.updateProjectData(data, this.projectId)

                  this.presentToastWithOptions('Tous les tâches sont terminés. Développement terminé !', 'Bottom')

                } else {
                  // let daysMax = Math.max(...tabDays)
                  let tabdate: any[] = []
                  for (let index = 0; index < e.taches.length; index++) {
                    const el = e.taches[index];
                    // return percentage_rounded 
                    tabdate.push(el.dateFin)
                  }

                  // var data = {}
                  // let maxDate = this.momentService.getMaxDate(tabdate)
                  let percentRounded = Math.round(this.percent * 100) / 100
                  if (percentRounded == 1.0) {
                    // var datefin = this.momentService.addDays(maxDate, e.dateFin)
                    this.presentToastWithOptions('Timeline terminé !', 'bottom')
                  }
                  // if (percentRounded == 1.0) {
                  //   // var datefin = this.momentService.addDays(maxDate, e.dateFin)
                  //   data = {
                  //     developpement: 'Encours',
                  //     dateFin: maxDate.format('YYYY-MM-DD HH:mm:ss'),
                  //     completeDate: null
                  //   }
                  // } else if (percentRounded < 1.0) {
                  //   data = {
                  //     developpement: 'Encours',
                  //     completeDate: null
                  //   }
                  // }

                  // console.log(maxDate.format('YYYY-MM-DD HH:mm:ss'))
                  // console.log(this.momentService.addDays(maxDate, e.dateFin).format('YYYY-MM-DD HH:mm:ss'))

                  // console.log(tabdate)

                  // this.dropTeamDetails()

                  // this.updateProjectData(data, this.projectId)
                }
                loading.dismiss();
              }
              loading.dismiss();
            });
          } else {
            loading.dismiss();
            console.log(resp.message)
          }
        })
      } else {
        console.log(res.message)
        loading.dismiss();
      }
    }, err => {
      console.log(err.message)
      loading.dismiss();

    })
  }

  async reloadProjectData() {
    this.progressBar = true
    this.projectService.getProject(this.projectId).subscribe((res: any) => {
      if (res.success) {
        this.projectService.getProjectDetails().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (res.data._id == e._id) {
                this.project = e
                this.timeline = this.momentService.calculateRestOfMomentBetweenTwoDates(e.dateFin)
                this.percent = this.momentService.calculateDaysInPercentage(e.dateDebut, e.dateFin)

                var tot = 0
                var tabDays: number[] = []
                for (let index = 0; index < e.taches.length; index++) {
                  const el = e.taches[index];
                  // return percentage_rounded 
                  let calc: number
                  // sum array elements
                  if (el.statut == 'Fait') {
                    calc = 1.0
                  } else if (el.statut == 'Encours') {
                    calc = this.momentService.calculateDaysInPercentage(el.dateDebut, el.dateFin)
                  }
                  // sum array elements
                  if (calc <= 1) {
                    tabDays.push(this.momentService.calculateDays(el.dateFin))
                    tot += calc
                    this.progression = (tot) / e.taches.length
                  } else {
                    this.progression = 1.0
                  }
                }
                this.progressBar = false
                console.log(this.project)
              }
            });
          } else {
            this.progressBar = false
            console.log(resp.success)
          }
        })
      } else {
        this.progressBar = false
        console.log(res.message)
      }
    }, err => {
      this.progressBar = false
      console.log(err.message)

    })
  }

  calculateProjectProgression(tasks) {
    var tot: number
    var result: number
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      tot += element
      result = (tot) / tasks.length

    }
    return result
  }

}
