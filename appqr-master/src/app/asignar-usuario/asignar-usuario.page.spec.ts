import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarUsuarioPage } from './asignar-usuario.page';

describe('AsignarUsuarioPage', () => {
  let component: AsignarUsuarioPage;
  let fixture: ComponentFixture<AsignarUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsignarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
