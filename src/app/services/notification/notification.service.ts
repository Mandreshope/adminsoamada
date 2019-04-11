import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private ROOT_URL = environment.ROOT_URL;

  constructor(
    private http: HttpClient,
    public storage: Storage,
    public notificationService: NotificationService,
  ) {}

  private request(
    method: 'post' | 'getAllData' | 'getDataById' | 'put' | 'delete',
    target: 'customer' | 'home' | 'project' | 'recruitment' | 'task' | 'team' | 'member' | 'notification',
    type: 'create' | 'update' | 'delete' | '' | 'getProject' | 'getResponsableTask' | 'getProjectDetails' | 'getMember' | 'getNotification',
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
    }
    return base
  }

  getNotifications() {
    return this.request('getAllData', 'notification', '');
  }

  getNotification(id: string) {
    return this.request('getDataById', 'notification', 'getNotification', id);
  }

  updateNotification(data: any, id: string) {
    return this.request('put', 'notification', 'update', id, data);
  }

  removeNotification(id: string) {
    return this.request('delete', 'notification', 'delete', id);
  }

  addNotification(data: any) {
    console.log(data)
    return this.request('post', 'notification', 'create', null, {
      encadreur: data.chefDeProjet,
      membre: data.membre,
      objet: data.objet,
      type: data.type,
      message: data.message,
      date: data.date
    });
  }
}
