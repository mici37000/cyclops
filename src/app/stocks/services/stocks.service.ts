import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Stock } from '../models/stock.model';
import mockData from '../mocks/mockData';
import { AlertModalOptions } from '../../shared/models/alert-modal-options.model';
import { ModalService } from '../../shared/services/modal.service';
import { isSameDay } from 'date-fns';

type StorageItem = {
  fetchTime: number;
  stocks: Stock[];
};

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private readonly STOCKS_CACHE_KEY: string = 'STOCKS_CACHE';

  constructor(private modalService: ModalService) {}

  public getStocksData(): Observable<Stock[]> {
    const storage = localStorage.getItem(this.STOCKS_CACHE_KEY);

    if (storage) {
      const data: StorageItem = JSON.parse(storage);

      if (isSameDay(Date.now(), data.fetchTime)) {
        console.debug('Using data from cache');
        return of(data.stocks);
      }
    }

    return of(mockData).pipe(
      map((data: { stocks: Stock[] }) => data.stocks),
      tap((stocks: Stock[]) => {
        const data: StorageItem = {
          fetchTime: Date.now(),
          stocks
        };

        localStorage.setItem(this.STOCKS_CACHE_KEY, JSON.stringify(data));
      }),
      catchError((error: Error) => {
        const options: AlertModalOptions = {
          type: 'danger',
          title: 'Caution',
          content: error.message,
          buttonText: 'Close'
        };
        this.modalService.alert(options);
        return of([]);
      })
    );
  }
}
