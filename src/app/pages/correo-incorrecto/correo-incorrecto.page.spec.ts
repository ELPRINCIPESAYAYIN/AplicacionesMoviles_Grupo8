import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorreoIncorrectoPage } from './correo-incorrecto.page';

describe('CorreoIncorrectoPage', () => {
  let component: CorreoIncorrectoPage;
  let fixture: ComponentFixture<CorreoIncorrectoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoIncorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
