import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { TeamService } from '../../services/team/team.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { MemberService } from 'src/app/services/member/member.service';
import { OverlayEventDetail } from '@ionic/core';
import { TeamModalComponent } from 'src/app/components/team-modal/team-modal.component';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { MemberModalComponent } from 'src/app/components/member-modal/member-modal.component';
import { MenuPopoverComponent } from 'src/app/components/menu-popover/menu-popover.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss']
})
export class TeamPage implements OnInit {
  teamContent: boolean
  memberContent: boolean
  checked: string
  confident: boolean
  superUser: boolean

  team: any;
  member: any
  searchbarIsActive: boolean = true;
  memberId: any;
  notification: any[] = []

  constructor(public menu: MenuController,
    private teamService: TeamService,
    private popoverController: PopoverController,
    public memberService: MemberService,
    public modalController: ModalController,
    public notificationService: NotificationService,
    public navController: NavController,
    private storage: Storage,
    public loading: LoadingController) {

    this.teamContent = true
    this.checked = 'segment-button-checked'
  }

  ngOnInit() {
    // this.loadTeamData()
    this.checkUserConfidential()
    this.loadNotificationData()
  }

  segmentChanged(ev: any) {
    if (ev.detail.value == 'team') {
      this.teamContent = true
      this.memberContent = false
    } else {
      this.checked = null
      this.teamContent = false
      this.memberContent = true
    }
  }

  ionViewDidEnter() {
    this.checkUserConfidential()
    this.loadTeamData()
    this.loadMemberData()
    console.log(this.team)
  }

  searchButtonClick() {
    this.searchbarIsActive = false
  }

  backButtonClick() {
    this.searchbarIsActive = true
    this.reloadTeamData()
  }
  
  checkUserConfidential() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberService.getMember(res).subscribe((resp: any) => {
          if (resp.success) {
            if (res == resp.data._id) {
              if (resp.data.role == 'simple user') {
                this.confident = true
                this.superUser = true
                console.log('you are simple user')
              } else if (resp.data.role == 'chef de projet') {
                this.confident = false
                this.superUser = true
                console.log('you are chef de projet')
              } else if (resp.data.role == 'super admin') {
                this.confident = false
                this.superUser = false
                console.log('you are super admin')
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
    return this.teamService.getTeams().subscribe((res: any) => {
      if (res.success) {
        this.team = res.data
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
      this.teamService.getTeams().subscribe((res: any) => {
        if (res.success) {
          this.team = res.data
          this.team = this.team.filter((item) => {
            return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      })
      
    }
  }

  async loadMemberData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.memberService.getMembers().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
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

  reloadMemberData() {
    this.memberService.getMembers().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.member = res.data
      } else {
        res.error
      }
    }, (err) => {
      console.log(err)
    })
  }

  async loadTeamData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.teamService.getTeams().subscribe((res: any) => {
      console.log(res.data)
      this.team = res.data
      loading.dismiss();
    }, (err) => {
      console.log(err)
      loading.dismiss();

    })
  }

  async reloadTeamData() {
    this.teamService.getTeams().subscribe((res: any) => {
      console.log(res.data)
      this.team = res.data
    }, (err) => {
      console.log(err)

    })
  }


  refreshTeamData(event) {
    console.log('Begin refresh');

    this.teamService.getTeams().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.team = res.data
        console.log('Refresh Completed');
        event.target.complete();
      } else {
        res.error
        event.target.complete();
      }
    }, (err) => {
      event.target.complete();
      console.log(err)

    })

  }

  async removeTeam(id: string) {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.teamService.removeTeam(id).subscribe((res: any) => {
      if (res.success) {
        this.teamService.getTeams().subscribe((res: any) => {
          if (res.success) {
            this.team = res.data
            this.loading.dismiss()
            console.log(res.message)
          } else {
            this.loading.dismiss()
            console.log(res.message)
          }
        }, (err) => {
          this.loading.dismiss()
          console.log(err)

        })
      } else {
        this.loading.dismiss()
        console.log(res.message)
      }
    }, (err) => {
      this.loading.dismiss()
      console.log(err)

    });
  }

  async removeMember(id: string) {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.memberService.removeMember(id).subscribe((res: any) => {
      if (res.success) {
        this.memberService.getMembers().subscribe((res: any) => {
          if (res.success) {
            console.log(res.data)
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
      } else {
        this.loading.dismiss()
        console.log(res.message)
      }
    }, (err) => {
      this.loading.dismiss()
      console.log(err)

    });
  }


  async presentModal(memberDetails: any) {
    console.log('Membre passé par le paramètre presentModal  ' + memberDetails)
    const modal = await this.modalController.create({
      component: TeamModalComponent,
      componentProps: {
        memberDetails: memberDetails
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    return await modal.present();
  }

  async presentMemberModal(memberDetails: any) {
    console.log('Membre passé par le paramètre presentModal  ' + memberDetails)
    const modal = await this.modalController.create({
      component: MemberModalComponent,
      componentProps: {
        memberDetails: memberDetails
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        this.reloadMemberData()
        console.log('The result:', detail.data);
      }
    });

    return await modal.present();
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
