import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDarkTheme$ = this.themeService.isDarkTheme$();
  
  languages = [
    { code: 'en-US', name: 'English' },
    { code: 'pt-BR', name: 'Português' }
  ];

  constructor(
    public translate: TranslateService,
    private themeService: ThemeService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(langCode: string): void {
    this.translate.use(langCode);
    localStorage.setItem('language', langCode);
  }
}