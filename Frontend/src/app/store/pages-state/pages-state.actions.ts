import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PageCreateRequest } from 'src/app/models/API/Request/page-create-request.interface';
import { PageEditRequest } from 'src/app/models/API/Request/page-edit-request.interface';
import { PageFolderCreateRequest } from 'src/app/models/API/Request/page-folder-create-request.interface';
import { PageCreateResponse } from 'src/app/models/API/Response/page-create-response.interface';
import { PageFolderCreateResponse } from 'src/app/models/API/Response/page-folder-create-response.interface';
import { PageFolderDataResponse } from 'src/app/models/API/Response/page-folder-data-response.interface';
import { PageFoldersListResponse } from 'src/app/models/API/Response/page-folders-list-response.interface';
import { Page } from 'src/app/models/page.interface';

export abstract class PagesStateActions {
  static readonly pageFoldersListRequest = createAction('@critcase/action/page_folder/list/request');
  static readonly pageFoldersListReceived = createAction(
    '@critcase/action/page_folder/list/received',
    props<{ response: PageFoldersListResponse }>()
  );
  static readonly pageFoldersDataRequest = createAction('@critcase/action/page_folder/data/request', props<{ folderID: string }>());
  static readonly pageFoldersDataReceived = createAction('@critcase/action/page_folder/data/received', props<{ response: PageFolderDataResponse }>());
  static readonly pageFolderCreateRequest = createAction(
    '@critcase/action/page_folder/create/request',
    props<{ request: PageFolderCreateRequest }>()
  );
  static readonly pageFolderCreateReceived = createAction(
    '@critcase/action/page_folder/create/received',
    props<{ response: PageFolderCreateResponse }>()
  );
  static readonly pageFolderDeleteRequest = createAction('@critcase/action/page_folder/delete/request', props<{ folderID: string }>());
  static readonly pageFolderDeleteReceived = createAction('@critcase/action/page_folder/delete/received', props<{ folderID: string }>());
  static readonly pageCreateRequest = createAction('@critcase/action/page_create/request', props<{ request: PageCreateRequest }>());
  static readonly pageCreateReceived = createAction(
    '@critcase/action/page_create/received',
    props<{ response: PageCreateResponse; folderID: string }>()
  );
  static readonly pagesDataFailure = createAction('@critcase/action/page/failure', props<{ error: HttpErrorResponse }>());
  static readonly pagesDataCleared = createAction('@critcase/action/page/cleared');
  static readonly pageUpdateRequest = createAction('@critcase/action/page/update/request', props<{ request: PageEditRequest }>());
  static readonly pageUpdateReceived = createAction('@critcase/action/page/update/received', props<{ response: Page }>());
  static readonly pageDeleteRequest = createAction('@critcase/action/page/delete/request', props<{ pageID: string }>());
  static readonly pageDeleteReceived = createAction('@critcase/action/page/delete/received', props<{ pageID: string }>());
}
