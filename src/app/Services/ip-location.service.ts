import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpLocationService {

  private apiURL = 'https://ipapi.co/json/';

  constructor(private http: HttpClient) {}

  getIpAndLocation(): Observable<any> {
    return this.http.get(this.apiURL);
  }

}
