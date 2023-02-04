import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Country} from "../../../../model/Country";
import {CountryService} from "../../../../service/country.service";


@Component({
  selector: 'app-new-boxer',
  templateUrl: './new-boxer.component.html',
  styleUrls: ['./new-boxer.component.scss']
})
export class NewBoxerComponent implements OnInit {

  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  image: any;

  objectURL: string = '';

  countries: Country[] = [];
  selectedCountry: Country | undefined

  divisions: string[] = ['Leve', 'Médio', 'Meio Pesado', 'Pesado']

  boxerImg: string | undefined

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries
      }
    })
  }

  onUpload(event: any) {
    let file = event.files[0];
    file.objectURL = file.objectURL ? file.objectURL : this.objectURL;

    if (!file.objectURL) {
      return;
    }
    else {
      this.image = file;
      this.objectURL = file.objectURL;
    }
  }

  removeImage() {
    this.image = null;
  }

  showBoxerImg($event: any) {
    const file = $event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.boxerImg = reader.result as string
    }
  }
}
