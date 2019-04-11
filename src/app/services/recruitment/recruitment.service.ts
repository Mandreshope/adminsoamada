import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  private ROOT_URL = environment.ROOT_URL;

  constructor(private http: HttpClient) { }

  private request(
    method: 'post' | 'getAllData' | 'getDataById' | 'put' | 'delete' | 'drop',
    target: 'customer' | 'home' | 'project' | 'recruitment' | 'task' | 'team' | 'teamDetails',
    type: 'create' | 'update' | 'delete' | 'drop' | '' | 'getProject' | 'getRecruitmentDetails' | 'getTeam' | 'getTeamDetails' | 'getRecruitment',
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

  getRecruitments() {
    return this.request('getAllData', 'recruitment', '');
  }

  getRecruitment(id: string) {
    return this.request('getDataById', 'recruitment', 'getRecruitment', id);
  }

  removeRecruitment(id: string) {
    return this.request('delete', 'recruitment', 'delete', id);
  }

  updateRecruitment(data: any, id: string) {
    return this.request('put', 'recruitment', 'update', id, data);
  }

  addRecruitment(data) {
    let avatar: string
    if (data.sexe == "Homme") {
      avatar = '/assets/user.jpg'
    }else {
      avatar = '/assets/userf.jpg'
    }
    return this.request('post', 'recruitment', 'create', null, {
      nom: data.nom,
      prenom: data.prenom,
      sexe: data.sexe,
      recruteur: data.recruteur,
      postulePour: data.postulePour,
      cv: data.cv,
      interview: data.interview,
      note: data.note,
      qualite: data.qualite,
      tel: data.tel,
      mail: data.mail,
      profileRS: data.profileRS,
      avatar: avatar
    });
  }

  getRecruitmentDetails() {
    return this.request('getAllData', 'recruitment', 'getRecruitmentDetails')
  }

}
