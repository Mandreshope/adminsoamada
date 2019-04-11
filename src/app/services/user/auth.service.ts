import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { MemberService } from '../member/member.service';
import { AppPagesService } from '../appPages/app-pages.service';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = environment.tokenKey;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ROOT_URL = environment.ROOT_URL

  authenticationState = new BehaviorSubject(false);
  public memberSignIn: any[] = []

  constructor(
    private storage: Storage,
    public appPagesService: AppPagesService,
    private http: HttpClient, private plt: Platform,
    public memberService: MemberService) {

    this.plt.ready().then(() => {
      this.checkToken();
    });

    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.memberService.getMember(res).subscribe((resp: any) => {
          if (resp.success) {
            if(res == resp.data._id)
            this.memberSignIn.push(resp.data)
            console.log(this.memberSignIn)
          }
        }, (error: any) => {
          console.log(error.message)
        })
      } else {
        this.memberSignIn = []
      }
    })


  }

  private request(
    method: 'post'|'getAllData'|'getDataById'|'put'|'delete'|'drop',
    target: 'customer'|'home'|'project'|'recruitment'|'task'|'team'|'teamDetails'|'member', 
    type: 'create'|'update'|'delete'|''|'drop'|'getProject'|'getResponsableTask'|'getTask'| 'update'|'getTeam'|'getTeamDetails'|'auth', 
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
    } else if (method === 'drop') {
      base = this.http.delete(`${this.ROOT_URL}/api/${target}/${type}`);
    }
    return base
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  signInWithEmail(credentials: { email: any; password: any; }) {
    console.log('Sign in with email');
    return this.request('post', 'member', 'auth', null, {
      mail: credentials.email, 
      mdp: credentials.password
    });
       // return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);

  }

  signUp(data: any) {
    console.log('sign up');
    let avatar: string
    if (data.sexe == "Homme") {
      avatar = '/assets/user.jpg'
    }else {
      avatar = '/assets/userf.jpg'
    }
    return this.request('post', 'member', 'create', null, {
      nom: data.nom,
      prenom: data.prenom,
      sexe: data.sexe,
      dateDeNaissance: data.dateDeNaissance,
      cin: data.cin,
      pere: data.pere,
      mere: data.mere,
      adresse: data.adresse,
      tel: data.tel,
      mail: data.email,
      mdp: data.cpassword,
      role: 'simple user',
      avatar: avatar
    });
  }

  async signOut() {
    await this.storage.remove(TOKEN_KEY);
    this.memberSignIn.pop()
    this.authenticationState.next(false);
    this.appPagesService.initialize()
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}