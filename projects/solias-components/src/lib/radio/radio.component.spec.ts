import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliasRadioComponent } from './radio.component';

describe('SoliasRadioComponent', () => {
  let component: SoliasRadioComponent;
  let fixture: ComponentFixture<SoliasRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoliasRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoliasRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
