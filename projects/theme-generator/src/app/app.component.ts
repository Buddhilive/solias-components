import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  generatedTheme!: string;
  primaryColor = '#1a73e8';
  secondaryColor = '#6c757d';
  tertiaryColor = '#ffc107';
  generateTheme() {
    
  }
}
