import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/user/auth.service'
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { AppPagesService } from './services/appPages/app-pages.service';
import { MemberService } from './services/member/member.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  confident: boolean;
  public appPages: { title: string; url: string; icon: string; activePage: string; colSize: number; }[]
  public memberSignIn: any[]
  constructor(
    public menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public memberService: MemberService,
    public authService: AuthService,
    public appPagesService: AppPagesService,
    public storage: Storage) {
    this.initializeApp();
    this.appPages = this.appPagesService.appPages


  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();

    });

  }

  checkUserConfidential() {
    this.storage.get(environment.tokenKey).then(res => {
      if (res) {
        this.memberService.getMember(res).subscribe((resp: any) => {
          if (resp.success) {
            if (res == resp.data._id) {
              if (resp.data.role == 'simple user') {
                this.confident = true
                console.log('you are simple user')
              } else {
                this.confident = false
                console.log('you are chef de projet or admin')
              }
            }
          }
        }, (error: any) => {
          console.log(error.message)
        })
      }
    })
  }

  openPage(page: { title: string; }) {
    for (let p of this.appPages) {
      if (p.title == page.title) {
        p.activePage = 'active';
      } else {
        p.activePage = 'notActive';
      }
    }
  }

}

// Résumé: cycles de vie dans Ionic 4
// Ok Paul, de bonnes informations de base, mais que dois-je mémoriser?

// Ionic 4 étend la navigation du routeur angulaire
// Ionic 4 introduit une fonctionnalité de pile (comme dans Ionic 3)
// Ionic 4 ajoute de nouveaux crochets Lifecycle à Angular:
// ionViewWillEnter - Se déclenche lors de la saisie d'une page (même si elle revient de la pile)
// ionViewDidEnter - Se déclenche après l’entrée (même s’il revient de la pile)
// ionViewWillLeave: déclenché si la page disparaîtra (même si elle reste en pile)
// ionViewDidLeave: déclenché après la fermeture de la page (également si elle est conservée dans la pile)
// ionViewWillUnload - Dans Angular, ne tirez pas car vous devez utiliser ngOnDestroy
// Excepté ionViewDidLoad (parce que c'est la même chose que ngOnInit) et que les deux protège-navettes, tous les crochets Lifecycle de Ionic 3 sont toujours disponibles.
// ngOnInit ne sera pas déclenché si vous revenez à une page après l'avoir placée dans une pile.
// Par défaut, si vous naviguez vers l'avant, la page en cours reste en pile, donc NO ngOnDestroy sera déclenché. Si vous définissez la nouvelle page en tant que racine (navController.navigateRoot ())) ou si vous revenez en arrière, elle sera supprimée de la pile.
// Si vous souhaitez annuler Observables, il suffit de le faire ionViewWillLeave ou ionViewDidLeave et de vous y abonner à nouveau dans ionViewWillEnter ou ionViewDidEnter
// Regardez l'inspecteur DOM, vous pouvez voir que votre page est toujours dans la pile.
// Si vous utilisez le routeur angulaire, les pages s'ajouteront à la pile. Je recommande d'utiliser le contrôleur de navigation ionique angulaire, car vous pouvez utiliser ici la nouvelle fonctionnalité de pile.
// Avec la prochaine version bêta 18, les onglets à ions seront également chargés!
// Avez-vous d'autres questions ou j'écris quelque chose de mal, faites-le moi savoir et postez un commentaire!

  // EMPLOYE (ID, username, mot de passe, nom, prénom, taux d’occupation, rôle, coût par
  // heure)
  // CONTACT (ID, raison sociale, prénom, nom, fonction, adresse, code postal, ville, pays,
  // département, tél. privé, tél. prof., email privé, email prof., site web, date de naissance, date
  // de création, date de modification)
  // COMPTE (ID, numéro, nom, adresse, état, date de création, date de modification)
  // PROJET (ID, compte, numéro, nom, description, date début, date fin, chef de projet,
  // statut)
  // TACHE (ID, phase, responsable, description, délai)
  // HEURES (ID, activité, employé, date, nombre d’heures, description)
  // NOTE (ID, cible, date, note) 
