import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Certificaciones } from 'src/app/models/certificacion';
import { CurriculumVitae } from 'src/app/models/curriculum';
import { ExperienciaLaboral } from 'src/app/models/experiencia_laboral';
import { FormacionAcademica } from 'src/app/models/formacionacademica';
import { idioma } from 'src/app/models/idioma';
import { Usuarios } from 'src/app/models/usuarios';
import { CertificacionService } from 'src/app/services/certificacion.service';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { ExperienciaLaboralService } from 'src/app/services/experiencia-laboral.service';
import { FormacionacademicaService } from 'src/app/services/formacionacademica.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-creaedita-curriculum',
  templateUrl: './creaedita-curriculum.component.html',
  styleUrls: ['./creaedita-curriculum.component.css']
})
export class CreaeditaCurriculumComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  curriculum: CurriculumVitae = new CurriculumVitae();
  mensaje: string = '';
  id: number = 0;
  role: string = '';
  sub: string = '';
  edicion: boolean = false;
  listaFA: FormacionAcademica[] = [];
  listaIdiomas: idioma[]= [];
  listaCertificaciones: Certificaciones[]= [];
  listaExpLaboral: ExperienciaLaboral[]= [];
  listaUsuarios: Usuarios[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private faS: FormacionacademicaService,
    private loginService: LoginService,
    private iS: IdiomaService,
    private certS: CertificacionService,
    private userS: UsuariosService,
    private expS: ExperienciaLaboralService,
    private cvS: CurriculumService,
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
      idCv: [''],
      formacionAcademica: ['', Validators.required],
      idiomas: ['', Validators.required],
      certificaciones: ['', Validators.required],
      experiencialaboral: ['', Validators.required],
      users:['', Validators.required],
    });
    this.faS.list().subscribe((data) => {
      this.listaFA = data;
    });
    this.iS.list().subscribe((data) => {
      this.listaIdiomas = data;
    });
    this.certS.list().subscribe((data) => {
      this.listaCertificaciones = data;
    });
        this.expS.list().subscribe((data) => {
      this.listaExpLaboral = data;
    });
    this.userS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.role = this.loginService.showRole();
    this.sub = this.loginService.showUsername();

  }
  aceptar(): void {
    if (this.form.valid) {
      this.curriculum.idCv = this.form.value.idCv
      this.curriculum.formacionAcademica.idFormacionAcademica = this.form.value.formacionAcademica;
      this.curriculum.idiomas.id_Idiomas = this.form.value.idiomas;
      this.curriculum.certificaciones.id_Certificaciones = this.form.value.certificaciones;
      this.curriculum.experiencialaboral.id_Experiencia_laboral = this.form.value.experiencialaboral;
      this.curriculum.users.id = this.form.value.users;
      if (this.edicion) {
        this.cvS.update(this.curriculum).subscribe(() => {
          this.cvS.list().subscribe((data) => {
            this.cvS.setList(data);
          });
        });
      } else {
        this.cvS.insert(this.curriculum).subscribe((data) => {
          this.cvS.list().subscribe((data) => {
            this.cvS.setList(data);
          });
        });
      }
      this.router.navigate(['curriculum']);
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
      this.cvS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCv: new FormControl(data.idCv),
          formacionAcademica: new FormControl(data.formacionAcademica),
          idiomas: new FormControl(data.idiomas),
          certificaciones: new FormControl(data.certificaciones),
          experiencialaboral: new FormControl(data.experiencialaboral),
          users: new FormControl(data.users)
        });
      });
    }
  }
  
}
