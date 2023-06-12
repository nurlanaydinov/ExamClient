import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsModule } from './exams/exams.module';
import { LessonsModule } from './lessons/lessons.module';
import { StudentsModule } from './students/students.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExamsModule,
    LessonsModule,
    StudentsModule
  ]
})
export class ComponentsModule { }
