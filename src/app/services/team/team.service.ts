import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private ROOT_URL = environment.ROOT_URL;

  constructor(private http: HttpClient) { }

  private request(
    method: 'post'|'getAllData'|'getDataById'|'put'|'delete'|'drop',
    target: 'customer'|'home'|'project'|'recruitment'|'task'|'team'|'teamDetails', 
    type: 'create'|'update'|'delete'|''|'drop'|'getProject'|'getResponsableTask'|'getTask'| 'update'|'getTeam'|'getTeamDetails', id?: string, data?: any
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
    } else if (method === 'drop') {
      base = this.http.delete(`${this.ROOT_URL}/api/${target}/${type}`);
    }
    return base
  }

  getTeams() {
    return this.request('getAllData', 'team', '');
  }
  
  getTeam(id: string) {
    return this.request('getDataById', 'team', 'getTeam', id);
  }

  removeTeam(id: string) {
    return this.request('delete', 'team', 'delete', id);
  }

  updateTeam(data: any, id: string) {
    return this.request('put', 'team', 'update', id, data);
  }

  addTeam(data) {
    return this.request('post', 'team', 'create', null, {
      nom: data.nom,
      membres: data.membres,
      description: data.description
    });
  }

  dropTeamDetails() {
    return this.request('drop', 'teamDetails', 'drop');
  }

  getTeamDetails() {
    return this.request('getAllData', 'team', 'getTeamDetails');
  }

}
