import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PesquisaComponent } from "./pesquisa.component";

@NgModule({
    declarations: [PesquisaComponent],
    exports: [PesquisaComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class PesquisaModule {}