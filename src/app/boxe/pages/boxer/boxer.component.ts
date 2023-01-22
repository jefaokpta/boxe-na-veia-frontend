import {Component, OnInit} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {BoxerService} from "../../../service/boxer.service";
import {Boxer} from "../../../model/boxer";

@Component({
  selector: 'app-boxer',
  templateUrl: './boxer.component.html',
  styleUrls: ['./boxer.component.scss']
})
export class BoxerComponent implements OnInit{

  boxers: Boxer[] = [];

  constructor(private server: BoxerService) { }

  ngOnInit(): void {
    this.server.getBoxers().subscribe({
      next: (boxers) => {
        this.boxers = boxers;
      },
      error: (err) => {
        console.log('CAGOU: ', err,);
      },
      complete: () => {
        console.log('COMPLETED');
      }
    });
  }

}
