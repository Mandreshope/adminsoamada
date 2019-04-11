import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppPagesService {
  public appPages: any
  constructor() { 
    this.appPages = this.initialize()
  }

  initialize() {
    return this.appPages = [
      {
        title: 'Accueil',
        url: '/members/home',
        icon: 'home',
        activePage :'active',
        colSize: 6
      },
      {
        title: 'Profile',
        url: '/members/profile',
        icon: 'person',
        activePage :'notActive',
        colSize: 6
      },
      {
        title: 'Equipe',
        url: '/members/team',
        icon: 'people',
        activePage :'notActive',
        colSize: 6
      },
      {
        title: 'Tâche',
        url: '/members/task',
        icon: 'paper',
        activePage :'notActive',
        colSize: 6
      },
      {
        title: 'Projet',
        url: '/members/project',
        icon: 'filing',
        activePage :'notActive',
        colSize: 6
      },
      {
        title: 'Client',
        url: '/members/customer',
        icon: 'person',
        activePage :'notActive',
        colSize: 6
      },
      {
        title: 'Recrutement',
        url: '/members/recruitment',
        icon: 'briefcase',
        activePage :'notActive',
        colSize: 12
      }
    ];
  }
}
