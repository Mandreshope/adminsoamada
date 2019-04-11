import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/user/auth.service';
import { RecruitmentService } from 'src/app/services/recruitment/recruitment.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { MemberService } from 'src/app/services/member/member.service';
import { MenuPopoverComponent } from 'src/app/components/menu-popover/menu-popover.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.page.html',
  styleUrls: ['./recruitment.page.scss'],
})
export class RecruitmentPage implements OnInit {

  recruitment: any
  confident: boolean
  memberId: any;
  notification: any[] = []

  constructor(public menu: MenuController,
    public navController: NavController,
    private authService: AuthService,
    private storage: Storage,
    public notificationService: NotificationService,
    public popoverController: PopoverController,
    public recruitmentService: RecruitmentService,
    public memberService: MemberService,
    public loading: LoadingController) {
    
  }

  ngOnInit() {
    this.checkUserConfidential()
    this.loadNotificationData()
  }

  ionViewDidEnter() {
    this.loadRecruitmentData()
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

  async loadRecruitmentData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.recruitmentService.getRecruitments().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.recruitment = res.data
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

  async removeRecruitment(id: string) {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.recruitmentService.removeRecruitment(id).subscribe((res: any) => {
      if (res.success) {
        this.recruitmentService.getRecruitments().subscribe((res: any) => {
          if( res.success) {
            this.recruitment = res.data
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
