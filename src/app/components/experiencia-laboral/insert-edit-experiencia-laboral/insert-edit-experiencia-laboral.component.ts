import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaLaboralService } from 'src/app/services/experiencia-laboral.service';
import { ExperienciaLaboral } from 'src/app/models/experiencia_laboral';

@Component({
  selector: 'app-insert-edit-experiencia-laboral',
  templateUrl: './insert-edit-experiencia-laboral.component.html',
  styleUrls: ['./insert-edit-experiencia-laboral.component.css']
})
export class InsertEditExperienciaLaboralComponent implements OnInit {
  form: FormGroup;
  mensaje: string = '';
  edicion: boolean = false;

  constructor(
    private experienciaLaboralService: ExperienciaLaboralService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id_Experiencia_laboral: [{ value: '', disabled: this.edicion }],
      empresa: ['', Validators.required],
      cargo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinalizado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.edicion = data['id_Experiencia_laboral'] != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const experienciaLaboral: ExperienciaLaboral = {
        id_Experiencia_laboral: this.form.value.id_Experiencia_laboral,
        empresa: this.form.value.empresa,
        cargo: this.form.value.cargo,
        fechaInicio: this.form.value.fechaInicio,
        fechaFinalizado: this.form.value.fechaFinalizado
      };

      if (this.edicion) {
        this.experienciaLaboralService.update(experienciaLaboral).subscribe(() => {
          this.experienciaLaboralService.list().subscribe((data) => {
            this.experienciaLaboralService.setList(data);
          });
          this.mensaje = 'Experiencia laboral actualizada exitosamente.';
        });
      } else {
        this.experienciaLaboralService.insert(experienciaLaboral).subscribe(() => {
          this.experienciaLaboralService.list().subscribe((data) => {
            this.experienciaLaboralService.setList(data);
          });
          this.mensaje = 'Experiencia laboral insertada exitosamente.';
        });
      }
      this.router.navigate(['experiencia-laboral']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string) {
    return this.form.get(nombreCampo);
  }

  private init() {
    if (this.edicion) {
      const idExperienciaLaboral = +this.route.snapshot.params['id_Experiencia_laboral'];
      this.experienciaLaboralService.listId(idExperienciaLaboral).subscribe((data) => {
        this.form.setValue({
          id_Experiencia_laboral: data.id_Experiencia_laboral,
          empresa: data.empresa,
          cargo: data.cargo,
          fechaInicio: data.fechaInicio,
          fechaFinalizado: data.fechaFinalizado
        });
      });
    }
  }
}
