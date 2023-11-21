import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Carrera } from './../../../models/carrera';
import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/services/carrera.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaedita-carrera',
  templateUrl: './creaedita-carrera.component.html',
  styleUrls: ['./creaedita-carrera.component.css'],
})
export class CreaeditaCarreraComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  carrera: Carrera = new Carrera();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private cS: CarreraService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idCarrera: [''],
      nameCarreras: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.carrera.idCarrera = this.form.value.idCarrera;
      this.carrera.nameCarreras = this.form.value.nameCarreras;
      if (this.edicion) {
        this.cS.update(this.carrera).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.carrera).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['formacionacademica/nuevo']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
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
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCarrera: new FormControl(data.idCarrera),
          nameCarreras: new FormControl(data.nameCarreras),
        });
      });
    }
  }
}
