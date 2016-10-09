import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Ninja } from './ninja';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NinjaService {

  constructor(private http:Http) { }

  getNinjas() {
    return this.http.get("http://127.0.0.1:5984/ninjas/_all_docs")
                .map((res) => res.json().rows)
                .map((ninjas: Array<any>) => {
                    let result:Array<Ninja> = [];
                    if (ninjas) {
                      ninjas.forEach((ninja) => {
                        this.getNinja(ninja.id).subscribe(res => {
                          result.push(res);
                        })
                      });
                    }
                    return result;
                   })
                .catch(this.handleError);
  }
  getNinja(id: string) {
    return this.http.get("http://127.0.0.1:5984/ninjas/"+id)
                .map((res) => res.json())
                .map((ninja: any) => {
                  let cNinja = new Ninja();
                  cNinja.id = ninja._id;
                  cNinja.rev = ninja._rev;
                  cNinja.name = ninja.name;
                  cNinja.dateOfBirth = ninja.dateOfBirth;
                  cNinja.email = ninja.email;
                  cNinja.gender = ninja.gender;
                  return cNinja;
                })
                .catch(this.handleError);
  }

  createNinjas(ninjas: Array<Ninja>) {
    let result:Array<Ninja> = [];
    ninjas.forEach((ninja: Ninja) => {
      if(ninja.id && ninja.rev) {
        this.updateNinja(ninja).subscribe(res => result.push(res))
      } else {
        this.createNinja(ninja).subscribe(res => result.push(res))
      }
    })
    return result;
  }
  createNinja(ninja: Ninja) {
    let body = JSON.stringify(ninja);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://admin:admin@127.0.0.1:5984/ninjas", body, options)
                .map((res) => res.json())
                .map((result: any) => {
                  let cNinja = new Ninja();
                  cNinja.id = result.id;
                  cNinja.rev = result.rev;
                  cNinja.name = ninja.name;
                  cNinja.dateOfBirth = ninja.dateOfBirth;
                  cNinja.email = ninja.email;
                  cNinja.gender = ninja.gender;
                  return cNinja;
                });
  }
  updateNinja(ninja: Ninja) {
    let body = JSON.stringify({
      "_id": ninja.id,
      "_rev": ninja.rev,
      "name": ninja.name,
      "dateOfBirth": ninja.dateOfBirth,
      "gender": ninja.gender,
      "email": ninja.email
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put("http://admin:admin@127.0.0.1:5984/ninjas/"+ninja.id, body, options)
                .map((res) => res.json())
                .map((result: any) => {
                  let cNinja = new Ninja();
                  cNinja.id = result.id;
                  cNinja.rev = result.rev;
                  cNinja.name = ninja.name;
                  cNinja.dateOfBirth = ninja.dateOfBirth;
                  cNinja.email = ninja.email;
                  cNinja.gender = ninja.gender;
                  return cNinja;
                });
  }

  deleteNinja(ninja: Ninja) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete("http://admin:admin@127.0.0.1:5984/ninjas/"+ninja.id+"?rev="+ninja.rev, options).forEach(function(){});
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
