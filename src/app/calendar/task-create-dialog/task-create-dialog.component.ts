import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatabaseConnectionService } from '../../data/database-connection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentUserService } from '../../services/current-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarApi } from '@fullcalendar/core';
import { TaskPost } from 'src/app/data/task/task-post';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.css'],
})
export class TaskCreateDialogComponent {
  public selectedTime: string | undefined;

  form = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    description: new FormControl('', []),
    startTime: new FormControl(null, [Validators.required]),
    endTime: new FormControl(null, []),
  });

  constructor(
    public dialogRef: MatDialogRef<TaskCreateDialogComponent>,
    private dbservice: DatabaseConnectionService,
    private user: CurrentUserService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: { date: Date; calendar: CalendarApi }
  ) {}

  submit() {
    const title: string = this.form.get<string>('title')?.value;
    const description: string = this.form.get<string>('description')?.value;
    const id = this.user.userId ? this.user.userId : -1;
    const start = new Date(this.data.date);
    start.setHours(
      this.selectedTime ? parseInt(this.selectedTime.split(':')[0]) : 12
    );
    start.setMinutes(
      this.selectedTime ? parseInt(this.selectedTime.split(':')[1]) : 0
    );
    this.dbservice.postCreateTask(start, title, description, id).subscribe(
      (r: TaskPost) => {
        this.data.calendar.addEvent({
          id: String(r),
          title: title,
          start: start,
          description: description,
        });
        this.snackBar
          .open('Created task', 'Dismiss', { duration: 300 })
          .afterDismissed()
          .subscribe(() => this.dialogRef.close());
      },
      (err: HttpErrorResponse) => {
        this.snackBar
          .open(
            `Failed to create task ErrorStatus(${err.statusText})`,
            'Dismiss',
            { duration: 3000 }
          )
          .afterDismissed()
          .subscribe(() => this.dialogRef.close());
      }
    );
  }
}
