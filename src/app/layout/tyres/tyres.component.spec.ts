import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TyresComponent } from './tyres.component';

describe('TablesComponent', () => {
  let component: TyresComponent;
  let fixture: ComponentFixture<TyresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TyresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TyresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
