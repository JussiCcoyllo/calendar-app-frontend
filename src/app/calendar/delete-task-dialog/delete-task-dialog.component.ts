import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventImpl } from '@fullcalendar/core/internal';
import { DatabaseConnectionService } from 'src/app/data/database-connection.service';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    private dbservice: DatabaseConnectionService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: EventImpl
  ){}

  del(){
    this.dbservice.deleteTask(parseInt(this.data.id)).subscribe(r => {
      this.snackBar.open("Deleted task", "Undo", {duration: 300})
      this.data.remove()
      setTimeout(() => this.dialogRef.close())
    })
  }
}
