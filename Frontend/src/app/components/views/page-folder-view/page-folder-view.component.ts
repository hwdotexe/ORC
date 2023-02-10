import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { PageFolder } from 'src/app/models/page-folder.interface';
import { PagesStateService } from 'src/app/store/pages-state/pages-state.service';

@Component({
  selector: 'app-page-folder-view',
  templateUrl: './page-folder-view.component.html',
  styleUrls: ['./page-folder-view.component.css']
})
export class PageFolderViewComponent implements OnInit {
  pageFolder$: Observable<PageFolder>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pagesStateService: PagesStateService) {}

  ngOnInit(): void {
    this.pageFolder$ = this.activatedRoute.queryParamMap.pipe(
      filter(map => map.has('pageFolder')),
      switchMap(map => this.pagesStateService.getPageFolder(map.get('pageFolder'))),
      tap(pageFolder => {
        if (!pageFolder) {
          // TODO call an action to perform the navigation instead.
          this.router.navigate(['/not-found']);
        }
      })
    );
  }
}
