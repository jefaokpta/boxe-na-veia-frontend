import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Boxer} from "../model/boxer";
import {delay, map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getBoxers(){
    return this.http.get<Boxer[]>('http://localhost:8080/api/boxers')
      .pipe(
        delay(1000),
        // map(boxers => boxers.filter(boxer => boxer.id < 4)),
        // tap(boxers => console.log(boxers))
      );
  }
}
