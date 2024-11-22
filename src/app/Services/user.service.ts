import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetails$: Observable<any> | null = null;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Fetch user details and cache the observable
  getUserDetails(): Observable<any> {
    if (!this.userDetails$) {
      this.userDetails$ = this.http.post<any>(`${this.baseUrl}/userdetails`, {}).pipe(
        map(response => response.result),  // Assume response.result contains the user details
        tap(details => console.log('Fetched user details:', details)),
        shareReplay(1),  // Cache the observable (shareReplay(1) ensures only one API call)
        catchError(this.handleError<any>('getUserDetails', {}))
      );
    }
    return this.userDetails$;
  }

  getLastTradType():Promise<string>{
    return this.getUserDetails().pipe(
      map(details => details.st || 'spot')
    ).toPromise();
  }

  getUserRole(): Promise<string> {
    return this.getUserDetails().pipe(
      map(details => details.user_role || 'basic')
    ).toPromise();
  }

  getUserName(): Observable<string> {
    return this.getUserDetails().pipe(
      map(details => details.username || 'unknown')
    );
  }

  getUserTwoFA(): Promise<string> {
    return this.getUserDetails().pipe(
      map(details => details.twofa_status)
    ).toPromise();
  }

  getTwoFAType(): Promise<string> {
    return this.getUserDetails().pipe(
      map(details => details.twofa || '')
    ).toPromise();
  }
  

  getUserEmail(): Observable<string> {
    return this.getUserDetails().pipe(
      map(details => details.email || 'unknown@example.com')
    );
  }

  getPhoneNo(): Observable<string> {
    return this.getUserDetails().pipe(
      map(details => details.phoneno || '000-000-0000')
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
