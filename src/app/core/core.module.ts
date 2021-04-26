import { MenuModule } from './../shared/componentes/menu/menu.module';
import { VisivelSeLogadoModule } from './../shared/diretivas/visivel-se-logado/visivel-se-logado.module';
import { CredenciaisInterceptor } from './seguranca/credenciais.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertaModule } from '../shared/componentes/alerta/alerta.module';
import { ProgressoModule } from '../shared/componentes/progresso/progresso.module';
import { VisivelSeAdministradorModule } from '../shared/diretivas/visivel-se-administrador/visivel-se-administrador.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertaModule,
    VisivelSeLogadoModule,
    VisivelSeAdministradorModule,
    ProgressoModule,
    MenuModule
  ],
  declarations: [
    CabecalhoComponent, 
    RodapeComponent
  ],
  exports: [
    CabecalhoComponent, 
    RodapeComponent
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: CredenciaisInterceptor,
          multi: true
      }
  ]
})
export class CoreModule { }
