import { NgModule } from "@angular/core";
import { ProgressoComponent } from "./progresso.component";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProgressoInterceptor } from "./progresso.interceptor";

@NgModule({
    declarations: [ProgressoComponent],
    exports: [ProgressoComponent],
    imports: [CommonModule],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ProgressoInterceptor,
        multi: true
    }]
})
export class ProgressoModule { }