import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliasComponentsComponent } from './solias-components.component';

describe('SoliasComponentsComponent', () => {
  let component: SoliasComponentsComponent;
  let fixture: ComponentFixture<SoliasComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoliasComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoliasComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
