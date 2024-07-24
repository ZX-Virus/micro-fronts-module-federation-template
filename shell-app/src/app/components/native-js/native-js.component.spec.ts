import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeJsComponent } from './native-js.component';

describe('NativeJsComponent', () => {
  let component: NativeJsComponent;
  let fixture: ComponentFixture<NativeJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeJsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NativeJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
