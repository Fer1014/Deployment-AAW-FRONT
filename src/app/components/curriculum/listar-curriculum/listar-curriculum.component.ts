import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurriculumVitae } from 'src/app/models/curriculum';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-curriculum',
  templateUrl: './listar-curriculum.component.html',
  styleUrls: ['./listar-curriculum.component.css']
})
export class ListarCurriculumComponent implements OnInit {
  dataSource: MatTableDataSource<CurriculumVitae> = new MatTableDataSource();
  role: string = '';
  sub: string = '';
  displayedColumnsFA: string[] = [
    'codigo',
    'secundaria',
    'universidad',
    'FIngresoUni',
    'FEgresoUni',
    'carrera',
    'accion01',
    'accion02',
    'user',
  ];
  displayedColumnsIdioma: string[] = [
    'codigo',
    'idioma',
    'nivelEscrito',
    'nivelOral',
    'accion01',
    'accion02',
    'user',
  ];
  displayedColumnsCertificado: string[] = [
    'codigo',
    'nombre',
    'empresaEmi',
    'fexpedicion',
    'fcaducidad',
    'url',
    'accion01',
    'accion02',
    'user',
  ];
  displayedColumnsExperienciaLaboral: string[] = [
    'codigo',
    'empresa',
    'cargo',
    'fechaI',
    'fechaF',
    'accion01',
    'accion02',
    'user',
  ];
  constructor(private cvS: CurriculumService, private loginService: LoginService,) { }
  ngOnInit(): void {
    this.cvS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.cvS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.role = this.loginService.showRole();
    this.sub = this.loginService.showUsername();

  }
  eliminar(id: number) {
    this.cvS.delete(id).subscribe((data) => {
      this.cvS.list().subscribe((data) => {
        this.cvS.setList(data);
      });
    });
  }
}