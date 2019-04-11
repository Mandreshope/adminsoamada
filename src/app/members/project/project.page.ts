import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, PopoverController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project/project.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { MemberService } from 'src/app/services/member/member.service';
import { MenuPopoverComponent } from 'src/app/components/menu-popover/menu-popover.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss']
})
export class ProjectPage implements OnInit {

  public project: any;
  percent: any
  progressBar: boolean
  confident: boolean
  searchbarIsActive: boolean = true;
  memberId: any;
  notification: any[] = []

  constructor(public menu: MenuController, 
    public projectService: ProjectService, 
    public loading: LoadingController,
    private storage: Storage,
    public memberService: MemberService,
    public notificationService: NotificationService,
    public momentService: MomentService,
    private popoverController: PopoverController,
    public navController: NavController) {


  }

  ngOnInit() {
    // this.loadProjectData()
    this.checkUserConfidential()
    this.loadProjectData()
    this.loadNotificationData()
  }

  ionViewDidEnter() {
    this.reloadProjectData()
  }

  searchButtonClick() {
    this.searchbarIsActive = false
  }

  backButtonClick() {
    this.searchbarIsActive = true
    this.reloadProjectData()
  }

  checkUserConfidential() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberService.getMember(res).subscribe((resp: any) => {
          if (resp.success) {
            if(res == resp.data._id){
              if(resp.data.role == 'simple user') {
                this.confident = true
                console.log('you are simple user')
              }else {
                this.confident = false
                console.log('you are chef de projet or admin')
              }
            }
          }
        }, (error: any) => {
          console.log(error.message)
        })
      }
    })
  }

  async loadNotificationData() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        let id = res
        this.notificationService.getNotifications().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if(e.membre == id) {
                this.notification.push(e)
              }
            });
          } else {
            resp.message
          }
        }, err => {
          console.log(err.message)
    
        })
      }
    })
  }

  initializeItems() {
    return this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        this.project = res.data
      } else {
        res.message
      }
    }, err => {
      console.log(err.message)

    })
  
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems()
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.projectService.getProjects().subscribe((res: any) => {
        if (res.success) {
          this.project = res.data
          this.project = this.project.filter((item) => {
            return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      })
      
    }
  }

  async loadProjectData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();
    
    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.project = res.data
        loading.dismiss()
      } else {
        res.error
        loading.dismiss()
      }
    }, (err => {
      loading.dismiss()
      console.log(err)
    
    }))
  }

  async reloadProjectData() {
    this.progressBar = true
    await this.progressBar

    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.project = res.data
        this.progressBar = false
      } else {
        res.error
        this.progressBar = false
      }
    }, (err => {
      this.progressBar = false
      console.log(err)
    
    }))
  }

  refreshProjectData(event) {
    console.log('Begin refresh');
    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.project = res.data
        console.log('Refresh Completed');
        event.target.complete();
      } else {
        res.error
        event.target.complete();
      }
    }, (err => {
      this.loading.dismiss()
      console.log(err)
    
    }))
  }

  async removeProject(id: string) {
    console.log(id);
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.projectService.removeProject(id).subscribe((res: any) => {
      if (res.success) {
        this.projectService.getProjects().subscribe((res: any) => {
          if( res.success) {
            this.project = res.data
            loading.dismiss()
            console.log(res.message)
          }else {
            loading.dismiss()
            console.log(res.message)
          }
        })
      } else {
        loading.dismiss()
        console.log(res.message)
      }
    }, (error:any)=> {
      console.log(error.message)
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuPopoverComponent,
      event: ev,
      cssClass: 'menu-popover',
      animated: true
    });
    return await popover.present();
  }

}
