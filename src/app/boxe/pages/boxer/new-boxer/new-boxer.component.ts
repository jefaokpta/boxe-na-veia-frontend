import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Country} from "../../../../model/country";
import {CountryService} from "../../../../service/country.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


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
  selectedCountry: Country | undefined;
  divisions: string[] = ['Leve', 'Médio', 'Meio Pesado', 'Pesado']
  formGroup: FormGroup
  constructor(private countryService: CountryService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      birthName: new FormControl(null, [Validators.required]),
      alias: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.selectedCountry = countries[0];
        this.countries = countries
      }
    })
  }

  onsubmit() {

  }
  isInvalidAndDirty(field: string) {
    const control = this.formGroup.get(field);
    return control!!.dirty && control!!.invalid;
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

  updateCountry($event: any) {
    this.selectedCountry = $event.value;
  }
}
