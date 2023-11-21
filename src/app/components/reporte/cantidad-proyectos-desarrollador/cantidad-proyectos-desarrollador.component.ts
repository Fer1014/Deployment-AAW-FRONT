import { Component, OnInit } from '@angular/core';

import { ChartType,ChartDataset } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-cantidad-proyectos-desarrollador',
  templateUrl: './cantidad-proyectos-desarrollador.component.html',
  styleUrls: ['./cantidad-proyectos-desarrollador.component.css']
})
export class CantidadProyectosDesarrolladorComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true,

  }
  barChartLabels:string[]=[];
  barChartType:ChartType='doughnut'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private cpS:ProyectoService){}
  ngOnInit(): void {
    this.cpS.getCount().subscribe(data=>{
      this.barChartLabels=data.map((item)=>item.nameDesarrollador);
      this.barChartData=[
        {
          data: data.map(item=>item.quantityProyects),
          label:'Cantidad de Proyectos por desarrollador'
        }
      ];
    });
  }

}
