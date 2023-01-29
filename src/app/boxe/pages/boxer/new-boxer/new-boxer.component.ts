import {Component, OnInit} from '@angular/core';
import {Country} from "../../../../model/Country";
import {CountryService} from "../../../../service/country.service";


@Component({
  selector: 'app-new-boxer',
  templateUrl: './new-boxer.component.html',
  styleUrls: ['./new-boxer.component.scss']
})
export class NewBoxerComponent implements OnInit {

  countries: Country[] = [];
  selectedCountry: Country | undefined
  divisions: string[] = ['Leve', 'Médio', 'Meio Pesado', 'Pesado']

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries
      }
    })
  }

  onBasicUpload($event: any) {
    console.log('CARREGOU: ', $event);
  }
}
