import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioSessaoService } from 'src/app/domain/service/usuario-sessao.service';

@Injectable({ providedIn: 'root'})
export class LoginGuard implements CanActivate {

    constructor(
        private usuarioSessaoService: UsuarioSessaoService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            
            if(this.usuarioSessaoService.isLogado()){
                this.router.navigate(['ponto'])
                return false;
            }
            return true;
    }
}