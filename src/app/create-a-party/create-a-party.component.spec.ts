import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAPartyComponent } from './create-a-party.component';

describe('CreateAPartyComponent', () => {
  let component: CreateAPartyComponent;
  let fixture: ComponentFixture<CreateAPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
