import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { TeamService } from 'src/app/services/team/team.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.page.html',
  styleUrls: ['./contract-edit.page.scss'],
})
export class ContractEditPage implements OnInit {
  client: string
  equipes: string
  dateContact: Date
  statut: string
  dernierContact: Date
  contractId: string

  customer: any
  team: any

  constructor(
    private route: ActivatedRoute,
    public customerService: CustomerService,
    public teamService: TeamService,
    public navController: NavController,
    public loading: LoadingController) { }

  ngOnInit() {
    this.getTeams()
    this.getCustomers()
    this.contractId = this.route.snapshot.params['id']
    this.loadContractData()
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

  async loadContractData() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.customerService.getContract(this.contractId).subscribe((res: any) => {
      if (res.success) {
        this.client = res.data.client
        this.equipes = res.data.equipes
        this.dateContact = res.data.dateContact
        this.statut = res.data.statut
        this.dernierContact = res.data.dernierContact
        loading.dismiss();
        console.log(res.message)
      }else {
        loading.dismiss();
        console.log(res.message)
      }
    }, err => {
      console.log(err.message)
      loading.dismiss();

    })
  }

  async editContract() {
    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    let data = {
      client: this.client,
      equipes: this.equipes,
      dateContact: this.dateContact,
      statut: this.statut,
      dernierContact: this.dernierContact,
    }

    this.customerService.updateContract( data, this.contractId ).subscribe((res: any) => {
      if (res.success) {
        this.navController.navigateBack(['members', 'customer'])
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
