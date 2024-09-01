import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksService } from '../../services/stocks.service';
import { map, Observable, tap } from 'rxjs';
import { Stock } from '../../models/stock.model';
import { AsyncPipe } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { StockChangePipe } from '../../pipes/stock-change.pipe';
import { ChartComponent } from '../../components/widget/chart.component';
import { ChartTypeEnum } from 'src/app/shared/enums/chart-type.enum';
import { ChartData } from 'chart.js';
import { HistoricalData } from '../../models/historical-data.model';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [AlertModule, AsyncPipe, StockChangePipe, ChartComponent],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss'
})
export class StockDetailsComponent implements OnInit {
  public symbol: string;
  public activeStock$: Observable<Stock>;
  public chartType = ChartTypeEnum.LINE;
  public chartData: ChartData;

  constructor(
    private route: ActivatedRoute,
    private stocksService: StocksService
  ) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.activeStock$ = this.findStock(this.symbol).pipe(
      tap((stock: Stock) => {
        this.chartData = {
          labels: stock.historicalData.map((s: HistoricalData) => s.date),
          datasets: [{
              label: 'Stock historical price',
              data: stock.historicalData.map((s: HistoricalData) => s.price)
            }]
        };
      })
    );
  }

  private findStock(symbol: string): Observable<Stock> {
    return this.stocksService.getStocksData().pipe(map((stocks: Stock[]) => stocks.find((s: Stock) => s.symbol === symbol)));
  }
}
