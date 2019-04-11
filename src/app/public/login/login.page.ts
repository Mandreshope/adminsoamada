import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  loginError: string;
  isConnected: boolean;

  loginForm: FormGroup;

  error_messages = {
    'email': [
      { type: 'required', message: 'Email est requis. ' },
      { type: 'pattern', message: 'S\'il vous plaît, mettez une adresse email valide. ' }
    ],
    'password': [
      { type: 'required', message: 'Mot de passe requis. ' },
      { type: 'minlength', message: 'La longueur du mot de passe doit être plus longue ou égale à 6 caractères. ' }
    ],
    'cpassword': [
      { type: 'required', message: 'Confirmation mot de passe est requis. ' }
    ]
  }

  constructor(private formBuilder: FormBuilder, 
    public menu: MenuController, 
    private storage: Storage, 
    public router: Router, 
    public authService: AuthService, 
    public navController: NavController,
    public loading: LoadingController) {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]))
    });

    this.isConnected = this.authService.isAuthenticated();

    this.storage.get(environment.tokenKey).then((val) => {
      if(val){
        this.navController.navigateRoot(['members', 'home']);
      }else {
        this.navController.navigateRoot(['login']);
      }
    });

    console.log('isConnected ' + this.isConnected )
  }

  ngOnInit() {
    this.menu.enable(false).then(() => {
      console.log('menu desabled')
    })
  }

  ionViewDidEnter() {
    
    this.menu.enable(false).then(() => {
      console.log('menu desabled')
    })
    // this.menu.swipeEnable(false);

    this.storage.get(environment.tokenKey).then((val) => {
      if(val){
        this.navController.navigateRoot(['members', 'home']);
      }else {
        this.navController.navigateRoot(['login']);
      }
    });

  }

  async login(data: { email: any; password: any; }) {

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();

    //call of the method singInWithEmail in authService
    this.authService.signInWithEmail(credentials).subscribe((res: any) => {
      if (res.success) {
        this.isConnected = true
        // this.authService.memberSignIn.push(res.data)
        console.log('isConnected ' + this.isConnected )
        this.storage.set(environment.tokenKey, res.data._id).then(() => {
          this.authService.authenticationState.next(true);
          this.authService.memberSignIn.push(res.data)
        });
        this.router.navigate(['members', 'home'])
        loading.dismiss();
      } else {
        console.log(res.message)
        this.loginError = res.message;
        loading.dismiss();
      }

    }, error => {
      console.log(error)
      loading.dismiss();
    });

  }




}
