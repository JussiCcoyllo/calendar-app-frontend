import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventImpl } from '@fullcalendar/core/internal';
import { DatabaseConnectionService } from 'src/app/data/database-connection.service';
import { TaskPost } from 'src/app/data/task/task-post';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css'],
})
export class DeleteTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    private dbservice: DatabaseConnectionService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: EventImpl
  ) {}

  del() {
    this.dbservice.deleteTask(parseInt(this.data.id)).subscribe(
      (r: TaskPost) => {
        if (r.id != parseInt(this.data.id)) {
          this.snackBar.open('Deleted task, task id changed?', 'Dismiss', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Deleted task', 'Dismiss', { duration: 3000 });
        }
        this.data.remove();
        setTimeout(() => this.dialogRef.close());
      },
      (err: HttpErrorResponse) => {
        this.snackBar
          .open(
            `Failed to delete task ErrorStatus(${err.statusText})`,
            'Dismiss',
            { duration: 3000 }
          )
          .afterDismissed()
          .subscribe(() => this.dialogRef.close());
      }
    );
  }
}
