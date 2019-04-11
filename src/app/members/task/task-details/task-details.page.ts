import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { PopoverComponent } from '../../../components/popover/popover/popover.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  taskId: string
  task: any

  progressBar: boolean

  percent: number
  timeline: any
  duration: string

  constructor(private route: ActivatedRoute,
    private nav: NavController,
    public toastController: ToastController,
    private taskService: TaskService,
    public popoverController: PopoverController,
    public momentService: MomentService,
    public loading: LoadingController) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id']
    console.log(this.taskId)
    this.loadTaskData()
  }

  async presentToastWithOptions(message: string, positions: any) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: positions,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }

  async loadTaskData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.taskService.getTask(this.taskId).subscribe((res: any) => {
      if (res.success) {
        this.taskService.getDetailsTask().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (res.data._id == e._id) {
                this.task = e
                this.timeline = this.momentService.calculateRestOfMomentBetweenTwoDates(e.dateFin)
                this.percent = this.momentService.calculateDaysInPercentage(e.dateDebut, e.dateFin)
                this.duration = this.momentService.calculateDuration(e.dateDebut, e.dateFin)
                console.log(this.timeline)
                console.log(this.percent)

                var data = {}

                if (e.statut != 'Fait') {
                  if (this.timeline == 'Terminé !') {
                    data = {
                      statut: 'Fait'
                      // completeDate: this.momentService.dateNow()
                    }
                    this.presentToastWithOptions('Timeline terminé !', 'bottom')
                  } else if (this.percent < 1.0) {
                    data = {
                      statut: 'Encours',
                      completeDate: null
                    }
                  }
                  this.updateTaskData(data, this.taskId)
                  
                }


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
        res.message
        loading.dismiss();
      }
    }, err => {
      console.log(err.message)
      loading.dismiss();

    })
  }

  updateTaskData(data: any, id: string) {
    this.taskService.updateTask(data, id).subscribe((ress: any) => {
      if (ress.success) {
        console.log(ress.message)
        this.reloadTaskData()
      } else {
        console.log(ress.message)
      }
    })
  }

  reloadTaskData() {
    this.progressBar = true
    this.taskService.getTask(this.taskId).subscribe((res: any) => {
      if (res.success) {
        this.taskService.getDetailsTask().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (res.data._id == e._id) {
                this.task = e
                this.timeline = this.momentService.calculateRestOfMomentBetweenTwoDates(e.dateFin)
                this.percent = this.momentService.calculateDaysInPercentage(e.dateDebut, e.dateFin)
                this.duration = this.momentService.calculateDuration(e.dateDebut, e.dateFin)
              }
            });
            this.progressBar = false
          } else {
            console.log(resp.success)
          }
        })
      } else {
        res.message
        this.progressBar = false
      }
    }, err => {
      this.progressBar = false
      console.log(err.message)
    })
  }

}
