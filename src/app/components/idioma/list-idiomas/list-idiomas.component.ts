import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { idioma } from 'src/app/models/idioma';
import { IdiomaService } from 'src/app/services/idioma.service';

@Component({
  selector: 'app-list-idiomas',
  templateUrl: './list-idiomas.component.html',
  styleUrls: ['./list-idiomas.component.css']
})
export class ListIdiomasComponent implements OnInit {
  dataSource: MatTableDataSource<idioma> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id_Idiomas',
    'idiomas',
    'nivelEscrito',
    'nivelOral',
    'accion01',
    'accion02',
  ];

  constructor(private idiomaService: IdiomaService) {}

  ngOnInit(): void {
    this.idiomaService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.idiomaService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.idiomaService.delete(id).subscribe(() => {
      this.idiomaService.list().subscribe((data) => {
        this.idiomaService.setList(data);
      });
    });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
