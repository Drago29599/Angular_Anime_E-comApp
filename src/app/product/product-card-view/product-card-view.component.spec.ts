import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardViewComponent } from './product-card-view.component';

describe('ProductCardViewComponent', () => {
  let component: ProductCardViewComponent;
  let fixture: ComponentFixture<ProductCardViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardViewComponent]
    });
    fixture = TestBed.createComponent(ProductCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
