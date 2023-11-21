import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Tarjeta } from 'src/app/models/tarjeta';
import { TarjetasService } from 'src/app/services/tarjetas.service';

@Component({
  selector: 'app-tarjeta-creaedita',
  templateUrl: './tarjeta-creaedita.component.html',
  styleUrls: ['./tarjeta-creaedita.component.css']
})
export class TarjetaCreaeditaComponent {
  form: FormGroup = new FormGroup({});
  tarjeta: Tarjeta = new Tarjeta();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private uS: TarjetasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idTarjeta: [''],
      numeroTarjeta: ['', Validators.required],
      fechaexp: ['', Validators.required],
      nombre: ['', [Validators.required]],
      apellido: ['', Validators.required],
      cvv: ['', Validators.required]
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }
  registrar() {
    if (this.form.valid) {
      this.tarjeta.idTarjeta = this.form.value.idTarjeta;
        this.tarjeta.numeroTarjeta = this.form.value.numeroTarjeta;
        this.tarjeta.fechaexp = this.form.value.fechaexp;
        this.tarjeta.nombre = this.form.value.nombre; 
        this.tarjeta.apellido = this.form.value.apellido; 
        this.tarjeta.cvv = this.form.value.cvv;
        if (this.edicion) {
          this.uS.update(this.tarjeta).subscribe(() => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
          });
        } else {
          this.uS.insert(this.tarjeta).subscribe((data) => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
          });
        }
      this.router.navigate(['tarjeta']);

    } else {
      this.mensaje = "Por favor complete todos los campos obligatorios."
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idTarjeta: new FormControl(data.idTarjeta),
          numeroTarjeta: new FormControl(data.numeroTarjeta),
          fechaexp: new FormControl(data.fechaexp),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          cvv: new FormControl(data.cvv),
          
        });
      });
    }
  }
  
}
