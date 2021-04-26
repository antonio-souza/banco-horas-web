import { SaldoModule } from './view/saldo/saldo.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './errors/errors.module';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioModule } from './view/usuario/usuario.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ErrorsModule,
    HomeModule,
    SaldoModule,
    UsuarioModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
