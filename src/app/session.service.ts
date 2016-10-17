import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class SessionService {
  private mySession: string

  constructor(private http: Http) { }

  getSession() {
    return this.mySession || this.retrieveSession();
  }

  newSession() {
    this.http.get("http://127.0.0.1:3000/api/v1/new_session")
                .map((res) => res.text())
                .catch(this.handleError)
                .subscribe(res => {
                  this.mySession = res
                  this.saveSession(res)
                })
  }

  retrieveSession(): string {
    return localStorage.getItem('auth')
  }
  saveSession(jwt: string) {
    localStorage.setItem('auth', jwt)
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
