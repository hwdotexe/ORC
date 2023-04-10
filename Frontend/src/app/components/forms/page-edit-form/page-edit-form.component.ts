import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PageEditRequest } from 'src/app/models/API/Request/page-edit-request.interface';
import { FormName } from 'src/app/models/enum/form-name.enum';
import { SharePrivacy } from 'src/app/models/enum/share-privacy.enum';
import { Page } from 'src/app/models/page.interface';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';
import { PagesStateService } from 'src/app/store/pages-state/pages-state.service';

@Component({
  selector: 'app-page-edit-form',
  templateUrl: './page-edit-form.component.html',
  styleUrls: ['./page-edit-form.component.css']
})
export class PageEditFormComponent implements OnInit {
  @Input() page: Page;
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter();

  editPageForm: UntypedFormGroup;
  FormName = FormName;
  SharePrivacy = SharePrivacy;

  constructor(
    private pagesStateService: PagesStateService,
    private formBuilder: UntypedFormBuilder,
    private appDetailsStateService: AppDetailsStateService
  ) {}

  ngOnInit(): void {
    this.editPageForm = this.formBuilder.group({
      title: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      body: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      privacy: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });

    this.patchValues();
  }

  submit(): void {
    this.appDetailsStateService.onFormErrorsCleared();

    if (this.editPageForm.valid) {
      let editData: PageEditRequest = {
        pageID: this.page.pageID,
        title: this.editPageForm.get('title').value,
        body: this.editPageForm.get('body').value,
        privacy: this.editPageForm.get('privacy').value
      };

      // TODO: replace "\n" with "\s\s\n" (but not instances that are already converted) to support markdown newlines.

      this.dispatch(editData);

      this.onSubmit.emit(true);
    }
  }

  patchValues() {
    this.editPageForm.get('title').patchValue(this.page.title);
    this.editPageForm.get('body').patchValue(this.page.body);
    this.editPageForm.get('privacy').patchValue(this.page.privacy);
  }

  dispatch(dispatchData: PageEditRequest): void {
    this.pagesStateService.onPageEditRequest(dispatchData);
  }
}
