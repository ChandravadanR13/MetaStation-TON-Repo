import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  userbalancelist(type: any) {
    return this.http
      .post(`${this.baseUrl}/getbalance`, { type: type })
      .pipe(catchError(this.errorHandler));
  }

  assetdetails(data: any, account_type: any) {
    return this.http
      .post(`${this.baseUrl}/assetsdetails`, {
        asset: data,
        account_type: account_type,
      })
      .pipe(catchError(this.errorHandler));
  }

  SendOtp() {
    return this.http
      .post(`${this.baseUrl}/sendOTP`, [])
      .pipe(catchError(this.errorHandler));
  }

  withdrawsubmit(data: any) {
    return this.http
      .post(`${this.baseUrl}/withdraw`, data)
      .pipe(catchError(this.errorHandler));
  }

  addressGenerate(data: any) {
    return this.http
      .post(`${this.baseUrl}/getwallet`, data)
      .pipe(catchError(this.errorHandler));
  }

  updateuserbalance(data: object) {
    return this.http
      .post(`${this.baseUrl}/userbalance`, data)
      .pipe(catchError(this.errorHandler));
  }

  depositHistory(account_type: any) {
    return this.http
      .post(`${this.baseUrl}/depositHistory`, { account_type: account_type })
      .pipe(catchError(this.errorHandler));
  }

  withdrawHistory(account_type: any) {
    return this.http
      .post(`${this.baseUrl}/withdrawHistory`, { account_type: account_type })
      .pipe(catchError(this.errorHandler));
  }

  transsubmit(data: any) {
    return this.http
      .post(`${this.baseUrl}/transwallet`, data)
      .pipe(catchError(this.errorHandler));
  }

  addBalance(data: any) {
    return this.http
      .post(`${this.baseUrl}/depsoitMeta`, { data: data })
      .pipe(catchError(this.errorHandler));
  }

  SignalList() {
    return this.http
      .post(`${this.baseUrl}/signallist`, [])
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError('');
  }
}
