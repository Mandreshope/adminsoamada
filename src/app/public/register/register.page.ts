import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isConnected: boolean;

  error_messages = {
    'nom': [
      { type: 'required', message: 'Nom est requis. ' }
    ],
    'prenom': [
      { type: 'required', message: 'Prénom est requis. ' }
    ],
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
  singUpError: any;


  constructor(private formBuilder: FormBuilder,
    public menu: MenuController,
    private authService: AuthService,
    public loading: LoadingController,
    public router: Router,
    public navController: NavController, private storage: Storage) {

    this.isConnected = this.authService.isAuthenticated();

    this.registerForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      sexe: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateDeNaissance: new FormControl(''),
      cin: new FormControl(''),
      pere: new FormControl(''),
      mere: new FormControl(''),
      adresse: new FormControl(''),
      tel: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
        // Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

    this.registerForm.valueChanges.subscribe((change) => {
      if ((change.password === '' && change.cpassword === '') || (change.password !== '' && change.cpassword === '')) {
        //this is needed in case the user empties both fields, else it would 
        //say they matched and therefore it's valid - the custom validator will 
        //not pick up on this edge case
        this.registerForm.get('cpassword').setErrors({ MatchPassword: false });
      } else if (change.password !== change.cpassword) {
        this.registerForm.get('cpassword').setErrors({ MatchPassword: true });
      } else if (change.password === change.cpassword) {
        //this removes the previously set errors
        this.registerForm.get('cpassword').setErrors(null);
      }
    });
    this.isConnected = this.authService.isAuthenticated();
    //set auth-token in localStorage
    this.storage.get(environment.tokenKey).then((val) => {
      if (val) {
        this.navController.navigateRoot(['members', 'home']);
      }
    });
  }

  ngOnInit() {
  }

  // checkPasswords(registerForm: FormGroup) { // here we have the 'passwords' group
  //   let pass = registerForm.controls.password.value;
  //   let confirmPass = registerForm.controls.confirmPass.value;

  //   return pass === confirmPass ? null : { notSame: true }
  // }

  ionViewDidEnter() {

    this.storage.get(environment.tokenKey).then((val) => {
      if (val) {
        this.navController.navigateRoot(['members', 'home']);
      }
    });

  }

  async signup(data: any) {
    console.log(data)

    const loading = await this.loading.create({
      spinner: "crescent",
      cssClass: 'custom-loading'
    });
    await loading.present();
    
    //call of the method singInWithEmail in authService
    this.authService.signUp(data).subscribe((res: any) => {
      this.isConnected = true
      console.log('isConnected ' + this.isConnected)
      this.storage.set(environment.tokenKey, res.data._id).then(() => {
        this.authService.authenticationState.next(true);
        this.authService.memberSignIn.push(res.data)
      });
      this.router.navigate(['members', 'home']);
      loading.dismiss();
    }, error => {
      this.singUpError = error.message;
      loading.dismiss();
    });
  }

}
