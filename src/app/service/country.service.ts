import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Country} from "../model/country";
import {map, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('assets/demo/data/countries.json')
      .pipe(
        map((res: any) => res.data as Country[]),
        take(1),
      )
  }
}
