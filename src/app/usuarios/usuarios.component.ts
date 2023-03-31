import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UsupopupCrUpComponent } from './usupopup-cr-up/usupopup-cr-up.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  constructor(
    private service: UsuariosService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.Listar();
  }

  cantRegistros = 5;
  usuarioList: any;
  usuariosData: any;
  encabezadoTabla: string[] = ['nombre', 'correo', 'rol', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Listar(): void {
    this.service.UsuariosGetAll(this.cantRegistros).subscribe((res) => {
      this.usuarioList = res;
      console.log('usuarioList:', this.usuarioList);

      this.usuariosData = new MatTableDataSource(this.usuarioList);
      this.usuariosData.paginator = this.paginator;
      this.usuariosData.sort = this.sort;
    });
  }

  Crear() {
    const popup = this.dialog.open(UsupopupCrUpComponent, {
      enterAnimationDuration: '1000',
      exitAnimationDuration: '500',
      width: '50%',
      data: {
        IsCreate: true,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.Listar();
    });
  }

  Actualizar(id: any, nombre: any, correo: any, password: any, rol: any) {
    const popup = this.dialog.open(UsupopupCrUpComponent, {
      enterAnimationDuration: '1000',
      exitAnimationDuration: '500',
      width: '50%',
      data: {
        id: id,
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol,
        IsCreate: false,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.Listar();
    });
  }

  Eliminar(id: any) {
    this.service.UsuariosDelete(id).subscribe((res) => {
      this.toastr.success('Registro eliminado con éxito');
      this.Listar();
    });
  }
}
