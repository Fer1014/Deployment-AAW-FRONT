import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Comentario } from 'src/app/models/comentario-puntuacion';
import { CommentService } from 'src/app/services/comment.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios';


@Component({
  selector: 'app-add-comentariopuntuacion',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComentarioComponent implements OnInit{
 
  form: FormGroup = new FormGroup({});
  comentario: Comentario = new Comentario();
  mensaje:string= '';
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cS: CommentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uS: UsuariosService
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comentario : ['', Validators.required],
      puntuacion : ['', [Validators.required, this.validatePuntuacion]]
      });
      };

      validatePuntuacion(control: AbstractControl): { [key: string]: any } | null {
        console.log("Validando puntuacion");
        
        const value = control.value;
        if (value !== null && (isNaN(value) || value < 0 || value > 5)) {
          console.log("puntuacion nok");
          return { 'puntuacionInvalida': true };
          
        }
        console.log("puntuacion ok");
        return null;
      }

      /*
      validatePuntuacion(): boolean{
        const value = this.form.value.puntuacion;
        console.log("Validando puntuacion");
        
        if (value !== null && (isNaN(value) || value < 0 || value > 5)) {
          return false;
        }
        return true;
      }*/


aceptar(): void {
  if (this.form.valid) {
    console.log(this.form.value)
    this.comentario.comentario = this.form.value.comentario;
    this.comentario.puntuacion = this.form.value.puntuacion;
    //this.comentario.users.name = "Patrick";
    //sessionStorage.getItem("idUsuario");
    console.log(sessionStorage.getItem("idUsuario"));

    this.comentario.users.id = Number(sessionStorage.getItem("idUsuario"));

    this.comentario.usersR.id = Number(sessionStorage.getItem("idUsuarioComentario"));

    console.log('Insertando Comentario:', this.comentario);
    this.cS.insert(this.comentario).subscribe((data) => {
      console.log('Respuesta del servicio:', data);
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        alert("Se registro un comentario exitosamente");
        this.router.navigate(['components/administrador/dashboard/comentarios/listar']);
      });
    });
  }else {
    console.log(this.form.value);
    console.log('El formulario no es válido. No se generará la tarjeta.');
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


