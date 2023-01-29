import { Component } from '@angular/core';

interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-new-boxer',
  templateUrl: './new-boxer.component.html',
  styleUrls: ['./new-boxer.component.scss']
})
export class NewBoxerComponent {

  countries = [
    {name: 'Brasil', code: 'br'},
    {name: 'Estados Unidos', code: 'us'},
    {name: 'Argentina', code: 'ar'},
    {name: 'Colombia', code: 'co'},
    {name: 'México', code: 'mx'},
  ];
  selectedCountry: Country | undefined

}
