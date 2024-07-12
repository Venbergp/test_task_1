import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FilesService} from "../../services/files.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FolderComponent implements OnInit{
  @Input() folder: any;
  @Input() expandedPaths: any[] = [];
  public isOpen = true;

  constructor(
    private readonly filesService: FilesService,
    private readonly router: Router
  ) {

  }

  ngOnInit(): void {
    this.isOpen = !!this.expandedPaths.length && this.expandedPaths[0].name === this.folder.name;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  selectFile(file: any): void {
    this.router.navigate(['/file', file.name.replace('.', '')])
    this.filesService.selectFileContent(file.content);
    this.filesService.selectFileName(file.name)
  }

  isEmpty(folder: any): boolean {
    return (!folder.files || folder.files.length === 0) && (!folder.folders || folder.folders.length === 0);
  }
}
