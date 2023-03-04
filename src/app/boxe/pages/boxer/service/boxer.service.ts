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
  getBoxer(id: string) {
    return this.http.get<Boxer>(`${this.api}/${id}`)
      .pipe(
        first()
      )
  }

  newBoxer(boxer: Boxer, image?: File){
    if (!image) return this.http.post(this.api, boxer)
      .pipe(
        first()
      )
    const formData = new FormData();
    formData.append('boxer', JSON.stringify(boxer));
    formData.append('file', image, image.name);
    return this.http.post(`${this.api}/upload`, formData)
      .pipe(
        first()
      )
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`)
      .pipe(
        first()
      )
  }
}
