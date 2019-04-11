import { Injectable } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/fr'

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  dNow: any
  startD: any
  endD: any
  // endDate: Date
  constructor() {

  }

  calculateDaysInPercentage(startDate, endDate) {

    // get percentage completed (now - startDate) / (endDate - startDate)
    let now = moment()
    this.dNow = moment(now, 'YYYY-MM-DD HH:mm:ss');
    this.startD = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
    this.endD = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    let percentage_complete = (this.dNow - this.startD) / (this.endD - this.startD) * 100 / 100;
    let percentage_rounded = (Math.round(percentage_complete * 100) / 100);
    // percentage rounded to 2 decimal points
    // console.log('Now: ' +this.dNow)
    // console.log('startDate: ' + this.startD)
    // console.log('endDate: ' + this.endD)
    // console.log(percentage_complete)
    // console.log(percentage_rounded)
    return percentage_rounded
  }

  dateNow() {
    let now = moment()
    now.utc(true)
    return now
  }

  now() {
    let day = moment().date().toString()
    let month = moment().format('M')
    let year = moment().format('YY')
    let milisecond = moment().get('millisecond')
    return year+month+day+milisecond
  }

  calculateHoursIntwoDate(startDate, endDate) {
    let start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
    let end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    let duration = moment.duration(end_date.diff(start_date));

    let hours = duration.asHours();
    return Math.round(hours)


  }

  calculateDuration(startDate, endDate) {
    let start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
    let end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    let duration = moment.duration(end_date.diff(start_date));

    let months = duration.asMonths()
    let weeks = duration.asWeeks()
    let days = duration.asDays();
    let hours = duration.asHours();
    let minute = duration.asMinutes()
    let seconde = duration.asSeconds()

    if (months >= 1) {
      return Math.round(months) + ' Mois';
    } else if (weeks >= 1) {
      return Math.round(weeks) + ' Semaines';
    } else if (days >= 1) {
      return Math.round(days) + ' Jours';
    } else if (hours >= 1) {
      return Math.round(hours) + ' Heures'
    } else if (minute >= 1) {
      return Math.round(minute) + ' Minutes'
    } else if (seconde >= 1) {
      return Math.round(seconde) + ' Secondes'
    } else {
      return 'Terminé !'
    }



  }

  calculateRestOfMomentBetweenTwoDates(endDate) {
    let now = moment()
    let start_date = moment(now, 'YYYY-MM-DD HH:mm:ss');
    let end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    let duration = moment.duration(end_date.diff(start_date));

    let months = duration.asMonths()
    let weeks = duration.asWeeks()
    let days = duration.asDays();
    let hours = duration.asHours();
    let minute = duration.asMinutes()
    let seconde = duration.asSeconds()

    if (months >= 1) {
      return Math.round(months) + ' Mois restants';
    } else if (weeks >= 1) {
      return Math.round(weeks) + ' Semaines restantes';
    } else if (days >= 1) {
      return Math.round(days) + ' Jours restants';
    } else if (hours >= 1) {
      return Math.round(hours) + ' Heures restantes'
    } else if (minute >= 1) {
      return Math.round(minute) + ' Minutes restantes'
    } else if (seconde >= 1) {
      return Math.round(seconde) + ' Secondes restantes'
    } else {
      return 'Terminé !'
    }



  }

  addDays(maxDate, endDate) {
    let now = moment()
    let start_date = moment(now, 'YYYY-MM-DD HH:mm:ss');
    let end_date = moment(maxDate, 'YYYY-MM-DD HH:mm:ss');
    let duration = moment.duration(end_date.diff(start_date));

    let months = duration.asMonths()
    let weeks = duration.asWeeks()
    let days = duration.asDays();
    let hours = duration.asHours();
    let minute = duration.asMinutes()

    if (Math.round(months) >= 1) {
      let new_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss').add(months, 'months');
      console.log(months+' Mois')
      return new_date
    } else if (Math.round(weeks) >= 1) {
      let new_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss').add(weeks, 'weeks');
      console.log(Math.round(weeks))
      return new_date
    } else if (Math.round(days) >= 1) {
      let new_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss').add(days, 'days');
      console.log(Math.round(days))
      return new_date
    } else if (Math.round(hours) >= 1) {
      let new_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss').add(hours, 'hours');
      console.log(Math.round(hours))
      return new_date
    } else if (Math.round(minute) >= 1) {
      let new_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss').add(minute, 'minute');
      console.log(Math.round(minute))
      return new_date
    }
  }

  calculateDays(endDate) {
    let now = moment()
    let start_date = moment(now, 'YYYY-MM-DD HH:mm:ss');
    let end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    let duration = moment.duration(end_date.diff(start_date));

    let days = duration.asDays();
    
    return Math.round(days);
    console.log(days)

    // moment.duration().asDays(); // get the length of the duration in days
    // moment.duration().asHours(); // get the length of the duration in hours
    // moment.duration().asWeeks(); // get the length of the duration in weeks
    // moment.duration().asMonths(); // get the length of the duration inmonths
    // moment.duration().asYears(); // get the length of the duration in years
  }

  getMaxDate(tabDate) {
    let moments = tabDate.map(d => moment(d, 'YYYY-MM-DD HH:mm:ss'))
    let maxDate = moment.max(moments)
    return maxDate
  }

}
