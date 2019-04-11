import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { NavController, LoadingController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AppPagesService } from 'src/app/services/appPages/app-pages.service';
import { MemberService } from 'src/app/services/member/member.service';
import { Storage } from '@ionic/storage';
import { ProjectService } from 'src/app/services/project/project.service';
import { TeamService } from 'src/app/services/team/team.service';
import { TaskService } from 'src/app/services/task/task.service';
import { MenuPopoverComponent } from 'src/app/components/menu-popover/menu-popover.component';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  memberId: string
  task: any
  project: any
  team: any
  notification: any[] = []

  public appPages: { title: string; url: string; icon: string; activePage: string; colSize: number; }[];
  

  constructor(public menu: MenuController,
    public authService: AuthService,
    public navController: NavController,
    public appPagesService: AppPagesService,
    public loading: LoadingController,
    public projectService: ProjectService,
    public notificationService: NotificationService,
    public teamService: TeamService,
    public taskService: TaskService,
    public memberService: MemberService, 
    public popoverController: PopoverController,
    private storage: Storage ) {
    
    this.menu.enable(true).then(() => {
      console.log('menu enabled')
    })
    // this.menu.swipeEnable(true).then(() => {
    //   console.log('swipe enabled')
    // })
    this.appPages = this.appPagesService.appPages;

    console.log(this.authService.isAuthenticated())

  }

  ngOnInit() {
    this.loadNotificationData()
    this.loadProjectData()
    this.loadTaskData()
    this.loadTeamData()
    
    
  }

  ionViewDidEnter() {
    // let i = this.appPagesService.initialize()
    // this.navParams.data = {page: i}
    
    // this.storage.get('auth-token').then((val) => {
    //   if(val){
    //     this.authService.memberSignIn.push(val)
    //   }else {
    //     this.authService.memberSignIn = undefined
    //   }
    // });
  }

  loadNotificationData() {
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

  ionViewDidLeave() {
    // console.log('ionViewDidLeave')
  }

  async loadProjectData() {
    
    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.project = res.data
      } else {
        res.error
      }
    }, (err => {
      console.log(err)
    
    }))
  }

  async loadTaskData() {

    this.taskService.getTasks().subscribe((res: any) => {
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

  async loadTeamData() {
    this.teamService.getTeams().subscribe((res: any) => {
        console.log(res.data)
        this.team = res.data
    }, (err) => {
      console.log(err)

    })
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

  openPage(page: any) {
    for (let p of this.appPages) {
      if (p.title == page.title) {
        p.activePage = 'active';
      } else {
        p.activePage = 'notActive';
      }
    }
  }

}
