import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { Report } from 'src/app/models/API/report.interface';
import { Review } from 'src/app/models/API/review.interface';
import { ReportsService } from 'src/app/services/reports-service/reports.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-report-tile',
  templateUrl: './report-tile.component.html',
  styleUrls: ['./report-tile.component.css']
})
export class ReportTileComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() report: Report;
  @Input() review: Review;

  isDeleting: boolean;

  constructor(private router: Router, private reportsService: ReportsService) {
    super();
  }

  ngOnInit(): void {}

  clickDelete(): void {
    if (!this.isDeleting) {
      this.isDeleting = true;
    } else {
      this.reportsService
        .deleteReport$({ ReportID: this.report.reportID })
        .pipe(
          take(1),
          takeUntil(this.unsubscribe$),
          switchMap(response => {
            if (response) {
              return this.reportsService.loadReports$();
            } else {
              this.router.navigate(['/error']);
            }
          })
        )
        .subscribe();
    }
  }
}
