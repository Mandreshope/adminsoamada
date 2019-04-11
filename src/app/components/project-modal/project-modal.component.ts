import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task/task.service';
import { MemberService } from 'src/app/services/member/member.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  public modalOpen: string;

  submitError: string;
  addTaskForm: FormGroup;
  addTeamForm: FormGroup
  member: any
  project: any

  constructor(private formBuilder: FormBuilder,
    public modalController: ModalController,
    public taskService: TaskService,
    public navParams: NavParams,
    public navController: NavController,
    public memberService: MemberService,
    public loading: LoadingController,
    public teamService: TeamService,
    public projectService: ProjectService) {
    // team form builder
    this.addTeamForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      membres: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('')
    });

    // task form builder
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
      idProjet: new FormControl(''),
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
    this.getProjects()
    this.getMembers()
  }

  ionViewWillEnter() {
    this.modalOpen = this.navParams.get('modalOpen');
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
  
  async addTeam(data) {

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.teamService.addTeam(data).subscribe((res: any) => {
      if (res.success) {
        this.dimissModal(data)
        loading.dismiss()
      }else {
        this.submitError = res.message
        loading.dismiss()
      }

    }, (err) => {
      this.submitError = err.message

    });
  }

  async addTask(data) {

    console.log(data)

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.taskService.addTask(data).subscribe( res => {
      if (res.success) {
        this.dimissModal(data)
        this.loading.dismiss()
        console.log(res.message)
      }else {
        this.submitError = res.message
        this.loading.dismiss()
        console.log(res.message)
      }
    }, error =>  this.submitError = error.message )
  }

  async dimissModal(data) {
    await this.modalController.dismiss(data);
  }
}
