import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentDateService {
  month = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  date = new Date();

  currenTDate = {
    year: this.date.getFullYear(),
    month: this.month[this.date.getMonth()],
    date: this.date.getDate(),
    hour: this.date.getHours(),
    min: this.date.getMinutes()
  }

  day = `${this.currenTDate.date}.${this.currenTDate.month}.${this.currenTDate.year}`;
  time = `${this.currenTDate.hour}:${this.currenTDate.min}`;
  fullDate = `${this.day} - ${this.time}`;
}
