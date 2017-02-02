import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { Rest } from './meta.service';
import { HttpRest } from './meta.service';

export interface AuthService extends HttpRest { }

@Rest()
@Injectable()
export class AuthService {
  authenticate(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Domain', 'app');

    let reqOptions = new RequestOptions({ headers: headers });
  }
}
