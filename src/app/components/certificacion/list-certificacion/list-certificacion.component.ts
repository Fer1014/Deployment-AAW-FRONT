import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Certificaciones } from 'src/app/models/certificacion';
import { CertificacionService } from 'src/app/services/certificacion.service';

@Component({
  selector: 'app-list-certificacion',
  templateUrl: './list-certificacion.component.html',
  styleUrls: ['./list-certificacion.component.css']
})
export class ListCertificacionComponent implements OnInit {
  dataSource: MatTableDataSource<Certificaciones> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id_Certificaciones',
    'nombreCertificaciones',
    'empresaEmisora',
    'fechaExpedicion',
    'fechaCaducidad',
    'urlCredencial',
    'accion01',
    'accion02',
  ];

  constructor(private certificacionService: CertificacionService) {}

  ngOnInit(): void {
    this.certificacionService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.certificacionService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.certificacionService.delete(id).subscribe(() => {
      this.certificacionService.list().subscribe((data) => {
        this.certificacionService.setList(data);
      });
    });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
