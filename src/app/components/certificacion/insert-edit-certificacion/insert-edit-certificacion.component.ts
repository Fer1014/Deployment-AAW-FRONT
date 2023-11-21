import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CertificacionService } from 'src/app/services/certificacion.service'; 
import { Certificaciones } from 'src/app/models/certificacion'; 
import * as moment from 'moment';

@Component({
  selector: 'app-insert-edit-certificacion',
  templateUrl: './insert-edit-certificacion.component.html',
  styleUrls: ['./insert-edit-certificacion.component.css']
})
export class InsertEditCertificacionComponent implements OnInit {
  form: FormGroup;
  mensaje: string = '';
  edicion: boolean = false;

  constructor(
    private certificacionService: CertificacionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id_Certificaciones: [{ value: '', disabled: this.edicion }], 
      nombreCertificaciones: ['', Validators.required],
      empresaEmisora: ['', Validators.required],
      fechaExpedicion: ['', Validators.required],
      fechaCaducidad: ['', Validators.required],
      urlCredencial: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.edicion = data['id_Certificaciones'] != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const certificacion: Certificaciones = {
        id_Certificaciones: this.form.value.id_Certificaciones,
        nombreCertificaciones: this.form.value.nombreCertificaciones,
        empresaEmisora: this.form.value.empresaEmisora,
        fechaExpedicion: this.form.value.fechaExpedicion,
        fechaCaducidad: this.form.value.fechaCaducidad,
        urlCredencial: this.form.value.urlCredencial
      };

      if (this.edicion) {
        this.certificacionService.update(certificacion).subscribe(() => {
          this.certificacionService.list().subscribe((data) => {
            this.certificacionService.setList(data);
          });
          this.mensaje = 'Certificación actualizada exitosamente.';
        });
      } else {
        this.certificacionService.insert(certificacion).subscribe(() => {
          this.certificacionService.list().subscribe((data) => {
            this.certificacionService.setList(data);
          });
          this.mensaje = 'Certificación insertada exitosamente.';
        });
      }
      this.router.navigate(['certificacion']);
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

  private init(): void {
    if (this.edicion) {
      const idCertificacion = +this.route.snapshot.params['id_Certificaciones'];
      this.certificacionService.listId(idCertificacion).subscribe((data) => {
        this.form.setValue({
          id_Certificaciones: data.id_Certificaciones,
          nombreCertificaciones: data.nombreCertificaciones,
          empresaEmisora: data.empresaEmisora,
          fechaExpedicion: data.fechaExpedicion,
          fechaCaducidad: data.fechaCaducidad,
          urlCredencial: data.urlCredencial
        });
      });
    }
  }
}
