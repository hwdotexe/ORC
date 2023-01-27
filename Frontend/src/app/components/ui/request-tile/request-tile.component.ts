import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { Request } from 'src/app/models/API/request.interface';
import { RequestsService } from 'src/app/services/requests-service/requests.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-request-tile',
  templateUrl: './request-tile.component.html',
  styleUrls: ['./request-tile.component.css']
})
export class RequestTileComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() request: Request;
  @Output() onDelete = new EventEmitter<boolean>();

  isDeleting: boolean;

  constructor(private router: Router, private requestsService: RequestsService) {
    super();
  }

  ngOnInit(): void {
    this.isDeleting = false;
  }

  clickDelete(): void {
    if (!this.isDeleting) {
      this.isDeleting = true;
    } else {
      this.requestsService
        .deleteRequest$({ RequestID: this.request.requestID })
        .pipe(take(1), takeUntil(this.unsubscribe$))
        .subscribe(response => {
          if (response) {
            this.onDelete.emit(true);
          } else {
            this.router.navigate(['/error']);
          }
        });
    }
  }
}
