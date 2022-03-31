import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'Inicializador',
      Desc: 'Inicializador'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.Ninguno,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog ) { }

  ngOnInit(): void {

    // Al entrar siempre intenta hacer una petición por ID. 
    //  Si es un usuario inexistente, hacer una petición por "undefined" y falla (404)
    this.activatedRoute.params
      .pipe(
        //tap(id => console.log('ID:', id)),
        //tap(id => console.log('{id}:', {id})),
        filter(({id}) => id),  // sólo si tiene ID
        switchMap (({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe );


    // Alternativa más sencilla: si la URL NO tiene la parte "editar" es que 
    // es porque viene de la página de agregar, por lo que no se hace la petición
          //   if (!this.router.url.includes('editar') ) {
          //     return; 
          //   }
          //   this.activatedRoute.params
          //     .pipe(
          //        switchMap (({id}) => this.heroesService.getHeroePorId(id))
          //     )
          //     .subscribe( heroe => this.heroe = heroe );
            



        // Convertir el enum en array para mostrar en el desplegable (options)
        this.convertir();

      }


  convertir() {
    // Convierte un enum en un array "id:string, Desc:string"
    // permite utilizar el emun con los publisher del interface heroes
    
    this.publishers = Object.keys(Publisher).map((id) => {
      return {
        id,
        Desc: Publisher[id as keyof typeof Publisher],
      };
    });

    this.publishers.sort((a, b) => (a.Desc > b.Desc) ? 1 : -1)

  }

  guardar() {
    if ( this.heroe.superhero.trim().length === 0 ){
      return;
    } 

    if (this.heroe.id ) {
      // Si existe un personaje (tiene ID) se considera una actualización
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( heroe => {
            this.mostrarSnackBar('Registro actualizado');
        });
    } else {
      // Si no tiene ID, crear
      this.heroesService.agregarHeroe ( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes', heroe.id]);  // Alta de usuario: http://localhost:3000/heroes
          this.mostrarSnackBar('Héroe creado');
        })
    }

    //this.heroesService.agregarHeroe ( this.heroe )
    //  .subscribe ( resp =>  {
    //    console.log('Respuesta', resp);
    //  })
  }


  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: { ...this.heroe }  // Mandar por valor, si quieres referencia:  data: this.heroe, pero hace susceptible al cambio el objeto heroe

    });

    dialog.afterClosed().subscribe(   // recibe el evento seleccionado del select (borrar (true) o cancelar (undefined/false))
      (result) => {
        if (result)
            if (this.heroe.id)
              this.heroesService.borraHeroe(this.heroe.id)
                .subscribe( resp => {
                  this.router.navigate(['/heroes']);
                  this.mostrarSnackBar('Héroe borrado');
                });
      }
    )


  }


  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 1000
    });
  }


  pedirConfirmacionBorrado() {
    // const dialogRef = this.dialog.open(this.DialogContentExampleDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}
