import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TechEvent } from '../models/config';
import { PostEvent } from '../models/post-event';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  // TODO: env variable
  getUrl = `${environment.baseUrl}/getAllEvents`;
  postUrl = 'https://scraping-events.herokuapp.com/scrapeEvents';


  getConfig() {
    return this.http.get<TechEvent[]>(this.getUrl);
  }

  refreshData(body: PostEvent) {
    return this.http.post<TechEvent[]>(this.postUrl, body);
  }
}


