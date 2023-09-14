import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { Producto } from 'src/app/Interfaces/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit, AfterViewInit {
  dataInicio: Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  columnasTabla: string[] = [
    'nombre',
    'categoria',
    'stock',
    'precio',
    'estado',
    'acciones',
  ];

  constructor(
    private dialog: MatDialog,
    private _productoServio: ProductoService,
    private _utilidadServicio: UtilidadService
  ) {}

  obtenerProductos() {
    this._productoServio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaProductos.data = data.value;
        } else {
          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'opps'
          );
        }
      },
      error: (e) => {},
    });
  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoProducto() {
    this.dialog
      .open(ModalProductoComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerProductos();
      });
  }

  editarProducto(producto: Producto) {
    this.dialog
      .open(ModalProductoComponent, {
        disableClose: true,
        data: producto,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerProductos();
      });
  }

  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: producto.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productoServio.eliminar(producto.idProducto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'El usuario fue eliminado',
                'Listo!'
              );
              this.obtenerProductos();
            } else {
              this._utilidadServicio.mostrarAlerta(
                'No se pudo eliminar el usuario',
                'Error'
              );
            }
          },
          error: (e) => {},
        });
      }
    });
  }
}
