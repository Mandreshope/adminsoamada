import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  memberId: string
  notification: any

  constructor(
    public loading: LoadingController,
    public storage: Storage,
    public notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberId = res
      }
    })
    this.loadNotificationData()
  }

  async loadNotificationData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.notificationService.getNotifications().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.notification = res.data
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

}
