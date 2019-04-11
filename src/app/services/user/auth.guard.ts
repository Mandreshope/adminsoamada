import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public memberSignIn: any
  constructor(private router: Router, private storage: Storage, public navController: NavController, private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {

      this.storage.get(environment.tokenKey).then((val) => {
        if(val){
          resolve(true)
          console.log('User is logged in')
        }else {
          resolve(false)
          console.log('User is not logged in');
          this.navController.navigateRoot(['login']);
        }
      });

    });
  }
}
