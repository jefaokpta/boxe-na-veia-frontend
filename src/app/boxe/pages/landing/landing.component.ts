import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Boxer} from "../../../model/boxer";
import {LandingService} from "./landing.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{

  display = false;
  partners = ['client-1.png', 'client-2.png', 'client-3.png', 'client-4.png', 'client-5.png', 'client-6.png', 'client-7.png']
  responsiveOptions;
  boxers: Boxer[] = [];
  boxerImageBaseUrl = environment.boxerImages;

  constructor(public router: Router, private landingService: LandingService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.landingService.getAllBoxers().subscribe(boxers => this.boxers = boxers)
  }

  imageFallback(event: ErrorEvent) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = 'assets/imgs/boxers/boxer-default.png';
  }
}
