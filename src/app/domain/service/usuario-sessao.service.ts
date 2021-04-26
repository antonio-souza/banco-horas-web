import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSessaoService {

  private CHAVE: string = "banco-horas-usuario";

  usuario$ = new BehaviorSubject<Usuario>(null);

  constructor() { 
    if (this.isLogado()) {
      this.usuario$.next(this.consultar());
    }        
  }

  gravar(usuario: Usuario, ip: string): void {
    usuario.ip = ip;
    const usuarioStr = JSON.stringify(usuario);
    window.localStorage.setItem(this.CHAVE, usuarioStr);
    this.usuario$.next(this.consultar());
  }

  consultar(): Usuario {
    const usuarioStr = window.localStorage.getItem(this.CHAVE);
    const usuario = JSON.parse(usuarioStr);
    return usuario;
  }

  remover(): void {
    window.localStorage.removeItem(this.CHAVE);
    this.usuario$.next(null);
  }

  isLogado(): boolean {
    return !!window.localStorage.getItem(this.CHAVE);    
  }
}
