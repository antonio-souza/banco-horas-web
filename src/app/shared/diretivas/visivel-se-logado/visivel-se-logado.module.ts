import { NgModule } from "@angular/core";
import { VisivelSeLogadoDirective } from "./visivel-se-logado.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [VisivelSeLogadoDirective],
    exports: [VisivelSeLogadoDirective],
    imports: [CommonModule]
})
export class VisivelSeLogadoModule {}