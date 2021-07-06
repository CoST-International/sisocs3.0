import { ErrorNotifierComponent } from '../../error-notifier/error-notifier.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../../notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  showSuccessNotification(message: string, description: string) {
    this.snackbar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        description: description
      },
      duration: 4500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'notifier'
    });
  }

  showErrorNotification(message?: string, description?: Array<string>) {
    this.snackbar.openFromComponent(ErrorNotifierComponent, {
      data: {
        message: message,
        description: description
      },
      duration: 8000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'notifier'
    });
  }
}
