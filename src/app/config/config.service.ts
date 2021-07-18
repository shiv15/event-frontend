import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../models/config';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  // TODO: env variable
  configUrl = 'http://localhost:8080/getAllEvents';

  getConfig() {
    return this.http.get<Config[]>(this.configUrl);
  }
}


