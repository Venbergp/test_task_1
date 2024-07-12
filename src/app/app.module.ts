import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FileTreeComponent} from "./components/file-tree/file-tree.component";
import {FileViewComponent} from "./components/file-view/file-view.component";
import {FolderComponent} from "./components/folder/folder.component";
import {SearchComponent} from "./components/search/search.component";
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    FileTreeComponent,
    FileViewComponent,
    FolderComponent,
    SearchComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
