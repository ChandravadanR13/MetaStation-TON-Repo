import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError, from, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  positionList(symbol: any) {
    return this.http.post(`${this.baseUrl}/positionList`, {coin: symbol,}).pipe(catchError(this.errorHandler));
  }
  plPositions() {
    return this.http.post(`${this.baseUrl}/pl-positions`, {}).pipe(catchError(this.errorHandler));
  }
  getopenorderSpot() {
    return this.http.post(`${this.baseUrl}/active-orders-spot`, {}).pipe(catchError(this.errorHandler));
  }
  getopenorderFuture() {
    return this.http.post(`${this.baseUrl}/active-orders-linear`, {}).pipe(catchError(this.errorHandler));
  }
  getconditionalorderspot() {
    return this.http.post(`${this.baseUrl}/conditional-orders-spot`, {}).pipe(catchError(this.errorHandler));
  }
  getconditionalorderfuture() {
    return this.http.post(`${this.baseUrl}/conditional-orders-future`, {}).pipe(catchError(this.errorHandler));
  }
  gettpslorder() {
    return this.http.post(`${this.baseUrl}/tp-slOrders`, {}).pipe(catchError(this.errorHandler));
  }
  getlimitmarketorderhistory(type: string) {
    if (type == 'spot') {
      return this.http.post(`${this.baseUrl}/l-m-orderhistoryspot`, {}).pipe(catchError(this.errorHandler));
    } else {
      return this.http.post(`${this.baseUrl}/l-m-orderhistorylinear`, {}).pipe(catchError(this.errorHandler));
    }
  }
  getcondtionalorderhistory(type: string) {
    if (type == 'spot') {
      return this.http.post(`${this.baseUrl}/conditional-history-spot`, {}).pipe(catchError(this.errorHandler));
    } else {
      return this.http.post(`${this.baseUrl}/conditional-history-linear`, {}).pipe(catchError(this.errorHandler));
    }
  }
  gettpslorderhistory() {
    return this.http.post(`${this.baseUrl}/tp-slOrders`, {
      })
      .pipe(catchError(this.errorHandler));
  }
  gettradehistory(type: string) {
    return this.http.post(`${this.baseUrl}/tradehistory`, {type: type,}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status || 'Server error');
  }
}
