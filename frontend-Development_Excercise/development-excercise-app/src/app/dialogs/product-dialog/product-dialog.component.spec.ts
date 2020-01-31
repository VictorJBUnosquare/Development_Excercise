import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDialogComponent } from './product-dialog.component';
import { of } from 'rxjs';

describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;
  let mockProductService;

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj(['addProduct','saveProduct']);
    let data = { id : 1 };
    component = new ProductDialogComponent(null,data,null,mockProductService);
  });
});
