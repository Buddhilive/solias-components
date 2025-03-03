import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoliasCheckboxComponent } from './checkbox.component';

describe('SoliasCheckboxComponent', () => {
  let component: SoliasCheckboxComponent;
  let fixture: ComponentFixture<SoliasCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoliasCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoliasCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
