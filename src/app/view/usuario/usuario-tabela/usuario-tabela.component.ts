import { Router } from '@angular/router';
import { AlertaService } from './../../../shared/componentes/alerta/alerta.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/domain/model/usuario';
import { UsuarioSessaoService } from 'src/app/domain/service/usuario-sessao.service';
import { UsuarioService } from 'src/app/domain/service/usuario.service';
import { UsuarioFormularioComponent } from '../usuario-formulario/usuario-formulario.component';
import { UsuarioDTO } from 'src/app/domain/dto/usuario-dto';
import { UsuarioPagina } from 'src/app/domain/model/usuario-pagina';

@Component({
  selector: 'app-usuario-tabela',
  templateUrl: './usuario-tabela.component.html',
  styleUrls: ['./usuario-tabela.component.css']
})
export class UsuarioTabelaComponent implements OnInit {

  criterio: string = '';
  tamanho: number = 15;
  pagina: number = null;
  usuarioPagina: UsuarioPagina;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private alertaService: AlertaService,
    private usuarioService: UsuarioService,
    private usuarioSessaoService: UsuarioSessaoService
  ) { }

  ngOnInit() {
    const usuarioLogado: Usuario = this.usuarioSessaoService.consultar();
    this.pagina = 1;
    this.criterio = usuarioLogado.setor.sigla;
    this.pesquisar(this.criterio);
  }

  pesquisar(criterio: string) {
    this.criterio = criterio;
    this.usuarioService.listar(this.criterio, this.tamanho, this.pagina)
      .subscribe(usuarioPagina => this.usuarioPagina = usuarioPagina,
        erro => this.router.navigate(['nao-encontrado']));
  }

  mudarPagina(pagina: number) {
    this.pagina = pagina;
    this.usuarioService.listar(this.criterio, this.tamanho, pagina)
      .subscribe(usuarioPagina => this.usuarioPagina = usuarioPagina,
        erro => this.router.navigate(['nao-encontrado']));
  }

  selecionarUsuario(usuario: Usuario) {
    let modal: NgbModalRef;
    modal = this.modalService.open(UsuarioFormularioComponent);
    modal.componentInstance.usuario = usuario;    
    modal.result
      .then((usuarioDTO) => {
        this.gravarUsuario(usuarioDTO);
      })
      .catch(() => { });     
  }

  gravarUsuario(usuarioDTO: UsuarioDTO) {
    this.usuarioService.gravar(usuarioDTO).subscribe(() => {
      this.alertaService.enviarSucesso('Operação realizada com sucesso!');
      this.pesquisar(this.criterio);
    });
  }
}
