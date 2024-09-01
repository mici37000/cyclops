import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, map, Observable, Subscription } from 'rxjs';
import { Stock } from '../../models/stock.model';
import { StocksService } from '../../services/stocks.service';
import { AsyncPipe } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { StockChangePipe } from '../../pipes/stock-change.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, AlertModule, AsyncPipe, StockChangePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchStocksText') searchStocksText: ElementRef<HTMLInputElement>;
  private searchEvent$: Observable<Event>;
  private searchEventSubscription: Subscription;
  private readonly INIT_STOCKS_TO_DISPLAY: number = 5;
  public stocks$: Observable<Stock[]>;
  public stocksForDisplay$: Observable<Stock[]>;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocks$ = this.stocksService.getStocksData();
    this.stocksForDisplay$ = this.getInitStocksDisplay();
  }

  ngAfterViewInit(): void {
    this.searchEvent$ = fromEvent(this.searchStocksText.nativeElement, 'input');

    this.searchEventSubscription = this.searchEvent$.subscribe((event: Event) => {
      const { value } = event.target as HTMLInputElement;
      this.stocksForDisplay$ = value ? this.getStocksByText(value) : this.getInitStocksDisplay();
    });
  }

  ngOnDestroy(): void {
    this.searchEventSubscription.unsubscribe();
  }

  private getInitStocksDisplay(): Observable<Stock[]> {
    return this.stocks$.pipe(map((stocks: Stock[]) => stocks.slice(0, this.INIT_STOCKS_TO_DISPLAY)));
  }

  private getStocksByText(text: string): Observable<Stock[]> {
    const reg = new RegExp(text, 'i');
    return this.stocks$.pipe(map((stocks: Stock[]) => stocks.filter((s: Stock) => reg.test(s.companyName) || reg.test(s.symbol))));
  }
}
