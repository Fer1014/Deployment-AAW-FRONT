import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }
  username: string = ""
  password: string = ""
  mensaje: string = ""
  ngOnInit(): void {
  }
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);
      sessionStorage.setItem("username", this.username);
      this.obtenerUsuario(this.username);
      const role = this.loginService.showRole();
      switch (role) {
        case 'ADMINISTRADOR':
          this.router.navigate(['components/administrador/dashboard']);
          break;
        case 'DESARROLLADOR':
          this.router.navigate(['components/desarrollador/profile-desarrollador']);
          break;
        case 'EMPRESARIO':
          this.router.navigate(['components/empresario/profile-empresario']);
          break;
        default:
          console.error('Invalid role');
      }
      this.mensaje = "INICIO DE SESION EXITOSO"
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    });
  }
  hidePassword = true;

  // Método para cambiar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  obtenerUsuario(username: string ): void {

    this.loginService.obtenerUserxUsername(username).subscribe((data) => {
      sessionStorage.setItem("idUsuario", data.id.toString());
      console.log("Usuario en Sesion:" + data.id.toString());
      
    });
    this.router.navigate(['components/administrador/dashboard/comentarios/listar']);

  }

}
