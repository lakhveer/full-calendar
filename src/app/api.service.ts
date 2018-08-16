import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: Http) { }

getEvents() {
  return this.http.get('http://localhost:3000/events').pipe(map(res => res.json()));
}

addEvent(data: any) {
  return this.http.post('http://localhost:3000/events/addEvent', data).pipe(map(res => res.json()));
}

}
