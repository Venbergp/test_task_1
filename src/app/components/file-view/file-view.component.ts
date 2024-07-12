import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FilesService} from "../../services/files.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrl: './file-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileViewComponent implements OnInit{

  private currentUrl: string = '';
  constructor(
    public fileService: FilesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let lastParam = params['fileName'];
      this.fileService.selectFileName(lastParam)
    });
  }

}
