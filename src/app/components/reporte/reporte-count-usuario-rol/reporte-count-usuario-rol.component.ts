import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reporte-count-usuario-rol',
  templateUrl: './reporte-count-usuario-rol.component.html',
  styleUrls: ['./reporte-count-usuario-rol.component.css']
})
export class ReporteCountUsuarioRolComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private uS: UsuariosService) { }
  ngOnInit(): void {
    this.uS.getCount().subscribe(data => {
      this.barChartLabels = data.map(item => item.rol);
      this.barChartData = [
        {
          data: data.map((item) => item.userCount),
          label:'Cantidad de Usuarios por Rol'

        },
      ];
    });
  }



}
