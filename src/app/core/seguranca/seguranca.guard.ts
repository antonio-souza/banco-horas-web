import { UsuarioSessaoService } from '../../domain/service/usuario-sessao.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/domain/service/usuario.service';

@Injectable({ providedIn: 'root'})
export class SegurancaGuard implements CanActivate {

    constructor(
        private usuarioSessaoService: UsuarioSessaoService,
        private usuarioService: UsuarioService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            
            this.usuarioService.existirToken().subscribe(existeToken => {
                if(!this.usuarioSessaoService.isLogado() || !existeToken) {
                    
                    this.usuarioSessaoService.remover();
                    this.router.navigate(
                        [''],
                        {
                            queryParams: {
                                ultimaUrl: state.url
                            }
                        }
                        );
                    return false;
                }
                return true;
            });
            return true;
    }
}