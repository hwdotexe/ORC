import { createAction, props } from '@ngrx/store';
import { PageEditRequest } from 'src/app/models/API/Request/page-edit-request.interface';
import { PageFolderDataResponse } from 'src/app/models/API/Response/page-folder-data-response.interface';
import { PageFoldersListResponse } from 'src/app/models/API/Response/page-folders-list-response.interface';
import { Page } from 'src/app/models/page.interface';

export abstract class PagesStateActions {
  static readonly pageFoldersListRequest = createAction('@critcase/action/page_folder_list/request');
  static readonly pageFoldersListReceived = createAction(
    '@critcase/action/page_folder_list/received',
    props<{ response: PageFoldersListResponse }>()
  );
  static readonly pageFoldersDataRequest = createAction('@critcase/action/page_folder_data/request', props<{ folderID: string }>());
  static readonly pageFoldersDataReceived = createAction('@critcase/action/page_folder_data/received', props<{ response: PageFolderDataResponse }>());
  static readonly pagesDataFailure = createAction('@critcase/action/page/failure', props<{ error: any }>());
  static readonly pagesDataCleared = createAction('@critcase/action/page/cleared');
  static readonly pageUpdateRequest = createAction('@critcase/action/page/update/request', props<{ request: PageEditRequest }>());
  static readonly pageUpdateReceived = createAction('@critcase/action/page/update/received', props<{ response: Page }>());
}
