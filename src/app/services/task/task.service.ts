import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private ROOT_URL = environment.ROOT_URL;

  constructor(private http: HttpClient) { }

  private request(
    method: 'post'|'getAllData'|'getDataById'|'put'|'delete',
    target: 'customer'|'home'|'project'|'recruitment'|'task'|'team', 
    type: 'create'|'update'|'delete'|''|'getProject'|'getDetailsTask'|'getTask'| 'update', id?: string, data?: any
  ): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.ROOT_URL}/api/${target}/${type}`, data);
    } else if(method === 'getAllData') {
      base = this.http.get(`${this.ROOT_URL}/api/${target}/${type}`);
    } else if(method === 'getDataById') {
        base = this.http.get(`${this.ROOT_URL}/api/${target}/${type}?_id=${id}`); 
    } else if (method === 'delete') {
      base = this.http.delete(`${this.ROOT_URL}/api/${target}/${type}?_id=${id}`);
    } else if (method === 'put') {
      base = this.http.put(`${this.ROOT_URL}/api/${target}/${type}?_id=${id}`, data);
    }
    return base
  }

  getTasks() {
    return this.request('getAllData', 'task', '');
  }

  getDetailsTask() {
    return this.request('getAllData', 'task', 'getDetailsTask')
  }
  
  getTask(id: string) {
    return this.request('getDataById', 'task', 'getTask', id);
  }

  removeTask(id: string) {
    console.log(id)
    return this.request('delete', 'task', 'delete', id);
  }

  updateTask(data: any, id: string) {
    return this.request('put', 'task', 'update', id, data);
  }

  addTask(data) {
    if(data.idProjet === '' || data.idProjet === undefined || data.idProjet === null) {
      data.idProjet = null
    }
    return this.request('post', 'task', 'create', null, {
      nom: data.nom,
      responsable: data.responsable,
      priorite: data.priorite,
      statut: data.statut,
      idProjet: data.idProjet,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
      description: data.description
    });
  }
}
