import { MaterialModule } from './../material.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, MaterialModule],
    exports: [CommonModule, FormsModule, MaterialModule]
})
export class SharedModule {} 