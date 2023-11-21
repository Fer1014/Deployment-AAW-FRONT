import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Proyectos } from 'src/app/models/proyecto';
import { Usuarios } from 'src/app/models/usuarios';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  proyecto: Proyectos = new Proyectos();
  mensaje: string = '';
  
  listaUsuarios: Usuarios[] = [];
  
  constructor(
   
    private pS:ProyectoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuariosService
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      fechaInicio:['',Validators.required],
      fechaFin:['',Validators.required],
      puestrobuscado: ['',Validators.required],
      users: ['',Validators.required]
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }


  aceptar():void{
    if(this.form.valid){                  //ngOnInit
      this.proyecto.nombre=this.form.value.nombre;
      this.proyecto.descripcion=this.form.value.descripcion;
      this.proyecto.fechaInicio=this.form.value.fechaInicio;
      this.proyecto.fechaFin=this.form.value.fechaFin;
      this.proyecto.puestrobuscado=this.form.value.puestrobuscado;
      this.proyecto.users.id=this.form.value.users;
      this.pS.insert(this.proyecto).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data);
          });
        });
      this.router.navigate(['proyecto']);
    }else{
      this.mensaje='Por favor complete todos los campos obligatorios.'
    }
  }


  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  
}
