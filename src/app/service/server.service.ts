import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getBoxers(){
    return this.http.get('http://localhost:8080/api/boxers')
  }
}
