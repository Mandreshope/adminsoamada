import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { MemberService } from 'src/app/services/member/member.service';
import { TeamService } from 'src/app/services/team/team.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.page.html',
  styleUrls: ['./task-add.page.scss'],
})
export class TaskAddPage implements OnInit {
  submitError: string;
  addTaskForm: FormGroup;
  member: any
  project: any
  memberId: any;
  responsable: any;
  idTache: any;

  constructor(private formBuilder: FormBuilder,
    public taskService: TaskService,
    public navController: NavController,
    public memberService: MemberService,
    public momentService: MomentService,
    public notificationService: NotificationService,
    public loading: LoadingController,
    public storage: Storage,
    public projectService: ProjectService) {

    this.addTaskForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      responsable: new FormControl('', Validators.compose([
        Validators.required
      ])),
      priorite: new FormControl('', Validators.compose([
        Validators.required
      ])),
      statut: new FormControl('', Validators.compose([
        Validators.required
      ])),
      idProjet: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateDebut: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateFin: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('')
    });

  }

  ngOnInit() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberId = res
      }
    })
    this.getProjects()
    this.getMembers()
  }

  getProjects() {
    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        this.project = res.data
        console.log(this.member)
        console.log(res.success)
      } else {
        console.log(res.success)
      }
    }, (error) => {
      console.log(error.message)
    })
  }

  getMembers() {
    this.memberService.getMembers().subscribe((res: any) => {
      if (res.success) {
        this.member = res.data
        console.log(this.member)
        console.log(res.success)
      } else {
        console.log(res.success)
      }
    }, err => {
      console.log(err.message)
    })
  }

  async addTask(data) {

    console.log(data)

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.taskService.addTask(data).subscribe(res => {
      if (res.success) {
        let notificationData = {
          encadreur: this.memberId,
          membre: res.data.responsable,
          objet: res.data._id,
          type: 'task',
          message: 'Vous avez une nouvelle tâche à faire',
          date: this.momentService.dateNow()
        }
        this.notificationService.addNotification(notificationData).subscribe((resp: any) => {
          if (resp.success) {
            console.log(resp.message)
            this.navController.navigateBack(['members', 'task'])
            this.loading.dismiss()
          }
        })

      } else {
        this.submitError = res.message
        this.loading.dismiss()
      }
    }, error => this.submitError = error.message)
  }

}
