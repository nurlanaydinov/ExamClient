import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './exam/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "exam", component: LayoutComponent, children: [
      { path: "exams", loadChildren: () => import("./exam/components/exams/exams.module").then(module => module.ExamsModule) },
      { path: "lessons", loadChildren: () => import("./exam/components/lessons/lessons.module").then(module => module.LessonsModule) },
      { path: "students", loadChildren: () => import("./exam/components/students/students.module").then(module => module.StudentsModule) },
    ]
  },
  { path: "", component: HomeComponent },
  { path: "about", loadChildren: () => import("./ui/components/about/about.module").then(module => module.AboutModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
