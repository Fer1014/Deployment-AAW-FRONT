import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private uS: UsuariosService) { }
  displayedColumns: string[] = [
    'codigo',
    'username',
    'password',
    'name',
    'apellidos',
    'dni',
    'correo',
    'telefono',
    'empresa',
    'estado',
    'actualizar',
    'comentario'
  ];
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((element) => element.id !== id);
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
  comentario(id: number) {
    this.uS.comentario(id);
  }
  
}
