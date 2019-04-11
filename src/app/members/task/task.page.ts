import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, PopoverController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task/task.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { MemberService } from 'src/app/services/member/member.service';
import { MenuPopoverComponent } from 'src/app/components/menu-popover/menu-popover.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  task: any
  progressBar: boolean
  confident: boolean
  memberId: string
  searchbarIsActive: boolean = true
  notification: any[] = []

  constructor(public menu: MenuController,
    public popoverController: PopoverController,
    private storage: Storage,
    public memberService: MemberService,
    public notificationService: NotificationService,
    public loading: LoadingController,
    public taskService: TaskService) {
    
  }


  ngOnInit() {
    this.checkUserConfidential()
    this.loadTaskData()
    this.loadNotificationData()
  }

  ionViewDidEnter() {
    this.reloadTaskData() 
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

  searchButtonClick() {
    this.searchbarIsActive = false
  }

  backButtonClick() {
    this.searchbarIsActive = true
    this.reloadTaskData()
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

  loadNotificationData() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        let id = res
        this.notificationService.getNotifications().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (e.membre == id && e.isOpened == false) {
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
    return this.taskService.getDetailsTask().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.task = res.data
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
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.taskService.getDetailsTask().subscribe((res: any) => {
        if (res.success) {
          console.log(res.data)
          this.task = res.data
          this.task = this.task.filter((item) => {
            console.log(item.nom) ;
            return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
          console.log(this.task);
        }
      })
      
    }
  }

  async loadTaskData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.taskService.getDetailsTask().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.task = res.data
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

  async reloadTaskData() {
    this.progressBar = true

    this.taskService.getDetailsTask().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.task = res.data
        this.progressBar = false
      } else {
        res.message
        this.progressBar = false
      }
    }, err => {
      console.log(err.message)
      this.progressBar = false

    })
  }

  refreshTaskData(event) {
    this.taskService.getDetailsTask().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.task = res.data
        event.target.complete();
      } else {
        console.log(res.message)
        event.target.complete();
      }
    }, err => {
      console.log(err.message)
        event.target.complete();

    })

  }

  async removeTask(id: string) {
    this.progressBar = true

    this.taskService.removeTask(id).subscribe((res: any) => {
      if (res.success) {
        this.taskService.getDetailsTask().subscribe((res: any) => {
          if( res.success) {
            this.task = res.data
            this.progressBar = false
            console.log(res.message)
          }else {
            this.progressBar = false
            console.log(res.message)
          }
        })
      } else {
        this.progressBar = false
        console.log(res.message)
      }
    }, (error:any)=> {
      console.log(error.message)
    });
  }
}
