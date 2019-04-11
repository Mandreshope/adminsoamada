import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member/member.service';
import { TeamService } from 'src/app/services/team/team.service';
import { TaskService } from 'src/app/services/task/task.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {
  nom: string
  chefDeProjet: string
  equipes: string
  taches: string
  description: string
  developpement: string
  statut: string
  dateDebut: Date
  dateFin: Date
  completeDate: Date;


  projectId: string
  project: any
  member: any
  team: any
  task: any
  superAdmin: any;
  idProjet: any;
  
  constructor(private route: ActivatedRoute,
    private navController: NavController,
    private projectService: ProjectService,
    public loading: LoadingController,
    public memberService: MemberService,
    public taskService: TaskService,
    public storage: Storage,
    public notificationService: NotificationService,
    public momentService: MomentService,
    public teamService: TeamService) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id']
    console.log(this.projectId)
    this.getTasks()
    this.getMembers()
    this.getTeams()
    this.loadProjectData()
    this.checkUserConfidential()
  }

  checkUserConfidential() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberService.getMember(res).subscribe((resp: any) => {
          if (resp.success) {
            if(res == resp.data._id){
              if(resp.data.role == 'simple user') {
                console.log('you are simple user')
              }else {
                console.log('you are chef de projet or admin')
                this.superAdmin = res
              }
            }
          }
        }, (error: any) => {
          console.log(error.message)
        })
      }
    })
  }

  getTasks() {
    this.taskService.getTasks().subscribe((res: any) => {
      if (res.success) {
        this.task = res.data
        console.log(this.task)
        console.log(res.success)
      } else {
        console.log(res.success)
      }
    }, err => {
      console.log(err.message)

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

  getTeams() {
    this.teamService.getTeams().subscribe((res: any) => {
      if (res.success) {
        this.team = res.data
        console.log(res.success)
      } else {
        console.log(res.success)
      }
    }, err => {
      console.log(err.message)

    })
  }

  async loadProjectData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.projectService.getProject(this.projectId).subscribe((res: any) => {
      if (res.success) {
        this.idProjet = res.data._id
        this.project = res.data
        this.nom = res.data.nom
        this.chefDeProjet = res.data.chefDeProjet
        this.equipes = res.data.equipes
        this.taches = res.data.taches
        this.description = res.data.description
        this.developpement = res.data.developpement
        this.statut = res.data.statut
        this.dateDebut = res.data.dateDebut
        this.dateFin = res.data.dateFin
        this.completeDate = res.data.completeDate
        console.log(res.message)
        loading.dismiss();
      } else {
        console.log(res.message)
        loading.dismiss();
      }
    }, err => {
      console.log(err.message)
      loading.dismiss();

    })
  }

  async editProject() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    var data: any
    var memberData: any

    data = {
      nom: this.nom,
      chefDeProjet: this.chefDeProjet,
      equipes: this.equipes,
      taches: this.taches,
      description: this.description,
      developpement: this.developpement,
      statut: this.statut,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      completeDate: this.completeDate
    }

    memberData = {
      role: 'chef de projet'
    }

    if (this.developpement == 'Fait' && this.completeDate == null) {
      data = {
        nom: this.nom,
        chefDeProjet: this.chefDeProjet,
        equipes: this.equipes,
        taches: this.taches,
        description: this.description,
        developpement: this.developpement,
        statut: this.statut,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
        completeDate: this.momentService.dateNow()
      }
    }else if(this.developpement == 'Encours' && this.completeDate != null) {
      data = {
        nom: this.nom,
        chefDeProjet: this.chefDeProjet,
        equipes: this.equipes,
        taches: this.taches,
        description: this.description,
        developpement: this.developpement,
        statut: this.statut,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
        completeDate: null
      }
    }

    this.projectService.updateProject(data, this.projectId).subscribe((res: any) => {
      if (res.success) {
        
        this.memberService.updateMember(memberData, this.chefDeProjet).subscribe((resp) => {
          if(resp.success) {
            console.log(res.message)
          }else {
            console.log(res.message)
          }
        })

        let notificationData = {
          encadreur: this.superAdmin,
          membre: this.chefDeProjet,
          objet:  this.idProjet,
          type: 'project',
          message: 'Vous avez une nouvelle projet à faire',
          date: this.momentService.dateNow()
        }
        this.notificationService.addNotification(notificationData).subscribe((resp2: any) => {
          if (resp2.success) {
            console.log(resp2.message)
            this.navController.navigateBack(['members', 'project'])
            this.loading.dismiss()
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
