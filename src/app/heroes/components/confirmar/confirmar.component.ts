import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfirmarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Heroe) {}  // los datos van en "data", que es público
  

  ngOnInit(): void {
    console.log(this.data)
  }

  cerrar() {
    this.dialogRef.close(false);
  }

  borrar(){
    this.dialogRef.close(true);
  }

}
