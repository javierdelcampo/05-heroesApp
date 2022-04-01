import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interface';

import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.json_serv_protocolo + '://' + environment.json_serv_ip + ':' + environment.json_serv_port
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor( private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {   // forma fácil: retornar un tipo 'normal' boolean aparte de un observable

    if ( !localStorage.getItem('token') ) {
      return of(false);  // Crea un Observable, no necesario si también se puede retornar un tipo boolean normal
    }

    return this.http.get<Auth>( `${this.baseUrl}/usuarios/1`)
      .pipe (
        map( auth => {
          this._auth = auth;
          return true; 
        })
      );

  }

  login () {
    return this.http.get<Auth>( `${this.baseUrl}/usuarios/1`)
      .pipe (
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }

}
