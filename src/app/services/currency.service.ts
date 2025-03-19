import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ExchangeRateResponse } from '../models/exchange-rate.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private cache: { [key: string]: Observable<ExchangeRateResponse> } = {};

  constructor(private http: HttpClient) { }

  getExchangeRates(baseCurrency: string): Observable<ExchangeRateResponse> {
    // Check if we have a cached response for this base currency
    if (this.cache[baseCurrency]) {
      return this.cache[baseCurrency];
    }

    // If not, make the API call and cache the response
    const url = `${environment.apiUrl}${baseCurrency}`;
    this.cache[baseCurrency] = this.http.get<ExchangeRateResponse>(url).pipe(
      shareReplay(1),
      catchError(error => {
        console.error('Error fetching exchange rates:', error);
        return of({
          base: baseCurrency,
          date: new Date().toISOString().split('T')[0],
          rates: {},
          time_last_updated: Date.now()
        });
      })
    );

    return this.cache[baseCurrency];
  }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<number> {
    return this.getExchangeRates(fromCurrency).pipe(
      map(response => {
        if (fromCurrency === toCurrency) {
          return amount;
        }
        
        const rate = response.rates[toCurrency];
        if (!rate) {
          throw new Error(`Exchange rate not available for ${toCurrency}`);
        }
        
        return amount * rate;
      })
    );
  }

  // Clear cache when needed (e.g., after a certain time period)
  clearCache(): void {
    this.cache = {};
  }
}