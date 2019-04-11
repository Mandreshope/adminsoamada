import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { MemberService } from 'src/app/services/member/member.service';
import { LoadingController, NavController, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { MenuPopoverComponent } from 'src/app/components/menu-popover/menu-popover.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  member: any
  progressBar: boolean
  notification: any[] = [];
  memberId: any;
  constructor(
    private popoverController: PopoverController,
    public navController: NavController,
    public memberService: MemberService,
    public notificationService: NotificationService,
    public storage: Storage,
    public loading: LoadingController
  ) { }

  ngOnInit() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberId = res
      }
    })
    this.loadMemberData()
  }

  ionViewDidEnter() {
    this.reloadMemberData() 
    this.loadNotificationData()
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


  async loadMemberData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.storage.get(environment.tokenKey).then((resp: any) => {
      if(resp){
        this.memberService.getMember(resp).subscribe((res: any) => {
          if (res.success) {
            this.member = res.data
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
    })

    
  }

  async reloadMemberData() {
    this.progressBar = true

    this.storage.get(environment.tokenKey).then((resp: any) => {
      if(resp){
        this.memberService.getMember(resp).subscribe((res: any) => {
          if (res.success) {
            this.member = res.data
            this.progressBar = false
          } else {
            res.error
            this.progressBar = false
          }
        }, (err) => {
          console.log(err)
          this.progressBar = false
    
        })
      }
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

}
