import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { AppComponent } from './app.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import {WrapperComponent} from "./components/wrapper/wrapper.component";

export const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      { path: 'file/:fileName', component: FileViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
