import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController, LoadingController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task/task.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.page.html',
  styleUrls: ['./my-task.page.scss'],
})
export class MyTaskPage implements OnInit {
  task: any[] = []
  confident: boolean = true
  memberId: string
  progressBar: boolean;

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    public popoverController: PopoverController,
    private storage: Storage,
    public memberService: MemberService,
    public loading: LoadingController) { }

  ngOnInit() {
    // this.checkUserConfidential()
    this.memberId = this.route.snapshot.params['id']
    console.log(this.memberId)
    this.loadTaskData()
  }

  // checkUserConfidential() {
  //   this.storage.get(environment.tokenKey).then(res => {
  //     if (res) {
  //       this.memberService.getMember(res).subscribe((resp: any) => {
  //         if (resp.success) {
  //           if (res == resp.data._id) {
  //             if (resp.data.role == 'simple user') {
  //               this.confident = true
  //               console.log('you are simple user')
  //             } else {
  //               this.confident = false
  //               console.log('you are chef de projet or admin')
  //             }
  //           }
  //         }
  //       }, (error: any) => {
  //         console.log(error.message)
  //       })
  //     }
  //   })
  // }

  async loadTaskData() {
    this.progressBar = true

    this.taskService.getDetailsTask().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach(e => {
          if (e.responsable == this.memberId) {
            console.log(e)
            this.task.push(e)
            this.confident = false
          }
        });
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

  async removeTask(id: string) {
    this.progressBar = true

    this.taskService.removeTask(id).subscribe((res: any) => {
      if (res.success) {
        this.taskService.getDetailsTask().subscribe((res: any) => {
          if (res.success) {
            this.task = res.data
            this.progressBar = false
            console.log(res.message)
          } else {
            this.progressBar = false
            console.log(res.message)
          }
        })
      } else {
        this.progressBar = false
        console.log(res.message)
      }
    }, (error: any) => {
      console.log(error.message)
    });
  }

}
