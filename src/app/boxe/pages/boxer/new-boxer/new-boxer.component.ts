import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Country} from "../../../../model/country";
import {CountryService} from "../../../../service/country.service";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";


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
  constructor(private countryService: CountryService, private formBuilder: NonNullableFormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      birthName: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      division: new FormControl('', [Validators.required]),
      weight: new FormControl(0, [Validators.required]),
      height: new FormControl(0.0, [Validators.required]),
      reach: new FormControl(0.0, [Validators.required]),
      wins: new FormControl(0, [Validators.required]),
      losses: new FormControl(0, [Validators.required]),
      draws: new FormControl(0, [Validators.required]),
      noContests: new FormControl(0, [Validators.required]),
      kos: new FormControl(0, [Validators.required]),
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
    this.markAllAsDirt()
  }

  markAllAsDirt() {
    // list all invalid fields
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
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

  updateCountry($event: any) {
    this.selectedCountry = $event.value;
  }
}
