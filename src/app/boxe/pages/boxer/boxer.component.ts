import {Component, OnInit} from '@angular/core';
import {catchError, finalize, Observable} from "rxjs";
import {BoxerService} from "./service/boxer.service";
import {Boxer} from "../../../model/boxer";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-boxer',
  templateUrl: './boxer.component.html',
  styleUrls: ['./boxer.component.scss']
})
export class BoxerComponent implements OnInit{

  boxers: Boxer[] = [];
  loading = true;
  boxerImageBaseUrl = environment.boxerImages;
  constructor(private server: BoxerService) { }

  ngOnInit(): void {
    this.server.list().pipe(
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

  imageFallback(event: ErrorEvent) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = 'assets/imgs/boxers/boxer-default.png';
  }
}
