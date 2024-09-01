import { ModalService } from '../../shared/services/modal.service';
import { StocksService } from './stocks.service';
import { Stock } from '../models/stock.model';
import { firstValueFrom } from 'rxjs';

describe('StocksService', () => {
  let stocksService: StocksService;
  let modalServiceMock: jest.Mocked<ModalService>;

  beforeEach(() => {
    stocksService = new StocksService(modalServiceMock);
  });

  it('should return array of all stocks', async () => {
    const result: Stock[] = await firstValueFrom(stocksService.getStocksData());
    expect(result).toBeInstanceOf(Array);
    expect(result[1]).toHaveProperty('symbol');
    expect(result[2].symbol).toMatch(/^[A-Z]{1,5}$/);
    expect(result[3]).toHaveProperty('companyName');
    expect(result[4]).toHaveProperty('currentPrice');
    expect(result[5].currentPrice).toBeGreaterThanOrEqual(0);
    expect(result[6]).toHaveProperty('percentageChange');
    expect(result[1]).toHaveProperty('marketStatus');
    expect(result[2]).toHaveProperty('historicalData');
    expect(result[3].historicalData).toBeInstanceOf(Array);
    expect(result[4]).toHaveProperty('volume');
    expect(result[5].volume).toBeGreaterThanOrEqual(0);
    expect(result[6]).toHaveProperty('high');
    expect(result[1]).toHaveProperty('low');
    expect(result[2].high).toBeGreaterThanOrEqual(result[2].low);
  });
});
