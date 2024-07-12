import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {mock_data} from "./assets/mock-data";

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private fileStructure = mock_data;

  private selectedFileContentSubject = new BehaviorSubject<string>('');
  selectedFileContent$: Observable<string> = this.selectedFileContentSubject.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  constructor() {}

  getFileStructure(): Observable<any> {
    return this.searchTerm$.pipe(
      map(term => this.filterStructure(this.fileStructure, term))
    );
  }

  selectFile(content: string): void {
    this.selectedFileContentSubject.next(content);
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  private filterStructure(structure: any, term: string): any {
    if (!term) {
      return structure;
    }

    const filterFolders = (folders: any) => {
      return folders.map((folder: any) => ({
          ...folder,
          folders: filterFolders(folder.folders || []),
          files: (folder.files || []).filter((file: any) => file.name.includes(term))
        }))
        .filter((folder: any) => folder.folders.length > 0 || folder.files.length > 0 || folder.name.includes(term));
    };

    return {
      ...structure,
      folders: filterFolders(structure.folders)
    };
  }
}
