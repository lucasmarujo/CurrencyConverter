import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme$ = this.themeService.isDarkTheme$();
  currentYear = new Date().getFullYear();

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService
  ) {
    // Set available languages
    translate.addLangs(['en-US', 'pt-BR']);
    
    // Get browser language or use saved preference
    const savedLang = localStorage.getItem('language');
    const browserLang = translate.getBrowserLang();
    
    if (savedLang && translate.getLangs().includes(savedLang)) {
      translate.use(savedLang);
    } else if (browserLang && translate.getLangs().includes(browserLang)) {
      translate.use(browserLang);
    } else {
      translate.use('en-US'); // Default language
    }
  }

  ngOnInit(): void {
    // Apply theme class to body
    this.isDarkTheme$.subscribe(isDark => {
      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }
}