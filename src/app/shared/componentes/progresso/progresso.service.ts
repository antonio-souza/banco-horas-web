import { Injectable } from "@angular/core";
import { SituacaoProgresso } from "./situacao-progresso";
import { Subject } from "rxjs";
import { startWith } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ProgressoService { 

    progressoSubject = new Subject<SituacaoProgresso>();

    getProgresso() {
        return this.progressoSubject
            .asObservable()
            .pipe(startWith(SituacaoProgresso.PARADO));
    }

    iniciar() {
        this.progressoSubject.next(SituacaoProgresso.CARREGANDO);
    }

    parar() {
        this.progressoSubject.next(SituacaoProgresso.PARADO);
    }    
}