import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private ROOT_URL = environment.ROOT_URL;

  constructor(private http: HttpClient) { }

  private request(
    method: 'post' | 'getAllData' | 'getDataById' | 'put' | 'delete',
    target: 'customer' | 'home' | 'project' | 'recruitment' | 'task' | 'team'|'member',
    type: 'create' | 'update' | 'delete' | '' | 'getProject' | 'getResponsableTask'|'getProjectDetails'|'getMember',
    id?: string, 
    data?: any
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

  getMembers() {
    return this.request('getAllData', 'member', '');
  }

  getMember(id: string) {
    return this.request('getDataById', 'member', 'getMember', id);
  }

  updateMember(data:any, id:string) {
    return this.request('put', 'member', 'update', id, data);
  }

  removeMember(id: string) {
    return this.request('delete', 'member', 'delete', id);
  }
}
