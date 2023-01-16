import {Component} from '@angular/core';
import {ServerService} from "../../../service/server.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  boxers: Observable<any> = this.server.getBoxers();

  constructor(private server: ServerService) { }


}
