import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { CantidadUniversidadesDTO } from 'src/app/models/CantidadUniversidadesDTO';
import { UniversidadService } from 'src/app/services/universidad.service';

@Component({
  selector: 'app-cantidad-universidades',
  templateUrl: './cantidad-universidades.component.html',
  styleUrls: ['./cantidad-universidades.component.css']
})
export class CantidadUniversidadesComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = ['Cantidad de Universidades']; // Etiqueta única para la barra
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  
  constructor(private uS: UniversidadService) {}

  ngOnInit(): void {
    this.uS.getCount().subscribe(data => {
      console.log('Data received:', data); // Agrega esta línea para inspeccionar la estructura de data
  
      // Verificar si data es un objeto y contiene la propiedad cantidadUniversidades
      if (typeof data === 'object' && data !== null && 'cantidadUniversidades' in data) {
        const cantidadUniversidades = data.cantidadUniversidades;
  
        // Verificar si cantidadUniversidades es un número
        if (typeof cantidadUniversidades === 'number') {
          this.barChartData = [
            {
              data: [cantidadUniversidades],
              label: 'Cantidad de Universidades'
            },
          ];
        } else {
          console.error('cantidadUniversidades is not a number:', cantidadUniversidades);
        }
      } else {
        console.error('Data is not in the expected format:', data);
      }
    });
  }
}