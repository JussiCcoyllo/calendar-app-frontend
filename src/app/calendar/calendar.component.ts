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
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateDialogComponent } from './task-create-dialog/task-create-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';

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
    private currentUser: CurrentUserService,
    private dialog: MatDialog
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
    // eventRemove: this.handleEventRemove.bind(this),
  };
  currentEvents: EventApi[] = [];

  async ngOnInit(): Promise<void> {
    const observable = this.currentUser.userId ? this.dbservice.fetchAllTasksOfUser(this.currentUser.userId) : this.dbservice.fetchAllTasks();
    observable.subscribe((l) => {
      l.forEach((element) => {
        if (element != null && this.calendarComponent != undefined) {
          let r = this.calendarComponent
            .getApi()
            .addEvent({ id: "" + element.id, title: element.title, start: element.dateTime, description: element.description });
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
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      data: {
        date: selectInfo.start, 
        calendar: selectInfo.view.calendar
      }
    });
    dialogRef.afterClosed().subscribe()
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.dialog.open(DeleteTaskDialogComponent, {data: clickInfo.event})
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
}
