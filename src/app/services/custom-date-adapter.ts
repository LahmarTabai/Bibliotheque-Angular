import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.indexOf('/') > -1) {
      const [day, month, year] = value.split('/');
      return new Date(+year, +month - 1, +day);
    }
    return super.parse(value);
  }

  override format(date: Date, displayFormat: Object): string {
    return date.toLocaleDateString('fr-FR'); // Format dd/MM/yyyy
  }
}
