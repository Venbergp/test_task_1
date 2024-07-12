import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private selectedFileContentSubject = new BehaviorSubject<string | null>(null);
  public selectedFileNameSubject = new BehaviorSubject<string | null>(null);
  selectedFileContent$: Observable<string | null> = this.selectedFileContentSubject.asObservable();
  selectedFileNameSubject$: Observable<string | null> = this.selectedFileNameSubject.asObservable();

  constructor() { }

  public selectFileContent(content: string): void {
    this.selectedFileContentSubject.next(content);
  }

  public selectFileName(name: string): void {
    this.selectedFileNameSubject.next(name.replace('.', ''));
  }

}
