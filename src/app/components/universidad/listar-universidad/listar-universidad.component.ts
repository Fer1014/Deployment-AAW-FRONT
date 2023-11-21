import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Universidad } from 'src/app/models/universidad';
import { UniversidadService } from 'src/app/services/universidad.service';

@Component({
  selector: 'app-listar-universidad',
  templateUrl: './listar-universidad.component.html',
  styleUrls: ['./listar-universidad.component.css']
})
export class ListarUniversidadComponent implements OnInit {
  dataSource: MatTableDataSource<Universidad> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'universidad',
    'fechaingreso',
    'fechaegreso',
    'accion01',
    'accion02',
  ];
  constructor(private uS: UniversidadService) {}
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
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
