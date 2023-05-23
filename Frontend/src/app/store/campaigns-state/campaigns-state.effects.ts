import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CampaignListResponse } from 'src/app/models/API/Response/campaign-list-response.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { CampaignStateActions } from './campaigns-state.actions';

@Injectable()
export class CampaignStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router) {}

  campaignDataRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignStateActions.campaignDataRequest),
      mergeMap(() =>
        this.httpService.GET<CampaignListResponse>('campaign', 'LIST_CAMPAIGNS', false).pipe(
          map(response => CampaignStateActions.campaignDataReceived({ response: response.body })),
          catchError(error => of(CampaignStateActions.campaignDataFailure({ error })))
        )
      )
    )
  );

  // TODO catch the failure and display something
}
