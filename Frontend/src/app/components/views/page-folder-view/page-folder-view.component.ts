import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, of, switchMap } from 'rxjs';
import { PageFolder } from 'src/app/models/page-folder.interface';
import { Page } from 'src/app/models/page.interface';
import { PagesStateService } from 'src/app/store/pages-state/pages-state.service';

@Component({
  selector: 'app-page-folder-view',
  templateUrl: './page-folder-view.component.html',
  styleUrls: ['./page-folder-view.component.css']
})
export class PageFolderViewComponent implements OnInit {
  pages$: Observable<Page[]>;
  pageFolder$: Observable<PageFolder>;
  isDataLoaded$: Observable<boolean>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pagesStateService: PagesStateService) {}

  ngOnInit(): void {
    this.pageFolder$ = this.activatedRoute.queryParamMap.pipe(
      switchMap(map => (map.has('pageFolder') ? this.pagesStateService.getPageFolderFromID$(map.get('pageFolder')) : of(null)))
    );

    this.pages$ = this.pagesStateService.pages$;

    this.isDataLoaded$ = this.pageFolder$.pipe(
      filter(folder => !!folder),
      switchMap(folder => this.pagesStateService.isPageDataLoaded$(folder))
    );
  }
}
