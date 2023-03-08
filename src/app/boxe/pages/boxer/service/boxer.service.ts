import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {Boxer} from "../../../../model/boxer";
import {environment} from "../../../../../environments/environment";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BoxerService {

  private urlBase = environment.api + '/boxers'

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Boxer[]>(this.urlBase)
      .pipe(
        first()
      )
  }
  getBoxer(id: string) {
    return this.http.get<Boxer>(`${this.urlBase}/${id}`)
      .pipe(
        first()
      )
  }

  submit(boxer: Boxer, image?: File, boxerId?: string) {
    boxer.birthDate = moment(boxer.birthDate, 'DD-MM-YYYY').format('YYYY-MM-DDT20:00:00.000Z');
    const formData = new FormData();
    formData.append('boxer', JSON.stringify(boxer));
    if (image){
      formData.append('file', image, image.name);
    }
    if (boxerId){
      return this.http.put(`${this.urlBase}/${boxerId}`, formData)
        .pipe(
          first()
        )
    }
    return this.http.post(this.urlBase, formData)
      .pipe(
        first()
      )
  }

  delete(id: number) {
    return this.http.delete(`${this.urlBase}/${id}`)
      .pipe(
        first()
      )
  }
}
