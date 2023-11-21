import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { CurriculumService } from 'src/app/services/curriculum.service';
@Component({
  selector: 'app-tolalusersconcv',
  templateUrl: './tolalusersconcv.component.html',
  styleUrls: ['./tolalusersconcv.component.css']
})
export class TolalusersconcvComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private cS: CurriculumService) {}

  ngOnInit(): void {
    this.cS.getCount().subscribe((data) => {
      this.barChartData = [
        {
          data: data.map((item) => item.quantityuser),
          label: 'Monto Total',
          backgroundColor: 'rgba(0, 130, 0, 0.5)',
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}

