import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { AdddialogComponent } from './adddialog/adddialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
    declarations: [
        DeleteDialogComponent,
        AdddialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule, MatButtonModule,
        MatCardModule,        
        MatPaginatorModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule   
    ],
    exports: [
        DeleteDialogComponent
    ]
})
export class DialogModule { }
