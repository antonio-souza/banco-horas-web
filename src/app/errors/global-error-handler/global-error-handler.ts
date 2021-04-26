import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioSessaoService } from 'src/app/domain/service/usuario-sessao.service';
import * as StackTrace from 'stacktrace-js';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {}

    handleError(error: any): void {
        //console.log('passei pelo handler');   

        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UsuarioSessaoService);
        //const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy ? location.path() : '';
        
        const message = error.message ? error.message : error.toString();

        if (environment.production) {
            router.navigate(['/error']);
        }        

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stacksAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                console.log(message);
                console.log(stacksAsString);     
                console.log('o que será enviado para o servidor');  

                // serverLogService.log({ 
                //     message, 
                //     url, 
                //     userName: userService.getUsuario().matricula, 
                //     stack: stacksAsString
                // }).subscribe(
                //     () => console.log('Error logged on server'),
                //     err => {
                //        console.log(err);
                //        console.log('Fail to send error log to server');
                //     }
                // )
            });
    }
}