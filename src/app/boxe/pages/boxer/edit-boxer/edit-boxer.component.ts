import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Country} from "../../../../model/country";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {CountryService} from "../../../../service/country.service";
import {MessageService} from "primeng/api";
import {BoxerService} from "../service/boxer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-boxer',
  templateUrl: './edit-boxer.component.html',
  styleUrls: ['./edit-boxer.component.scss']
})
export class EditBoxerComponent implements OnInit{

  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;
  image: any;
  objectURL: string = '';
  countries: Country[] = [];
  selectedCountry: Country | undefined;
  divisions: string[] = ['Leve', 'Médio', 'Meio Pesado', 'Pesado']
  genders: string[] = ['M', 'F']
  formGroup: FormGroup

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
      division: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
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
        this.countries = countries
      }
    })
    this.boxerService.getBoxer(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (boxer) => {
        boxer.birthDate = new Date(boxer.birthDate).toLocaleDateString('pt-BR')
        this.formGroup.setValue(boxer)
        this.selectedCountry = this.countries.find((country) => country.code === boxer.country.toUpperCase())
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

  dateFormat(date: string) {
    let dateArray = date.split('/');
    try {
      const bornDate = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
      const day = (bornDate.getDate() < 10) ? `0${bornDate.getDate()}` : bornDate.getDate()
      const month = (bornDate.getMonth() < 10) ? `0${bornDate.getMonth() + 1}` : bornDate.getMonth() + 1
      return `${bornDate.getFullYear()}-${month}-${day}`
    } catch (e) {
      this.messageService.add({severity: 'error', summary: 'Data de nascimento inválida', detail: 'Verifique a data de nascimento', life: 11000})
      throw new Error('Data de nascimento inválida')
    }
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
