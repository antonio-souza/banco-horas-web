import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilEnum } from 'src/app/domain/model/perfil';
import { Usuario } from 'src/app/domain/model/usuario';
import { UsuarioSessaoService } from '../../domain/service/usuario-sessao.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  isAdministrador: boolean;

  constructor(
    private router: Router,
    private usuarioSessaoService: UsuarioSessaoService
  ) { }

  ngOnInit() {
    this.usuarioSessaoService.usuario$.subscribe((usuario) =>{
      this.isAdministrador = usuario && usuario.perfil.codigo === PerfilEnum.ADMINISTRADOR;
    });
  }

  get usuario(): Usuario {
    return this.usuarioSessaoService.consultar();
  }

  logout() {
    this.usuarioSessaoService.remover();
    this.router.navigate(['']);
  }
}
