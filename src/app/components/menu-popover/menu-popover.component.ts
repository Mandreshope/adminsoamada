import { Component, OnInit } from '@angular/core';
import { PopoverController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { TaskService } from 'src/app/services/task/task.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss']
})
export class MenuPopoverComponent implements OnInit {
  public task: any[] = []
  public project: any[] = []
  public memberId: string
  constructor(
    public loading: LoadingController,
    public authService: AuthService,
    public navController: NavController,
    private storage: Storage,
    public taskService: TaskService,
    public projectService: ProjectService,
    public popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberId = res
      }
    })
    
  }

  ionViewDidEnter() {
    this.loadTaskData()
    this.loadProjectData()
  }

  async loadProjectData() {
    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach(e => {
          if (e.chefDeProjet == this.memberId) {
            this.project.push(e)
          }
        });
      } else {
        res.message
      }
    }, err => {
      console.log(err.message)

    })
  }

  async loadTaskData() {
    this.taskService.getDetailsTask().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach(e => {
          if (e.responsable == this.memberId) {
            this.task.push(e)
          }
        });
      } else {
        res.message
      }
    }, err => {
      console.log(err.message)

    })
  }

  openPage(url) {
    this.dimissPopover()
    this.navController.navigateForward(url + this.memberId)
  }

  async dimissPopover() {
    await this.popoverController.dismiss()
  }

  async logOut() {
    this.dimissPopover()
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.authService.signOut().then(() => {
      this.navController.navigateRoot(['/login']);
      loading.dismiss();
    }, error => {
      console.log(error.message);
      loading.dismiss();
    });
  }

}
