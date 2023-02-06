import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent implements OnInit {
  @Input() label: string = 'Submit';

  isLoading$: Observable<boolean>;

  constructor(private pageLoadingService: PageLoadingService) {}

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;
  }
}
