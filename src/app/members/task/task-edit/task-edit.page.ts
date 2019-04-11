import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { MemberService } from 'src/app/services/member/member.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
})
export class TaskEditPage implements OnInit {
  memberId: string
  idTache: string
  nom: string
  responsable: string
  priorite: string
  statut: string
  idProjet: string
  description: string
  dateDebut: Date
  dateFin: Date
  completeDate: Date

  member: any
  project: any
  taskId: string
  constructor(private route: ActivatedRoute,
    private navController: NavController,
    public taskService: TaskService,
    public notificationService: NotificationService,
    public loading: LoadingController,
    public storage: Storage,
    public memberService: MemberService,
    public momentService: MomentService,
    public projectService: ProjectService) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id']
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberId = res
      }
    })
    this.getProjects()
    this.getMembers()
    this.loadTaskData()
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

  getProjects() {
    this.projectService.getProjects().subscribe((res: any) => {
      if (res.success) {
        this.project = res.data
        console.log(this.project)
        console.log(res.success)
      } else {
        console.log(res.success)
      }
    }, err => {
      console.log(err.message)

    })
  }

  async loadTaskData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.taskService.getTask(this.taskId).subscribe((res: any) => {
      if (res.success) {
        this.idTache = res.data._id
        this.nom = res.data.nom
        this.responsable = res.data.responsable
        this.priorite = res.data.priorite
        this.statut = res.data.statut
        this.idProjet = res.data.idProjet
        this.description = res.data.description
        this.dateDebut = res.data.dateDebut
        this.dateFin = res.data.dateFin
        this.completeDate = res.data.completeDate
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

  async editTask() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    var data: any

    data = {
      nom: this.nom,
      responsable: this.responsable,
      priorite: this.priorite,
      statut: this.statut,
      idProjet: this.idProjet,
      description: this.description,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      completeDate: this.completeDate
    }

    if (this.statut == 'Fait' && this.completeDate == null) {
      data = {
        nom: this.nom,
        responsable: this.responsable,
        priorite: this.priorite,
        statut: this.statut,
        idProjet: this.idProjet,
        description: this.description,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
        completeDate: this.momentService.dateNow()
      }
    } else if (this.statut == 'Encours' && this.completeDate != null) {
      data = {
        nom: this.nom,
        responsable: this.responsable,
        priorite: this.priorite,
        statut: this.statut,
        idProjet: this.idProjet,
        description: this.description,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
        completeDate: null
      }
    }

    let notificationData = {
      chefDeProjet: this.memberId,
      membre: this.responsable,
      objet: this.idTache,
      type: 'task',
      message: 'Vous avez une nouvelle tâche à faire',
      date: this.momentService.dateNow()
    }

    this.taskService.updateTask(data, this.taskId).subscribe((res: any) => {
      if (res.success) {
        this.notificationService.addNotification(notificationData).subscribe((resp: any) => {
          if (resp.success) {
            console.log(resp.message)
            this.navController.navigateBack(['members', 'task'])
            loading.dismiss();
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
