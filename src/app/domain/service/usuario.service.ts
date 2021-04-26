import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioDTO } from '../dto/usuario-dto';
import { Usuario } from '../model/usuario';
import { UsuarioPagina } from '../model/usuario-pagina';
import { UsuarioCadastro } from '../model/usuario.cadastro';

const URL_API = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) { }

  consultar(matricula: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      .set('matricula', matricula);
    return this.httpClient.get<Usuario>(`${URL_API}/usuario/consulta`, { 'headers': headers });
  }

  autenticar(matricula: string, senha: string, ip: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      .set('matricula', matricula)
      .set('senha', senha)
      .set('ip', ip);
    return this.httpClient.get<Usuario>(`${URL_API}/usuario/login/web`, { 'headers': headers });
  }

  cadastrar(usuarioCadastro: UsuarioCadastro) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return this.httpClient.post<Usuario>(`${URL_API}/usuario/cadastro/web`, usuarioCadastro, { 'headers': headers });
  }

  listar(criterio: string, tamanho: number, pagina: number) {
    return this.httpClient.get<UsuarioPagina>(`${URL_API}/usuario/lista?criterio=${criterio}&tamanho=${tamanho}&pagina=${pagina}`);
  }

  gravar(usuarioDTO: UsuarioDTO) {
    return this.httpClient.post<Usuario>(`${URL_API}/usuario/gravacao`, usuarioDTO);
  }

  existirToken() {
    return this.httpClient.get<boolean>(`${URL_API}/usuario/verificacao-token`);
  }
}
