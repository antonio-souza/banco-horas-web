import { UsuarioSessaoService } from '../../domain/service/usuario-sessao.service';
import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CredenciaisInterceptor implements HttpInterceptor {

    constructor(private usuarioSessaoService: UsuarioSessaoService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        if (this.usuarioSessaoService.isLogado()) {
            const usuario = this.usuarioSessaoService.consultar();            
            req = req.clone({
                setHeaders: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Authorization': usuario.token
                }
            });
        }
        return next.handle(req);
    }
}