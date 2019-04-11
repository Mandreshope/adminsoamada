import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/fr'

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(date: any, type?: string, format?: string): string {
    let d = moment(date, 'YYYY-MM-DD HH:mm:ss').locale('fr').format(format);
    let fromNow = moment(date, 'YYYY-MM-DD HH:mm:ss').fromNow();
    switch (type) {
      case 'fromNow':
        return fromNow
        break;
      case 'fullDate':
        return d
        break;

      default:
        return d
        break;
    }



  }

}
