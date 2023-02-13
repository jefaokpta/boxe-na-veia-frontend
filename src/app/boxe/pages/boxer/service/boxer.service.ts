import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import {Boxer} from "../../../../model/boxer";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoxerService {

  private api = environment.api + '/boxers'
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Boxer[]>(this.api)
      .pipe(
        take(1)
      )
  }
  new(boxer: Boxer){
    return this.http.post<Boxer>(this.api, boxer)
      .pipe(
        take(1)
      )
  }
}
