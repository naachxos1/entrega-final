import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaSeccionPage } from './lista-seccion.page';

describe('ListaSeccionPage', () => {
  let component: ListaSeccionPage;
  let fixture: ComponentFixture<ListaSeccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaSeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
