import { environment } from './../../../environments/environment';
import { ServerLog } from './server-log';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_API = environment.urlApi;

@Injectable({ providedIn: 'root' })
export class ServerLogService {

    constructor(private http: HttpClient) {}

    log(serverLog: ServerLog) {
        return this.http.post(URL_API + '/infra/log', serverLog);
    }
}