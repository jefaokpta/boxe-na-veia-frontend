import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Country} from "../../../../model/country";
import {CountryService} from "../../../../service/country.service";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {BoxerService} from "../service/boxer.service";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";


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

  constructor(private countryService: CountryService,
              private formBuilder: NonNullableFormBuilder,
              private messageService: MessageService,
              private boxerService: BoxerService,
              private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(undefined),
      image: new FormControl(undefined),
      country: new FormControl('br'),
      name: new FormControl('', [Validators.required]),
      birthName: new FormControl('', [Validators.required]),
      alias: new FormControl(''),
      birthDate: new FormControl('', [Validators.required]),
      division: new FormControl('Leve', [Validators.required]),
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
    if (this.formGroup.valid) {
      this.formGroup.value.birthDate = this.dateFormat(this.formGroup.value.birthDate)
      this.boxerService.newBoxer(this.formGroup.value, this.image).subscribe({
        next: (boxer) => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Boxeador cadastrado com sucesso.', life: 11000})
          this.router.navigate(['/boxers'])
      },
        error: (err) => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar boxeador.', life: 11000})
      })
    } else this.markAllAsDirt()
  }

  dateFormat(date: String) {
    let dateArray = date.split('/');
    //todo: tratar erro de conversao de data e lancar mensagem de erro
    return new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`).toISOString()
  }

  markAllAsDirt() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({onlySelf: true});
      }
    })
    this.messageService.add({severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos destacados.', life: 11000})
  }

  onUpload(event: any) {
    let file = event.files[0];
    file.objectURL = file.objectURL ? file.objectURL : this.objectURL;

    if (!file.objectURL) {
      return;
    } else {
      this.image = file;
      this.objectURL = file.objectURL;
    }
  }

  removeImage() {
    this.image = null;
  }

  updateCountry($event: any) {
    this.selectedCountry = $event.value;
    this.formGroup.value.country = this.selectedCountry!!.code.toLowerCase();
  }
}
