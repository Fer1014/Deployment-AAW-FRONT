import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-reporte4',
  templateUrl: './reporte4.component.html',
  styleUrls: ['./reporte4.component.css']
})
export class Reporte4Component implements OnInit{
  barCharOptions: ChartOptions = {
    responsive: true,
  };


  barChartLabels:string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'polarArea';
  barChartType: ChartType = 'bar';
  barChartLegend = true
  barChartData:ChartDataset [] = []

  constructor(private cS:CommentService){}

  ngOnInit(): void{
    
    this.cS.getValoracion().subscribe(data=>{
      
      console.log(data);
      
      
      this.barChartLabels=data.map(item=>item.userName);
      this.barChartData = [{
        data:data.map ((item) => item.avgPuntuacion),
        label:'Promedio de Valoración por usuario',
      }]
    })

  }
}
