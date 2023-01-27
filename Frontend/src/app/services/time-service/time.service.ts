import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() {}

  formatDateIntoTime(time: moment.Moment, use24?: boolean, showAM?: boolean, showTimezone?: boolean): string {
    let format = (use24 ? 'h' : '') + 'h:mm' + (showAM ? ' A' : '') + (showTimezone ? ' z' : '');

    return time.format(format);
  }

  convertUtcToLocal(utc: string): moment.Moment {
    return moment(utc).tz(moment.tz.guess());
  }

  getDayOfWeek(): string {
    let today = new Date().getDay();

    switch (today) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    }
  }
}
