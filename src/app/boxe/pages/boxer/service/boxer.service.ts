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

  submit(boxer: Boxer, image?: File, boxerId?: string) {
    boxer.birthDate = this.dateFormat(boxer.birthDate);
    const formData = new FormData();
    formData.append('boxer', JSON.stringify(boxer));
    if (image){
      formData.append('file', image, image.name);
    }
    if (boxerId){
      return this.http.put(`${this.api}/${boxerId}`, formData)
        .pipe(
          first()
        )
    }
    return this.http.post(this.api, formData)
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

  private dateFormat(date: string): string {
    let dateArray = date.split('/');
    return new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}T09:00:00`).toISOString();
  }
}
