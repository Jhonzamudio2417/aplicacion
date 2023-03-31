import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usupopup-cr-up',
  templateUrl: './usupopup-cr-up.component.html',
  styleUrls: ['./usupopup-cr-up.component.css'],
})
export class UsupopupCrUpComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UsupopupCrUpComponent>
  ) {}

  ngOnInit(): void {
    this.IsCreate = this.data.IsCreate;
    if (!this.IsCreate) {
      this.usuarioForm.setValue({
        id: this.data.id,
        nombre: this.data.nombre,
        correo: this.data.correo,
        password: this.data.password,
        rol: this.data.rol,
      });
    }
  }

  IsCreate = false;
  roles = [{ rol: 'ADMIN_ROLE' }, { rol: 'READER_ROLE' }];
  usuarioForm = this.builder.group({
    id: this.builder.control(Math.floor(Math.random() * 99999) + 1),
    nombre: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.min(3),
        Validators.max(15),
      ])
    ),
    correo: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        // ),
      ])
    ),
    rol: this.builder.control('', Validators.required),
  });

  Validacion() {
    if (this.IsCreate) {
      this.Crear();
    } else {
      this.Actualizar();
    }
  }

  Actualizar() {
    if (this.usuarioForm.valid) {
      this.service
        .UsuariosUpdate(this.usuarioForm.value.id, this.usuarioForm.value)
        .subscribe((res) => {
          this.toastr.success('Datos actualizados con éxito');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Ingrese todos los datos');
    }
  }

  Crear() {
    if (this.usuarioForm.valid) {
      this.service.UsuariosCreate(this.usuarioForm.value).subscribe((res) => {
        this.toastr.success('Datos actualizados con éxito');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Ingrese todos los datos');
    }
  }
}
