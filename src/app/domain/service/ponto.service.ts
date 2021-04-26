import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PontoPagina } from '../model/ponto-pagina';
import { PontoDTO } from '../dto/ponto-dto';
import { Ponto } from '../model/ponto';

const URL_API = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  constructor(private httpClient: HttpClient) { }

  listarComSaldos(matriculaPesquisa: string, tamanho: number, pagina: number) {
    return this.httpClient.get<PontoPagina>(`${URL_API}/ponto/lista-com-saldos?matriculaPesquisa=${matriculaPesquisa}&tamanho=${tamanho}&pagina=${pagina}`);
  }

  consultar(idPonto: number) {
    return this.httpClient.get<Ponto>(`${URL_API}/ponto/consulta/${idPonto}`);
  }
  
  gravarSaldos(saldoPontoDTO: PontoDTO) {
    return this.httpClient.post<PontoDTO>(`${URL_API}/ponto/gravacao-saldo`, saldoPontoDTO);
  }
  
  imprimirSaldos(matriculaPesquisa: string) {
    const httpOptions = { responseType: 'blob' as 'json' };
    return this.httpClient.get<any>(`${URL_API}/ponto/impressao-saldos/${matriculaPesquisa}`, httpOptions);
  }
}
