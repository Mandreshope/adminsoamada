import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TeamService } from 'src/app/services/team/team.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProjectService } from 'src/app/services/project/project.service';
import { MemberService } from 'src/app/services/member/member.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ProjectModalComponent } from 'src/app/components/project-modal/project-modal.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.page.html',
  styleUrls: ['./project-add.page.scss'],
})
export class ProjectAddPage implements OnInit {

  loginError: string;
  addProjectForm: FormGroup;
  team: any
  member:any
  task: any
  chefDeProjet: any
  submitError: string

  constructor(private formBuilder: FormBuilder,
    public teamService: TeamService,
    public loading: LoadingController,
    public storage: Storage,
    public projectService: ProjectService,
    public navController: NavController,
    public taskService: TaskService,
    public modalController: ModalController,
    public memberService: MemberService) { 

    this.addProjectForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      chefDeProjet: new FormControl('', Validators.compose([
        Validators.required
      ])),
      equipes: new FormControl('', Validators.compose([
        Validators.required
      ])), 
      taches: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl(''),
      developpement: new FormControl('', Validators.compose([
        Validators.required
      ])),
      statut: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateDebut: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateFin: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

  }

  ngOnInit() {
    this.getTasks()
    this.getTeams()
    this.getMembers()
    this.storage.get('auth-token').then(res => {
      if (res) {
        this.chefDeProjet = res
        console.log(this.chefDeProjet)
      } else {

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
        console.log(res.data)
        this.team = res.data
      } else {
        res.error
      }
    }, (err) => {
      console.log(err)

    })
  }

  async addProject(data) {
    if(!data) {
      return
    }

    console.log(data)

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.projectService.addProject(data).subscribe( res => {
      if (res.success) {
        this.navController.navigateBack(['members', 'project'])
        loading.dismiss()
      }else {
        this.submitError = res.message
        loading.dismiss()
      }
    }, error =>  {
      this.submitError = error.message
      loading.dismiss()
    })
  }

  async presentModal(data) {
    const modal = await this.modalController.create({
      component: ProjectModalComponent,
      componentProps: { 
        modalOpen: data,
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data !== undefined) {
        console.log('The result:', detail.data);
        this.getTasks()
        this.getTeams()
      }
    });

    return await modal.present();
  }

}
