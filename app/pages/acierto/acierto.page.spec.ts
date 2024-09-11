import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AciertoPage } from './acierto.page';

describe('AciertoPage', () => {
  let component: AciertoPage;
  let fixture: ComponentFixture<AciertoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AciertoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
