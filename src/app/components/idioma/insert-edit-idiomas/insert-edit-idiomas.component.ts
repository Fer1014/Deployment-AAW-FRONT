import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdiomaService } from 'src/app/services/idioma.service';
import { idioma } from 'src/app/models/idioma';

@Component({
  selector: 'app-insert-edit-idiomas',
  templateUrl: './insert-edit-idiomas.component.html',
  styleUrls: ['./insert-edit-idiomas.component.css']
})
export class InsertEditIdiomasComponent implements OnInit {
  form: FormGroup;
  mensaje: string = '';
  edicion: boolean = false;

  constructor(
    private idiomaService: IdiomaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id_Idiomas: [{ value: '', disabled: this.edicion }],
      idiomas: ['', Validators.required],
      nivelEscrito: ['', Validators.required],
      nivelOral: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.edicion = data['id_Idiomas'] != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const idioma: idioma = {
        id_Idiomas: this.form.value.id_Idiomas,
        idiomas: this.form.value.idiomas,
        nivelEscrito: this.form.value.nivelEscrito,
        nivelOral: this.form.value.nivelOral
      };

      if (this.edicion) {
        this.idiomaService.update(idioma).subscribe(() => {
          this.idiomaService.list().subscribe((data) => {
            this.idiomaService.setList(data);
          });
          this.mensaje = 'Idioma actualizado exitosamente.';
        });
      } else {
        this.idiomaService.insert(idioma).subscribe(() => {
          this.idiomaService.list().subscribe((data) => {
            this.idiomaService.setList(data);
          });
          this.mensaje = 'Idioma insertado exitosamente.';
        });
      }
      this.router.navigate(['idiomas']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string) {
    return this.form.get(nombreCampo);
  }

  private init() {
    if (this.edicion) {
      const idIdioma = +this.route.snapshot.params['id_Idiomas'];
      this.idiomaService.listId(idIdioma).subscribe((data) => {
        this.form.setValue({
          id_Idiomas: data.id_Idiomas,
          idiomas: data.idiomas,
          nivelEscrito: data.nivelEscrito,
          nivelOral: data.nivelOral
        });
      });
    }
  }
}
