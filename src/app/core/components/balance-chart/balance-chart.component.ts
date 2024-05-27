import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, Ticks } from 'chart.js';
import { NgChartsConfiguration } from 'ng2-charts';
import { ChartModule } from '../../../modules/chart/chart.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './balance-chart.component.html',
  styleUrl: './balance-chart.component.css',
  providers: [
    {
      provide: NgChartsConfiguration,
      useValue: { generateColors: true }
    }
  ]
})
export class BalanceChartComponent implements OnInit, OnChanges{

  @Input() balances: { [user: string]: number } = {};
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    backgroundColor: 'rgba(241,135,1,0.5)',
    borderColor: '#7678ed',
    plugins: {
      legend: {
        labels: {
            font: {
                size: 16,
                family: "'Source Code Pro', monospace"
            },
            color: 'black'
        },
      },        
    },
    scales: {
      xAxis: {
        ticks: {
          font:{
            family: "'Source Code Pro', monospace"
          }
        }
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataset<'bar'>[] = [
    { data: [], label: 'User Balance', hoverBackgroundColor: 'rgba(118, 120, 237,0.5)' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(): void {
    this.updateChartData();
  }

  updateChartData(): void {
    this.barChartLabels = Object.keys(this.balances);
    this.barChartData[0].data = Object.values(this.balances);
  }

}
