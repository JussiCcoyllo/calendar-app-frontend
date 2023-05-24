import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput, EventAddArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from './event-utils';
import { DatabaseConnectionService } from './database-connection.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  calendarVisible = true;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;

  constructor(private changeDetector: ChangeDetectorRef, private dbservice: DatabaseConnectionService, private router: Router) {
  }

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    // fetch start - end from remote db
    events: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /*
    eventAdd: this.handleAddEvent.bind(this)
    eventChange: 
    eventRemove: 
    */
  };
  currentEvents: EventApi[] = [];

  async ngOnInit(): Promise<void> {
    this.dbservice.fetchAll().subscribe(l => {
      console.log(l.responseList)
      l.responseList.forEach(element => {
        if(element != null && this.calendarComponent != undefined){
          let r = this.calendarComponent.getApi().addEvent({title: element.Title , start: element.dateTime})
          if(r != null){
            this.currentEvents.push(r)
          }
        }
      });
    })
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  handleAddEvent(event: EventAddArg) {
    this.dbservice.postCreate(
      event.event.start === null ? new Date() : event.event.start, 
      event.event.title, 
      event.event.display).subscribe();
  }
}
