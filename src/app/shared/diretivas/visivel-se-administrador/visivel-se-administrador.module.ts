import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VisivelSeAdministradorDirective } from "./visivel-se-administrador.directive";

@NgModule({
    declarations: [VisivelSeAdministradorDirective],
    exports: [VisivelSeAdministradorDirective],
    imports: [CommonModule]
})
export class VisivelSeAdministradorModule {}