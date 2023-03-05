import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Country} from "../../../../model/country";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {CountryService} from "../../../../service/country.service";
import {MessageService} from "primeng/api";
import {BoxerService} from "../service/boxer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-form-boxer',
  templateUrl: './form-boxer.component.html',
  styleUrls: ['./form-boxer.component.scss']
})
export class FormBoxerComponent implements OnInit{

  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
  image: any;
  objectURL: string = '';
  countries: Country[] = [];
  selectedCountry: Country | undefined;
  divisions: string[] = ['Leve', 'Médio', 'Meio Pesado', 'Pesado']
  genders: string[] = ['M', 'F']
  formGroup: FormGroup
  boxerId: string | undefined;
  boxerImagePreview: string | undefined;

  constructor(private countryService: CountryService,
              private formBuilder: NonNullableFormBuilder,
              private messageService: MessageService,
              private boxerService: BoxerService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(undefined),
      country: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      birthName: new FormControl('', [Validators.required]),
      alias: new FormControl(''),
      birthDate: new FormControl('', [Validators.required]),
      division: new FormControl('Leve', [Validators.required]),
      gender: new FormControl('M', [Validators.required]),
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
    this.formGroup.valueChanges.subscribe({
      next: (value) => {
        this.selectedCountry = this.countries.find((country) => country.code.toLowerCase() === value.country.toLowerCase())
      }
    })
    this.boxerId = this.activatedRoute.snapshot.params['id']
    if (this.boxerId) {
      this.boxerService.getBoxer(this.boxerId).subscribe({
        next: (boxer) => {
          boxer.birthDate = new Date(boxer.birthDate).toLocaleDateString('pt-BR')
          this.formGroup.patchValue(boxer)
          this.selectedCountry = this.countries.find((country) => country.code.toLowerCase() === boxer.country.toLowerCase())
          this.boxerImagePreview = `${environment.boxerImages}/boxer-${this.boxerId}.jpg`
        }
      })
    }
  }

  onsubmit() {
    if (this.formGroup.valid) {
      this.boxerService.submit(this.formGroup.value, this.image, this.boxerId).subscribe({
        next: (boxer) => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Boxeador cadastrado com sucesso.', life: 11000})
          this.router.navigate(['/boxers'])
        },
        error: (err) => {
          console.log(err.error.message)
          if (err.error.message.includes('constraint')) {
            this.messageService.add({severity: 'error', summary: 'Lutador já existe', detail: 'Existe um lutador com o mesmo nome.', life: 11000})
          } else {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar boxeador.', life: 11000})
          }
        }
      })
    } else this.markAllAsDirt()
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
    this.boxerImagePreview = undefined
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

  imageFallback() {
    this.boxerImagePreview = undefined
  }
}
