import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from 'src/app/service/categorias.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-catpopup-cr-up',
  templateUrl: './catpopup-cr-up.component.html',
  styleUrls: ['./catpopup-cr-up.component.css'],
})
export class CatpopupCrUpComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: CategoriasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CatpopupCrUpComponent>
  ) {}

  ngOnInit(): void {
    this.IsCreate = this.data.IsCreate;
    if (!this.IsCreate) {
      this.categoriaForm.setValue({
        id: this.data.id,
        nombre: this.data.nombre,
      });
    }
  }

  IsCreate = false;
  categoriaForm = this.builder.group({
    id: this.builder.control(Math.floor(Math.random() * 99999) + 1),
    nombre: this.builder.control('', Validators.required),
  });

  Validacion() {
    if (this.IsCreate) {
      this.Crear();
    } else {
      this.Actualizar();
    }
  }

  Actualizar() {
    if (this.categoriaForm.valid) {
      this.service
        .CategoriasUpdate(this.categoriaForm.value.id, this.categoriaForm.value)
        .subscribe((res) => {
          this.toastr.success('Datos actualizados con éxito');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Ingrese todos los datos');
    }
  }

  Crear() {
    if (this.categoriaForm.valid) {
      this.service
        .CategoriasCreate(this.categoriaForm.value)
        .subscribe((res) => {
          this.toastr.success('Datos actualizados con éxito');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Ingrese todos los datos');
    }
  }
}
