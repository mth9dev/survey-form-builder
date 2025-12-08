import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';


const materialModules = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
]

@NgModule({
  declarations: [
    AddQuestionDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    ...materialModules,

    AddQuestionDialogComponent,
  ]
})
export class SharedModule { }
