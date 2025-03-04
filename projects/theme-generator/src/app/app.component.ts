import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { THEME_TYPOGRAPHY } from './constants/typography.const';
import { THEME_SPACING } from './constants/spacing.const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  generatedTheme!: string;
  primaryColor = '#1a73e8';
  secondaryColor = '#6c757d';
  tertiaryColor = '#ffc107';
  generateTheme() {
    this.generatedTheme = `
/* Solias Custom Theme */
:root {
  ${THEME_TYPOGRAPHY}\n
  ${THEME_SPACING}\n
  /* Primary Colors */
  --color-primary: ${this.primaryColor};
  --color-primary-hover: ${this.darkenColor(this.primaryColor, 40)};
  --color-primary-active: ${this.darkenColor(this.primaryColor, 80)};
  --color-on-primary: ${this.getContrastColor(this.primaryColor)};

  /* Secondary Colors */
  --color-secondary: ${this.secondaryColor};
  --color-secondary-hover: ${this.darkenColor(this.secondaryColor, 20)};
  --color-secondary-active: ${this.darkenColor(this.secondaryColor, 40)};
  --color-on-secondary: ${this.getContrastColor(this.secondaryColor)};

  /* Tertiary Colors */
  --color-tertiary: ${this.tertiaryColor};
  --color-tertiary-hover: ${this.darkenColor(this.tertiaryColor, 20)};
  --color-tertiary-active: ${this.darkenColor(this.tertiaryColor, 40)};
  --color-on-tertiary: ${this.getContrastColor(this.tertiaryColor)};

  /* Success Colors */
  --color-success: #28a745; /* Green */
  --color-success-hover: #218838; /* Darker green on hover */
  --color-success-active: #1e7e34; /* Even darker green on active */
  --color-on-success: #ffffff; /* Text color on success background */

  /* Error Colors */
  --color-error: #dc3545; /* Red */
  --color-error-hover: #c82333; /* Darker red on hover */
  --color-error-active: #bd2130; /* Even darker red on active */
  --color-on-error: #ffffff; /* Text color on error background */
}

/* Light Mode */
.light {
  /* Background and Surface Colors */
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-on-background: #212529;
  --color-on-surface: #343a40;

  /* Borders and Dividers */
  --color-border: #dee2e6;
  --color-divider: #e9ecef;
}

/* Dark Mode */
.dark {
  /* Background and Surface Colors */
  --color-background: #121212;
  --color-surface: #1e1e1e;
  --color-on-background: #e0e0e0;
  --color-on-surface: #f5f5f5;

  /* Borders and Dividers */
  --color-border: #343a40;
  --color-divider: #2d2d2d;
}`;
  }

  private darkenColor(color: string, percentage: number): string {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
    r = Math.max(0, r - percentage);
    g = Math.max(0, g - percentage);
    b = Math.max(0, b - percentage);
    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private getContrastColor(color: string): string {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}
