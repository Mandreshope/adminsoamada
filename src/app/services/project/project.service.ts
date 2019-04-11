import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private ROOT_URL = environment.ROOT_URL
  
  constructor(private http: HttpClient) { }

  private request(
    method: 'post'|'getAllData'|'getDataById'|'put'|'delete'|'drop',
    target: 'customer'|'home'|'project'|'recruitment'|'task'|'team'|'teamDetails', 
    type: 'create'|'update'|'delete'|''|'drop'|'getProject'|'getResponsableTask'|'getProjectDetails'|'getTask'| 'update'|'getTeam'|'getTeamDetails', 
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
    } else if (method === 'put') {
      base = this.http.put(`${this.ROOT_URL}/api/${target}/${type}?_id=${id}`, data);
    } else if (method === 'drop') {
      base = this.http.delete(`${this.ROOT_URL}/api/${target}/${type}`);
    }
    return base
  }


  getProjects() {
    return this.request('getAllData', 'project', '');
  }

  getProject(id: string) {
    return this.request('getDataById', 'project', 'getProject', id);
  }

  getProjectDetails() {
    return this.request('getAllData', 'project', 'getProjectDetails');
  }

  removeProject(id: string) {
    console.log(id)
    return this.request('delete', 'project', 'delete', id);
  }

  updateProject(data: any, id: string) {
    return this.request('put', 'project', 'update', id, data);
  }

  addProject(data: any) {
    return this.request('post', 'project', 'create', null, {
      nom: data.nom,
      chefDeProjet: data.chefDeProjet,
      equipes: data.equipes,
      taches: data.taches,
      description: data.description,
      developpement: data.developpement,
      statut: data.statut,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin
    });
  }
}
