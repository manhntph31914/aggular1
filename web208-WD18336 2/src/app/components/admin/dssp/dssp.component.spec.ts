import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsspComponent } from './dssp.component';

describe('DsspComponent', () => {
  let component: DsspComponent;
  let fixture: ComponentFixture<DsspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DsspComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
