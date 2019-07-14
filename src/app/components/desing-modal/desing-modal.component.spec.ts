import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesingModalComponent } from './desing-modal.component';

describe('DesingModalComponent', () => {
  let component: DesingModalComponent;
  let fixture: ComponentFixture<DesingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
