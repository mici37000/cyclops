import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto';
import { ChartTypeEnum } from 'src/app/shared/enums/chart-type.enum';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartElement') chartElement: ElementRef<HTMLCanvasElement>;
  @Input() private type: ChartTypeEnum;
  @Input() private data: ChartData;
  private chartInstance: Chart;
  private chartColor: string;

  private static extractCSSVariable(variable: string): string {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    return computedStyle.getPropertyValue(`--${variable}`).trim();
  }

  ngAfterViewInit(): void {
    this.chartColor = ChartComponent.extractCSSVariable('white-color');
    this.chartInstance = this.createChart();
  }

  private createChart() {
    return new Chart(this.chartElement.nativeElement, {
      type: this.type,
      data: this.data,
      options: {
        scales: {
          x: {
            ticks: {
              color: this.chartColor
            }
          },
          y: {
            ticks: {
              color: this.chartColor
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: this.chartColor,
              font: { size: 18 }
            }
          }
        }
      }
    });
  }
}
