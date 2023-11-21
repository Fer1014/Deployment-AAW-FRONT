import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-empresario',
  templateUrl: './empresario.component.html',
  styleUrls: ['./empresario.component.css']
})
export class EmpresarioComponent {
  role: string = '';

  constructor(private loginService: LoginService,
    public route:ActivatedRoute) {}

  cerrar() {
    sessionStorage.clear();
  }
  ngOnInit() {
    this.role = this.loginService.showRole();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol() {
    if (this.role == 'ADMINISTRADOR' || this.role == 'EMPRESARIO' || this.role == 'DESARROLLADOR') {
      return true;
    } else {
      return false;
    }
  }


}
