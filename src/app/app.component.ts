import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput, EventAddArg, EventApi, EventChangeArg, EventRemoveArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from './event-utils';
import { DatabaseConnectionService } from './database-connection.service';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
 
 
 
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  calendarVisible = true;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  variable = true;
  showContent() {
    this.variable = !this.variable;
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dbservice: DatabaseConnectionService,
    private router: Router
  ) {}

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    events: [],
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
    */
    eventChange: this.handleEventChange.bind(this),
    eventRemove: this.handleEventRemove.bind(this),
  };
  currentEvents: EventApi[] = [];

  async ngOnInit(): Promise<void> {
    this.dbservice.fetchAll().subscribe((l) => {
      l.responseList.forEach((element) => {
        if (element != null && this.calendarComponent != undefined) {
          let r = this.calendarComponent
            .getApi()
            .addEvent({ title: element.title, start: element.dateTime });
          if (r != null) {
            this.currentEvents.push(r);
          }
        }
      });
    });
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  async handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const postR = await firstValueFrom(
        this.dbservice.postCreate(
          selectInfo.start,
          title,
          'a rather generic task'
        )
      );
      calendarApi.addEvent({
        id: String(postR.id),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  handleEventChange(changeInfo: EventChangeArg) {
    const updated = changeInfo.event;
    if (updated.id != changeInfo.oldEvent.id) {
      console.error('event changed id');
    }
    this.dbservice.postUpdate(
      parseInt(updated.id),
      updated.start ? updated.start : new Date(),
      updated.display,
      updated.title
    );
  }

  handleEventRemove(removeInfo: EventRemoveArg) {
    const removed = removeInfo.event;
    this.dbservice.deleteTask(parseInt(removed.id));
  }
}
