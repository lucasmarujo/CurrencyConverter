import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);

  constructor() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) {
      this.isDarkTheme.next(savedTheme === 'true');
    } else {
      // Check if user prefers dark mode from system settings
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme.next(prefersDark);
    }
  }

  toggleTheme(): void {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    localStorage.setItem('darkTheme', this.isDarkTheme.value.toString());
  }

  isDarkTheme$(): Observable<boolean> {
    return this.isDarkTheme.asObservable();
  }
}