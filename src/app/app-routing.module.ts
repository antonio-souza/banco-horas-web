import { UsuarioNaoAutorizadoComponent } from './errors/usuario-nao-autorizado/usuario-nao-autorizado.component';
import { SaldoTabelaComponent } from './view/saldo/saldo-tabela/saldo-tabela.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./core/seguranca/login.guard";
import { SegurancaGuard } from './core/seguranca/seguranca.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NaoEncontradoComponent } from "./errors/nao-encontrado/nao-encontrado.component";
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { UsuarioTabelaComponent } from './view/usuario/usuario-tabela/usuario-tabela.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: '',
                component: LoginComponent,
                data: { title: 'BHR - Login' }
            },
            {
                path: 'cadastro',
                component: CadastroComponent,
                data: { title: 'BHR - Cadastro de Senha' }
            }
        ]
    },    
    {
        path: 'saldo',
        component: SaldoTabelaComponent,
        canActivate: [SegurancaGuard],
        data: { title: 'BHR - Saldos' }
    },   
    {
        path: 'usuario',
        component: UsuarioTabelaComponent,
        canActivate: [SegurancaGuard],
        data: { title: 'BHR - Usuários' }
    },
    { 
        path: 'error', 
        component: GlobalErrorComponent,
        data: { title: 'Error' }
    }, 
    { 
        path: 'nao-encontrada', 
        component: NaoEncontradoComponent
    },
    { 
        path: 'usuario-nao-autorizado', 
        component: UsuarioNaoAutorizadoComponent
    },
    { 
        path: '**', 
        redirectTo: 'nao-encontrada'
    }  
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }