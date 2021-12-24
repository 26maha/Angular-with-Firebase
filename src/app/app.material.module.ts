import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@NgModule({
    imports: [
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatCardModule
    ],
    exports: [
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatCardModule
    ]
})
export class AppMaterial {

}