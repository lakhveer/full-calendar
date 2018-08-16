import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  public events: any[] = [];
  public eventdata: any[] = [];

  public cal = {};

  constructor(private apiService: ApiService) {
    this.getAllEvents();
  }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
  }

  getAllEvents() {
    this.apiService.getEvents().subscribe(data => {
      this.eventdata = [];
      data.data.map((n, i) => {
        let newBody = {
          title: n.title,
          description: n.description,
          start: n.startDate,
          end: n.endDate,
          allDay: n.allDay
        };
        this.eventdata.push(newBody);
      });
      setTimeout(() => {
        this.events = this.eventdata;
        console.log('data ', this.events);
      }, 1000);
    }, error => {
      console.log('error ', error);
    });
  }

  addEvent(form: NgForm) {
    let aa = form.value;
    let finalData = {
      title: aa.title,
      description: aa.description,
      startDate: aa.sDate + 'T' + aa.sTime + 'Z',
      endDate: aa.eDate + 'T' + aa.eTime + 'Z',
      allDay: (aa.allDay == undefined ? false : true)
    };
    console.log('form = ', finalData);
    this.apiService.addEvent(finalData).subscribe(data => {
      console.log('data', data);
      this.getAllEvents();
    }, error => {
      console.log('error', error);
    });
  }

}
