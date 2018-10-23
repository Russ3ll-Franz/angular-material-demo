import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from '@angular/material';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSidenav: EventEmitter<void> = new EventEmitter();

  @Output()
  toggleTheme: EventEmitter<void> = new EventEmitter();

  @Output()
  toggleDir: EventEmitter<void> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      console.log('Result -> ', result);
      if (result) {
        this.openSnackBar('Contact added', 'Navigate')
          .onAction()
          .subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
