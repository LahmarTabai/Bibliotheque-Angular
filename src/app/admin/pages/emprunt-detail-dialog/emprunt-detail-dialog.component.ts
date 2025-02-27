import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Emprunt } from '../../../models/emprunt.models';

@Component({
  selector: 'app-emprunt-detail-dialog',
  templateUrl: './emprunt-detail-dialog.component.html',
  styleUrls: ['./emprunt-detail-dialog.component.css']
})
export class EmpruntDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmpruntDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { emprunt: Emprunt, user: any, document: any }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
