import {Component, OnInit} from '@angular/core';
import {ServerService} from "../../../service/server.service";
import {finalize, Observable, take} from "rxjs";
import {Boxer} from "../../../model/boxer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // boxers: Observable<any> | undefined;
  boxers = this.server.getBoxers()
    .pipe(
      finalize(() => this.loading = false)
    );
  loading = true;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    // this.boxers = this.server.getBoxers()
    //   .pipe(
    //     finalize(() => this.loading = false)
    //   );
  }


}
