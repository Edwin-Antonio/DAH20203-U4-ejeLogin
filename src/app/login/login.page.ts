import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(private router: Router, private authSvc: AuthService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async onLogin() {
    const user = await this.authSvc.isLogged(this.user);
    if (user) {
      console.log('successfully logged user');
      this.router.navigateByUrl('/home');
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Wrong data',
        message: 'Wrong daa insert',
        buttons: [
          {
            text: 'salir'
          }
        ]
      });
      await alert.present();
    }
  }


  onLoginGoogle(): void{
    this.authSvc.loginGoogleUser().then((res) => {
      this.onLoginRedirect();
    }).catch((err => console.log('Error', err.message)));
  }

  onLoginGit(): void{
    this.authSvc.loginGitUser().then((res) => {
      this.onLoginRedirect();
    }).catch((err => console.log('Error', err.message)));
  }

  onLoginRedirect(){
    this.router.navigate(['/home']);
  }
}
