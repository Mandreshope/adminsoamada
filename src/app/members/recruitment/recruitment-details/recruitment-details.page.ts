import { Component, OnInit } from '@angular/core';
import { RecruitmentService } from 'src/app/services/recruitment/recruitment.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recruitment-details',
  templateUrl: './recruitment-details.page.html',
  styleUrls: ['./recruitment-details.page.scss'],
})
export class RecruitmentDetailsPage implements OnInit {
  recruitmentId: string
  recruitment: any

  constructor(
    private route: ActivatedRoute,
    public recruitmentService: RecruitmentService,
    public loading: LoadingController) { }

  ngOnInit() {
    this.recruitmentId = this.route.snapshot.params['id']
    this.loadRecruitmentData()
  }

  async loadRecruitmentData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.recruitmentService.getRecruitment(this.recruitmentId).subscribe((res: any) => {
      if (res.success) {
        this.recruitmentService.getRecruitmentDetails().subscribe((resp: any) => {
          if (resp.success) {
            resp.data.forEach(e => {
              if (res.data._id == e._id) {
                this.recruitment = e
                console.log(this.recruitment)
                loading.dismiss();
              }
              loading.dismiss();
            });
            
          }else {
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

}
