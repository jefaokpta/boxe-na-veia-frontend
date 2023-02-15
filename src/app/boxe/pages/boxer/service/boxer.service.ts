import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
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
        first()
      )
  }
  new(boxer: Boxer){
    return this.http.post<Boxer>(this.api, boxer)
      .pipe(
        first()
      )
  }
  newImage(boxer: Boxer, image: File){
    const formData = new FormData();
    formData.append('file', image, image.name);
    formData.append('boxer', JSON.stringify(boxer));
    return this.http.post(`${this.api}/upload`, formData)
      .pipe(
        first()
      )
  }
}
