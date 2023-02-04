import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import {Boxer} from "../../../../model/boxer";

@Injectable({
  providedIn: 'root'
})
export class BoxerService {

  constructor(private http: HttpClient) { }

  getBoxers(){
    return this.http.get<Boxer[]>('http://localhost:8080/api/boxers')
      .pipe(
        take(1)
      )
  }
}
