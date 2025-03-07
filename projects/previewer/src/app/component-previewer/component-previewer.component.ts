import { Component, OnInit } from '@angular/core';
import { ComponentLoaderComponent } from "./component-loader/component-loader.component";
import { ComponentSettingsComponent } from "./component-settings/component-settings.component";

@Component({
  selector: 'app-component-previewer',
  standalone: true,
  imports: [ComponentLoaderComponent, ComponentSettingsComponent],
  templateUrl: './component-previewer.component.html',
  styleUrl: './component-previewer.component.scss'
})
export class ComponentPreviewerComponent implements OnInit {
  componentList: any[] = [];

  ngOnInit(): void {
    this.componentList = [
      {
        name: 'Radio',
        controls: [
          {
            type: 'text',
            label: 'Value',
            bind: 'value',
          },
          {
            type: 'text',
            label: 'Name',
            bind: 'name',
          },
          {
            type: 'checkbox',
            label: 'Disabled',
            bind: 'disabled',
          },
          {
            type: 'checkbox',
            label: 'Checked',
            bind: 'checked',
          }
        ]
      }
    ];
  }

  selectComponent(component: any) {
    console.log(component);
  }
}
