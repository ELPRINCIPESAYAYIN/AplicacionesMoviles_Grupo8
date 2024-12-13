import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mirutaPage } from './miruta.page';

describe('mirutaPage', () => {
  let component: mirutaPage;
  let fixture: ComponentFixture<mirutaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(mirutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
