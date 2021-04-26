import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoTabelaComponent } from './saldo-tabela/saldo-tabela.component';
import { SaldoFormularioComponent } from './saldo-formulario/saldo-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MensagemModule } from 'src/app/shared/componentes/mensagem/mensagem.module';
import { PesquisaModule } from 'src/app/shared/componentes/pesquisa/pesquisa.module';
import { VermelhoHoverModule } from 'src/app/shared/diretivas/vermelho-hover/vermelho-hover.module';
import { VisivelSeAdministradorModule } from 'src/app/shared/diretivas/visivel-se-administrador/visivel-se-administrador.module';



@NgModule({
  declarations: [
    SaldoTabelaComponent, 
    SaldoFormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgbPaginationModule,
    MensagemModule,
    PesquisaModule,
    VermelhoHoverModule,
    VisivelSeAdministradorModule
  ],
  entryComponents: [
    SaldoFormularioComponent
  ]
})
export class SaldoModule { }
