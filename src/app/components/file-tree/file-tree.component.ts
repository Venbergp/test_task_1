import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from '../../services/files.service';
import {MockService} from "../../services/mock.service";
import {BehaviorSubject, combineLatest, Observable, startWith} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileTreeComponent implements OnInit {
  public filesTree: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public expandedPaths: any[] = [];
  public firstOpen: boolean = true;
  constructor(
    private readonly filesService: FilesService,
    private readonly route: ActivatedRoute,
    private readonly mock_service: MockService
  ) {}

  ngOnInit(): void {
    const fileStructure$: Observable<any> = this.mock_service.getFileStructure();
    const selectedFileName$: Observable<string | null> = this.filesService.selectedFileNameSubject$;


    combineLatest([fileStructure$, selectedFileName$]).subscribe(([fileStructure, filename]) => {
      console.log(fileStructure, filename)
      if (filename) {
        this.expandedPaths = this.getPathToFile(filename, fileStructure);
        if (this.firstOpen) {
          this.filesService.selectFileContent(this.expandedPaths[this.expandedPaths.length - 1].content)
          this.firstOpen = false;
        }
      }
      this.filesTree.next(fileStructure);
    });
  }
  private getPathToFile(fileName: string, fileStructure: any): any[] {

    const path: any[] = [fileStructure];
    const searchFolders = (folders: any, currentPath: any): any => {

      for (const folder of folders) {
        const newPath = [...currentPath, folder];
        if (folder.files?.some((file: any) => this.removeDots(file.name) === this.removeDots(fileName))) {
          return [...newPath, folder.files.find((file: any) => this.removeDots(file.name) === this.removeDots(fileName))];
        }
        const result = searchFolders(folder.folders || [], newPath);
        if (result) {
          return result;
        }
      }
      return null;
    };

    return searchFolders(fileStructure.folders, path) || [];
  }

  private removeDots(str: string): string {
    return str.replace(/\./g, '');
  }
}
