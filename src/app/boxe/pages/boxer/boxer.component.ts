import {Component, OnInit} from '@angular/core';
import {catchError, finalize, Observable} from "rxjs";
import {BoxerService} from "../../../service/boxer.service";
import {Boxer} from "../../../model/boxer";

@Component({
  selector: 'app-boxer',
  templateUrl: './boxer.component.html',
  styleUrls: ['./boxer.component.scss']
})
export class BoxerComponent implements OnInit{

  boxers: Boxer[] = [];
  loading = true;

  constructor(private server: BoxerService) { }

  ngOnInit(): void {
    this.server.getBoxers().pipe(
      finalize(() => this.loading = false),
    ).subscribe({
      next: (boxers) => {
        this.boxers = boxers;
      },
      error: (err) => {
        console.log('CAGOU: ', err,);
      }
    });
  }

}
