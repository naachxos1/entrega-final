import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth2Page } from './auth2.page';

describe('Auth2Page', () => {
  let component: Auth2Page;
  let fixture: ComponentFixture<Auth2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Auth2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
