import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventChangeArg, EventRemoveArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { DatabaseConnectionService } from '../data/database-connection.service'; 
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { firstValueFrom } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  calendarVisible = true;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  variable = true;
  showContent() {
    this.variable = !this.variable;
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dbservice: DatabaseConnectionService,
    private router: Router,
    private currentUser: CurrentUserService
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
    const observable = this.currentUser.userId ? this.dbservice.fetchAllTasksOfUser(this.currentUser.userId) : this.dbservice.fetchAllTasks();
    observable.subscribe((l) => {
      l.forEach((element) => {
        if (element != null && this.calendarComponent != undefined) {
          let r = this.calendarComponent
            .getApi()
            .addEvent({ id: "" + element.id, title: element.title, start: element.dateTime });
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
    console.log(this.currentUser)
    const title = prompt('Please enter a new title for your event');

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const postR = await firstValueFrom(this.dbservice.postCreateTask(selectInfo.start, title, "generating new task", this.currentUser.userId? this.currentUser.userId : -1));
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
    this.dbservice.postUpdateTask(
      this.currentUser.userId ? this.currentUser.userId : -1,
      parseInt(updated.id),
      updated.start ? updated.start : new Date(),
      updated.display,
      updated.title
    ).subscribe();
  }

  handleEventRemove(removeInfo: EventRemoveArg) {
    const removed = removeInfo.event;
    this.dbservice.deleteTask(parseInt(removed.id)).subscribe();
  }
}
