import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PontoDTO } from 'src/app/domain/dto/ponto-dto';
import { Ponto } from 'src/app/domain/model/ponto';
import { PontoPagina } from 'src/app/domain/model/ponto-pagina';
import { PontoService } from 'src/app/domain/service/ponto.service';
import { UsuarioSessaoService } from 'src/app/domain/service/usuario-sessao.service';
import { AlertaService } from './../../../shared/componentes/alerta/alerta.service';
import { SaldoFormularioComponent } from './../saldo-formulario/saldo-formulario.component';

@Component({
  selector: 'app-saldo-tabela',
  templateUrl: './saldo-tabela.component.html',
  styleUrls: ['./saldo-tabela.component.css']
})
export class SaldoTabelaComponent implements OnInit {

  matriculaPesquisa: string = '';
  tamanho = 12;
  pagina = null;
  pontoPagina: PontoPagina;
  pontoUltimo: Ponto;

  constructor(
    private modalService: NgbModal,
    private alertaService: AlertaService,
    private pontoService: PontoService,
    private usuarioSessaoService: UsuarioSessaoService
  ) { }

  ngOnInit() {
    this.matriculaPesquisa = this.usuarioSessaoService.consultar().matricula;
    this.pagina = 1;
    this.pesquisar(this.matriculaPesquisa);
  }

  pesquisar(matricula: string) {
    this.matriculaPesquisa = matricula;    
    this.pontoService.listarComSaldos(this.matriculaPesquisa, this.tamanho, this.pagina)
      .subscribe(pontoPagina => {
        this.pontoPagina = pontoPagina;
        this.pontoUltimo = pontoPagina.pontos.length == 0 ? null : pontoPagina.pontos[0];
      }, erro => this.alertaService.enviarErro(erro, 'listar saldos'));
  }

  get descricaoFuncionario() : string {
    if (!this.pontoUltimo || !this.pontoUltimo.funcionario) {
      return '';
    }
    const funcionario = this.pontoUltimo.funcionario;
    return `${funcionario.matricula} - ${funcionario.nome} - ${funcionario.setor.sigla}`;
  }

  mudarPagina(pagina: number) {
    this.pagina = pagina;
    this.pontoService.listarComSaldos(this.matriculaPesquisa, this.tamanho, pagina)
      .subscribe(pontoPagina => this.pontoPagina = pontoPagina);
  }

  selecionarSaldoPonto(pontoTabela: Ponto) {    
    this.pontoService.consultar(pontoTabela.id).subscribe(ponto => {
      let modal: NgbModalRef;
      modal = this.modalService.open(SaldoFormularioComponent);
      modal.componentInstance.ponto = ponto;    
      modal.result
        .then((pontoDTO) => {
          this.gravarSaldoPonto(pontoDTO);
        })
        .catch(() => { });  
    });    
  }

  gravarSaldoPonto(pontoDTO: PontoDTO) {
    this.pontoService.gravarSaldos(pontoDTO).subscribe(() => {
      this.alertaService.enviarSucesso('Operação realizada com sucesso!');
      this.pesquisar(this.matriculaPesquisa);
    },
    erro => this.alertaService.enviarErro(erro, 'gravar saldos'));   
  }

  imprimirSaldos() {
    this.pontoService.imprimirSaldos(this.matriculaPesquisa)
      .subscribe((pdf) => {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "saldo-ponto.pdf";
        link.download = this.pontoUltimo ? `ponto-${this.pontoUltimo.periodo.dataInicio}-saldo.pdf` : `ponto-saldo.pdf`;
        link.click();
      }, 
      erro => this.alertaService.enviarErro(erro, 'imprimir saldos'));
  }
}
