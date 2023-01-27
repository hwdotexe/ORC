import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from '../services/time-service/time.service';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  constructor(private timeService: TimeService) {}

  transform(value: string, showTimezone: boolean): any {
    let local = this.timeService.convertUtcToLocal(value);

    return this.timeService.formatDateIntoTime(local, false, true, showTimezone);
  }
}
