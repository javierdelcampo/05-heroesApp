import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.json_serv_protocolo + "://" + environment.json_serv_ip  + ":" + environment.json_serv_port; 

  constructor( private http: HttpClient ) { }

  getHeroes (): Observable<Heroe[]> {
    console.log("getHeroes() de ", this.baseUrl);
    return this.http.get<Heroe[]>( this.baseUrl + '/heroes');
  }

  getHeroePorId (id: string): Observable<Heroe> {
    console.log("getHeroePorId()", id);
    return this.http.get<Heroe>( this.baseUrl + '/heroes/' + id);
  }

  getSugerencias ( termino: string ): Observable<Heroe[]> {
    console.log("getSugerencias()", termino);
    //return this.http.get<Heroe[]>( this.baseUrl + '/heroes?q=' + termino + '&limit=6');
    return this.http.get<Heroe[]>(` ${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
  }

  agregarHeroe ( heroe: Heroe ): Observable<Heroe> {
    console.log("agregarHeroe()", heroe);
    return this.http.post<Heroe>(this.baseUrl + '/heroes', heroe);
  }

  actualizarHeroe ( heroe: Heroe ): Observable<Heroe> {
    console.log("actualizarHeroe()", heroe);
    return this.http.put<Heroe>(` ${ this.baseUrl }/heroes/${ heroe.id }`, heroe);
  }

  borraHeroe ( id: string ): Observable<any>{
    console.log("borrarHeroe()", id);
    return this.http.delete<Heroe>(` ${ this.baseUrl }/heroes/${ id }`);
  }
  
}
