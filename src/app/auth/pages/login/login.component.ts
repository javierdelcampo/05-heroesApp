import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  public showSpinner:boolean=false; 

  constructor( private router: Router,
               private authService: AuthService ) { }

  login() {

    // Ir a backend
    // Confirmar que el usuario existe
    // Navegar a pantalla héroes

    this.showSpinner = true;

    this.authService.login()
      .subscribe( resp => {
        console.log(resp);
        if (resp.id) {
          this.showSpinner = false;
          this.router.navigate(['./heroes']);
        }
      });
    

    //

  }

}
