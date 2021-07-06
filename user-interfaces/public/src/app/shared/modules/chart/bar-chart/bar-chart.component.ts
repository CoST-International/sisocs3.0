import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() title: any;
  @Input() series: any;
  @Input() categories: any;


  @ViewChild('chart') chart: BarChartComponent;
  public chartOptions: Partial<any>;



  constructor() {


   }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.series,
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: this.title
      },
      xaxis: {
        categories: this.categories
      }
    };
  }



}
