import { Component, ViewChild } from '@angular/core';
import { ProductosService } from '../service/productos.service';
import { CategoriasService } from '../service/categorias.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PropopupCrUpComponent } from './propopup-cr-up/propopup-cr-up.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  constructor(
    private service: ProductosService,
    private Catservice: CategoriasService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.Listar();
  }

  cantRegistros = 5;
  productoList: any;
  categoriaList: any;
  productosData: any;
  encabezadoTabla: string[] = ['nombre', 'categoria', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Listar(): void {
    this.Catservice.CategoriasGetAll(99999).subscribe((res) => {
      this.categoriaList = res;
    });
    this.service.ProductosGetAll(this.cantRegistros).subscribe((res) => {
      this.productoList = res;
      let datatest = this.productoList.map((item: { categoria: any }) => {
        const categorias = this.categoriaList.find(
          (categorias: { id: any }) => categorias.id === item.categoria
        );
        return { ...item, nombreCategoria: categorias['nombre'] };
      });
      this.productosData = new MatTableDataSource(datatest);
      this.productosData.paginator = this.paginator;
      this.productosData.sort = this.sort;
    });
  }

  Crear() {
    const popup = this.dialog.open(PropopupCrUpComponent, {
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

  Actualizar(id: any, nombre: any, categoria: any) {
    const popup = this.dialog.open(PropopupCrUpComponent, {
      enterAnimationDuration: '1000',
      exitAnimationDuration: '500',
      width: '50%',
      data: {
        id: id,
        nombre: nombre,
        categoria: categoria,
        IsCreate: false,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.Listar();
    });
  }

  Eliminar(id: any) {
    this.service.ProductosDelete(id).subscribe((res) => {
      this.toastr.success('Registro eliminado con éxito');
      this.Listar();
    });
  }
}
