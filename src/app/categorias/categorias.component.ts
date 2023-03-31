import { Component, ViewChild } from '@angular/core';
import { CategoriasService } from '../service/categorias.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CatpopupCrUpComponent } from './catpopup-cr-up/catpopup-cr-up.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {
  constructor(
    private service: CategoriasService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.Listar();
  }

  cantRegistros = 5;
  categoriaList: any;
  categoriasData: any;
  encabezadoTabla: string[] = ['nombre', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Listar(): void {
    this.service.CategoriasGetAll(this.cantRegistros).subscribe((res) => {
      this.categoriaList = res;
      this.categoriasData = new MatTableDataSource(this.categoriaList);
      this.categoriasData.paginator = this.paginator;
      this.categoriasData.sort = this.sort;
    });
  }

  Crear() {
    const popup = this.dialog.open(CatpopupCrUpComponent, {
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

  Actualizar(id: any, nombre: any) {
    const popup = this.dialog.open(CatpopupCrUpComponent, {
      enterAnimationDuration: '1000',
      exitAnimationDuration: '500',
      width: '50%',
      data: {
        id: id,
        nombre: nombre,
        IsCreate: false,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.Listar();
    });
  }

  Eliminar(id: any) {
    this.service.CategoriasDelete(id).subscribe((res) => {
      this.toastr.success('Registro eliminado con éxito');
      this.Listar();
    });
  }
}
