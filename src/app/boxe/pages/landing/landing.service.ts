import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {environment} from "../../../../environment/environment";
import {Boxer} from "../../../model/boxer";

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private urlBase = environment.api + '/boxers'

  constructor(private httpClient: HttpClient) { }

  getAllBoxers() {
    return this.httpClient.get<Boxer[]>(`${this.urlBase}/list8`)
      .pipe(
        first()
      )
  }
}
