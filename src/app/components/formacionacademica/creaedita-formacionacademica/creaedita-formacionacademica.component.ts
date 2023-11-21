import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Carrera } from 'src/app/models/carrera';
import { FormacionAcademica } from 'src/app/models/formacionacademica';
import { Universidad } from 'src/app/models/universidad';
import { CarreraService } from 'src/app/services/carrera.service';
import { FormacionacademicaService } from 'src/app/services/formacionacademica.service';
import { UniversidadService } from 'src/app/services/universidad.service';

@Component({
  selector: 'app-creaedita-formacionacademica',
  templateUrl: './creaedita-formacionacademica.component.html',
  styleUrls: ['./creaedita-formacionacademica.component.css']
})
export class CreaeditaFormacionacademicaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  academica: FormacionAcademica = new FormacionAcademica();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaUniversidades: Universidad[] = [];
  listaCarreras: Carrera[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private uS: UniversidadService,
    private cS: CarreraService,
    private faS: FormacionacademicaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idFormacionAcademica: [''],
      nombre: ['', Validators.required],
      university: ['', Validators.required],
      career: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUniversidades = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCarreras = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.academica.idFormacionAcademica = this.form.value.idFormacionAcademica;
      this.academica.nombreSecundaria = this.form.value.nombre;
      this.academica.university.idUniversidad = this.form.value.university;
      this.academica.carreras.idCarrera = this.form.value.career;
      if (this.edicion) {
        this.faS.update(this.academica).subscribe(() => {
          this.faS.list().subscribe((data) => {
            this.faS.setList(data);
          });
        });
      } else {
        this.faS.insert(this.academica).subscribe((data) => {
          this.faS.list().subscribe((data) => {
            this.faS.setList(data);
          });
        });
      }
      this.router.navigate(['curriculum/nuevo']);
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
      this.faS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idFormacionAcademica: new FormControl(data.idFormacionAcademica),
          nombre: new FormControl(data.nombreSecundaria),
          university: new FormControl(data.university),
          career: new FormControl(data.carreras),
        });
      });
    }
  }
}
