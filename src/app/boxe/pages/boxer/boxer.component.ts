import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {BoxerService} from "./service/boxer.service";
import {Boxer} from "../../../model/boxer";
import {environment} from "../../../../environments/environment";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-boxer',
  templateUrl: './boxer.component.html',
  styleUrls: ['./boxer.component.scss']
})
export class BoxerComponent implements OnInit{

  boxers: Boxer[] = [];
  loading = true;
  boxerImageBaseUrl = environment.boxerImages;
  constructor(private server: BoxerService, private messageService: MessageService) { }

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

  deleteBoxer(boxer: Boxer) {
    this.server.delete(boxer.id).subscribe({
      next: () => {
        this.boxers = this.boxers.filter((b) => b.id !== boxer.id);
        this.messageService.add({ severity: 'success', summary: 'Lutador excluído com sucesso' });
      }
    });
  }

  imageFallback(event: ErrorEvent) {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = 'assets/imgs/boxers/boxer-default.png';
  }
}
