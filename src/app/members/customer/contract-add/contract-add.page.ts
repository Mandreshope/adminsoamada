import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { MemberService } from 'src/app/services/member/member.service';
import { TeamService } from 'src/app/services/team/team.service';
import { MomentService } from 'src/app/services/moment/moment.service';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.page.html',
  styleUrls: ['./contract-add.page.scss'],
})
export class ContractAddPage implements OnInit {

  submitError: string;
  loginError: string;
  addContractForm: FormGroup;
  customer: any
  team: any

  constructor(private formBuilder: FormBuilder,
    public loading: LoadingController,
    public customerService: CustomerService,
    public navController: NavController,
    public momentService: MomentService,
    public teamService: TeamService) {

    this.addContractForm = this.formBuilder.group({
      client: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      nomProjet: new FormControl('', Validators.compose([
        // Validators.required
      ])),
      equipes: new FormControl('', Validators.compose([
        // Validators.required
      ])),
      dateContact: new FormControl('', Validators.compose([
        // Validators.required
      ])),
      statut: new FormControl('', Validators.compose([
        // Validators.required
      ])),
      dernierContact: new FormControl('', Validators.compose([
        // Validators.required
      ]))

    });
  }

  ngOnInit() {
    this.getTeams()
    this.getCustomers()
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((res: any) => {
      if (res.success) {
        console.log(res.data)
        this.customer = res.data
      } else {
        res.message
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


  async addContract(data) {
    let a = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 2);
    let b = this.momentService.now()
    let gRef = 'C'+b+a
    console.log(gRef)
    let datas = {
      refContrat: gRef,
      client: data.client,
      nomProjet: data.nomProjet,
      equipes: data.equipes,
      dateContact: data.dateContact,
      statut: data.statut,
      dernierContact: data.dernierContact,
    }
    console.log(datas)
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.addContract(datas).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'customer'])
        loading.dismiss()
      } else {
        this.submitError = res.message
        loading.dismiss()
      }

    }, (err) => {
      this.submitError = err.error

    });
  }

}
