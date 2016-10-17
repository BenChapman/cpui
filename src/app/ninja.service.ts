import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Ninja } from './ninja';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NinjaService {
  private bearerToken:string

  constructor(@Inject(Http) private http:Http, @Inject(SessionService) private sessionService:SessionService) {
    this.bearerToken = this.sessionService.getSession();
  }

  authHeader() {
    return new Headers({ 'Authorization': 'bearer ' + this.bearerToken });
  }

  getNinjas() {
    let options = new RequestOptions({ headers: this.authHeader() });

    return this.http.get("http://127.0.0.1:3000/api/v1/ninja", options)
                .map((res) => res.json())
                .map((res) => {
                  return res.map(this.ninjaFromJSON)
                })
                .catch(this.handleError);
  }
  getNinja(id: number) {
    let options = new RequestOptions({ headers: this.authHeader() });
    return this.http.get("http://127.0.0.1:3000/api/v1/ninja/"+id, options)
                .map((res) => res.json())
                .map(this.ninjaFromJSON)
                .catch(this.handleError);
  }

  createNinjas(ninjas: Array<Ninja>) {
    let result:Array<Ninja> = [];
    ninjas.forEach((ninja: Ninja) => {
      if(ninja.id) {
        this.updateNinja(ninja).subscribe(res => result.push(res))
      } else {
        this.createNinja(ninja).subscribe(res => result.push(res))
      }
    })
    return result;
  }
  createNinja(ninja: Ninja) {
    let body = JSON.stringify(ninja);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer '+this.bearerToken });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://127.0.0.1:3000/api/v1/ninja", body, options)
                .map((res) => res.json())
                .map(this.ninjaFromJSON);
  }
  updateNinja(ninja: Ninja) {
    let body = JSON.stringify(ninja);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer '+this.bearerToken });
    let options = new RequestOptions({ headers: headers });

    return this.http.put("http://127.0.0.1:3000/api/v1/ninja/"+ninja.id, body, options)
                .map((res) => res.json())
                .map(this.ninjaFromJSON);
  }

  deleteNinja(ninja: Ninja) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer '+this.bearerToken });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete("http://127.0.0.1:3000/api/v1/ninja/"+ninja.id, options).forEach(function(){});
  }

  private ninjaFromJSON(object: any): Ninja {
    var ninja: Ninja = new Ninja()
    ninja.id = object.ID
    ninja.name = object.name
    ninja.dateOfBirth = new Date(object.dateOfBirth).toISOString()
    ninja.email = object.email
    ninja.gender = object.gender
    return ninja
  }

  private handleError (error: any) {
    // // In a real world app, we might use a remote logging infrastructure
    // // We'd also dig deeper into the error to get a better message
    // let errMsg = (error.message) ? error.message :
    //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    // return Observable.throw(errMsg);
    alert(error.text())
    return Observable.throw(error.text())
  }
}
