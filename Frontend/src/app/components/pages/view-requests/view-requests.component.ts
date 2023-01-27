import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { RequestsService } from 'src/app/services/requests-service/requests.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
  hasError$ = new BehaviorSubject<boolean>(false);
  requests$: Observable<Request[]>;
  isLoading$: Observable<boolean>;

  constructor(private requestsService: RequestsService, private pageLoadingService: PageLoadingService) {}

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;
    this.hasError$ = this.requestsService.hasError$;
    this.requests$ = this.requestsService.getRequests$();
  }

  refreshRequestList() {
    this.requests$ = this.requestsService.getRequests$();
  }
}
