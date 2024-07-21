import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatPageComponent } from './plat-page.component';

describe('PlatPageComponent', () => {
  let component: PlatPageComponent;
  let fixture: ComponentFixture<PlatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
