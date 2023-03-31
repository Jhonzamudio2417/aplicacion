import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from 'src/app/service/productos.service';
import { CategoriasService } from 'src/app/service/categorias.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-propopup-cr-up',
  templateUrl: './propopup-cr-up.component.html',
  styleUrls: ['./propopup-cr-up.component.css'],
})
export class PropopupCrUpComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: ProductosService,
    private Catservice: CategoriasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<PropopupCrUpComponent>
  ) {}

  ngOnInit(): void {
    this.IsCreate = this.data.IsCreate;
    this.Catservice.CategoriasGetAll(999999).subscribe(res=>{
      this.categoriasList = res;
    });
    if (!this.IsCreate) {
      this.productoForm.setValue({
        id: this.data.id,
        nombre: this.data.nombre,
        categoria: this.data.categoria,
      });
    }
  }

  IsCreate = false;
  categoriasList:any;
  productoForm = this.builder.group({
    id: this.builder.control(Math.floor(Math.random() * 99999) + 1),
    nombre: this.builder.control('', Validators.required),
    categoria: this.builder.control('', Validators.required),
  });

  Validacion() {
    if (this.IsCreate) {
      this.Crear();
    } else {
      this.Actualizar();
    }
  }

  Actualizar() {
    if (this.productoForm.valid) {
      this.service
        .ProductosUpdate(this.productoForm.value.id, this.productoForm.value)
        .subscribe((res) => {
          this.toastr.success('Datos actualizados con éxito');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Ingrese todos los datos');
    }
  }

  Crear() {
    if (this.productoForm.valid) {
      this.service.ProductosCreate(this.productoForm.value).subscribe((res) => {
        this.toastr.success('Datos actualizados con éxito');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Ingrese todos los datos');
    }
  }
}
