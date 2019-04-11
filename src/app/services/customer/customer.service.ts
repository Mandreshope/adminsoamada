import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private ROOT_URL = environment.ROOT_URL;

  constructor(private http: HttpClient) { }

  private request(
    method: 'post' | 'getAllData' | 'getDataById' | 'put' | 'delete' | 'drop',
    target: 'customer' | 'home' | 'project' | 'recruitment' | 'task' | 'team' | 'teamDetails' | 'contract',
    type: 'create' | 'update' | 'delete' | 'drop' | '' | 'getProject' | 'getRecruitmentDetails' | 'getTeam' | 'getTeamDetails' | 'getRecruitment' | 'getCustomer' | 'getCustomerDetails' | 'getContract' | 'getContractDetails',
    id?: string,
    data?: any
  ): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.ROOT_URL}/api/${target}/${type}`, data);
    } else if (method === 'getAllData') {
      base = this.http.get(`${this.ROOT_URL}/api/${target}/${type}`);
    } else if (method === 'getDataById') {
      base = this.http.get(`${this.ROOT_URL}/api/${target}/${type}?_id=${id}`);
    } else if (method === 'delete') {
      base = this.http.delete(`${this.ROOT_URL}/api/${target}/${type}?_id=${id}`);
    } else if (method === 'drop') {
      base = this.http.delete(`${this.ROOT_URL}/api/${target}/${type}`);
    } else if (method === 'put') {
      base = this.http.put(`${this.ROOT_URL}/api/${target}/${type}?_id=${id}`, data);
    }
    return base
  }

  getCustomers() {
    return this.request('getAllData', 'customer', '');
  }

  getCustomer(id: string) {
    return this.request('getDataById', 'customer', 'getCustomer', id);
  }

  removeCustomer(id: string) {
    return this.request('delete', 'customer', 'delete', id);
  }

  updateCustomer(data: any, id: string) {
    return this.request('put', 'customer', 'update', id, data);
  }

  addCustomer(data) {
    let avatar: string
    if (data.sexe == "Homme") {
      avatar = '/assets/user.jpg'
    }else {
      avatar = '/assets/userf.jpg'
    }
    return this.request('post', 'customer', 'create', null, {
      nom: data.nom,
      prenom: data.prenom,
      sexe: data.sexe,
      tel: data.tel,
      mail: data.mail,
      adresse: data.adresse,
      type: data.type,
      tailleIdeal: data.tailleIdeal,
      probaCloture: data.probaCloture,
      montant: data.montant,
      qualite: data.qualite,
      avatar: avatar
    });
  }

  // contract method
  getContracts() {
    return this.request('getAllData', 'contract', '');
  }

  getContract(id: string) {
    return this.request('getDataById', 'contract', 'getContract', id);
  }

  removeContract(id: string) {
    return this.request('delete', 'contract', 'delete', id);
  }

  updateContract(data: any, id: string) {
    return this.request('put', 'contract', 'update', id, data);
  }

  addContract(data) {
    return this.request('post', 'contract', 'create', null, {
      refContrat: data.refContrat,
      client: data.client,
      nomProjet: data.nomProjet,
      equipes: data.equipes,
      dateContact: data.dateContact,
      statut: data.statut,
      dernierContact: data.dernierContact,
    });
  }

  getContractDetails() {
    return this.request('getAllData', 'contract', 'getContractDetails')
  }
}
