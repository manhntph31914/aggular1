import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtspComponent } from './ctsp.component';

describe('CtspComponent', () => {
  let component: CtspComponent;
  let fixture: ComponentFixture<CtspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtspComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
