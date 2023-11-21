import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExperienciaLaboralService } from 'src/app/services/experiencia-laboral.service';
import { ExperienciaLaboral } from 'src/app/models/experiencia_laboral';

@Component({
  selector: 'app-list-experiencia-laboral',
  templateUrl: './list-experiencia-laboral.component.html',
  styleUrls: ['./list-experiencia-laboral.component.css']
})
export class ListExperienciaLaboralComponent implements OnInit {
  dataSource: MatTableDataSource<ExperienciaLaboral> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id_Experiencia_laboral',
    'empresa',
    'cargo',
    'fechaInicio',
    'fechaFinalizado',
    'acciones'
  ];

  constructor(private experienciaLaboralService: ExperienciaLaboralService) {}

  ngOnInit(): void {
    this.experienciaLaboralService.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.experienciaLaboralService.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.experienciaLaboralService.delete(id).subscribe(() => {
      this.experienciaLaboralService.list().subscribe((data) => {
        this.experienciaLaboralService.setList(data);
      });
    });
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
