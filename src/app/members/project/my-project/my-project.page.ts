import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project/project.service';
import { MemberService } from 'src/app/services/member/member.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.page.html',
  styleUrls: ['./my-project.page.scss'],
})
export class MyProjectPage implements OnInit {

  public project: any[] = []
  percent: any
  progressBar: boolean
  confident: boolean
  memberId: string

  constructor(public menu: MenuController,
    public projectService: ProjectService,
    public route: ActivatedRoute,
    public loading: LoadingController,
    private storage: Storage,
    public memberService: MemberService) {


  }

  ngOnInit() {
    this.checkUserConfidential()
    this.memberId = this.route.snapshot.params['id']
    console.log(this.memberId)
    this.loadProjectData()
  }

  ionViewDidEnter() {

  }

  checkUserConfidential() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberService.getMember(res).subscribe((resp: any) => {
          if (resp.success) {
            if (res == resp.data._id) {
              if (resp.data.role == 'simple user') {
                this.confident = true
                console.log('you are simple user')
              } else {
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

  async loadProjectData() {
    this.progressBar = true

    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach(e => {
          if (e.chefDeProjet == this.memberId) {
            this.project.push(e)
          }
        });
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
          if (res.success) {
            this.project = res.data
            loading.dismiss()
            console.log(res.message)
          } else {
            loading.dismiss()
            console.log(res.message)
          }
        })
      } else {
        loading.dismiss()
        console.log(res.message)
      }
    }, (error: any) => {
      console.log(error.message)
    });
  }

}
