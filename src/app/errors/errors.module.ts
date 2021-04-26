import { UsuarioNaoAutorizadoComponent } from './usuario-nao-autorizado/usuario-nao-autorizado.component';
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NaoEncontradoComponent, 
    UsuarioNaoAutorizadoComponent,
    GlobalErrorComponent
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class ErrorsModule { }
