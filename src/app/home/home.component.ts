import { Component, ViewChild } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { ProductosService } from '../service/productos.service';
import { CategoriasService } from '../service/categorias.service';
import { BuscarService } from '../service/buscar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

export interface Datos {
  campo: any;
  valor: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private UsuService: UsuariosService,
    private ProService: ProductosService,
    private CatService: CategoriasService,
    private BusService: BuscarService,
    private toastr: ToastrService
  ) {}

  coleccion: any;
  termino: any;
  terminoList: any;
  data: any;
  lista: any;
  categoriaList: any;
  encabezadoTabla: string[] = ['nombre', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ListTermino(): void {
    if (this.coleccion == 'usuarios') {
      this.UsuService.UsuariosGetAll(99999).subscribe((res) => {
        this.terminoList = res;
        this.terminoList.sort();
      });
    }
    if (this.coleccion == 'categorias') {
      this.CatService.CategoriasGetAll(99999).subscribe((res) => {
        this.terminoList = res;
        this.terminoList.sort((a: { nombre: string; }, b: { nombre: any; }) => a.nombre.localeCompare(b.nombre))
      });
    }
    if (this.coleccion == 'productos') {
      this.ProService.ProductosGetAll(99999).subscribe((res) => {
        this.terminoList = res;
        this.terminoList.sort();
      });
    }
  }

  Buscar() {
    this.BusService.Buscar(this.coleccion, this.termino).subscribe((res) => {
      this.lista = res;
      if (this.coleccion == 'productos') {
        this.TraerCategoria();
      } else {
        this.LimpiarCampos();
      }
    });
  }

  TraerCategoria() {
    this.CatService.CategoriasGetAll(99999).subscribe((res) => {
      this.categoriaList = res;
      this.lista = this.lista.map((item: { categoria: any }) => {
        const categorias = this.categoriaList.find(
          (categorias: { id: any }) => categorias.id === item.categoria
        );
        return { ...item, nombre_categoria: categorias['nombre'] };
      });
      this.LimpiarCampos();
    });
  }

  LimpiarCampos() {
    let response: Datos[] = [];
    this.lista.map((item: { id: any }) => {
      const objValues = Object.values(item);
      const objKeys = Object.keys(item);
      for (let i = 0; i < objValues.length; i++) {
        if (objKeys[i] != 'id' && objKeys[i] != 'password' && objKeys[i] != 'categoria') {
          response.push({ campo: objKeys[i], valor: objValues[i] });
        }
      }
    });
    this.data = new MatTableDataSource(response);
  }
}
