import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = [
    'idPago',
    'monto',
    'fecha',
    'tarjeta',
    'proyectos',
    'accion02',
  ];
  
  constructor(private pS:PagoService){}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
