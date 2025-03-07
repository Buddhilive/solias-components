import { Component } from '@angular/core';
import { SoliasCheckboxComponent, SoliasRadioComponent } from '../../../solias-components/src/public-api';
import { FormsModule } from '@angular/forms';
import { ComponentPreviewerComponent } from "./component-previewer/component-previewer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SoliasCheckboxComponent, FormsModule, SoliasRadioComponent, ComponentPreviewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  active = false;
  selectedValue: string = 'lk';

  options = [
    { value: 'lk', label: 'Sri Lanka' },
    { value: 'in', label: 'India' },
    { value: 'cn', label: 'China' },
  ];
}
