import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertaComponent } from "./alerta.component";

@NgModule({
    declarations: [AlertaComponent],
    exports: [AlertaComponent],
    imports: [CommonModule]
})
export class AlertaModule {}