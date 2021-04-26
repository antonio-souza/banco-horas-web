import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProgressoService } from "./progresso.service";

@Component({
    selector: 'app-progresso',
    templateUrl: './progresso.component.html',
    styleUrls: ['progresso.component.css']
})
export class ProgressoComponent implements OnInit { 

    progresso$: Observable<string>;

    constructor(private progressoService: ProgressoService) {}
    
    ngOnInit(): void {
        this.progresso$ = this.progressoService
            .getProgresso()
            .pipe(map(tipoProgresso => tipoProgresso.valueOf()))
    }
}