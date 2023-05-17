import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeWithSidebarComponent } from './liste-with-sidebar.component';

describe('ListeWithSidebarComponent', () => {
  let component: ListeWithSidebarComponent;
  let fixture: ComponentFixture<ListeWithSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeWithSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeWithSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
