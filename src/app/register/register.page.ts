import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();
  constructor(private authSev: AuthService, private router: Router) {}

  ngOnInit() {
  }
  async onRegister(){
    const user = await this.authSev.onRegister(this.user);
    if (user){
      console.log('Usuario Creado con éxito');
      this.router.navigateByUrl('/home');
    }
  }
}
