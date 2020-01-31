import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import { ProductComponent } from './product.component';
import {MatInputModule} from '@angular/material';
import { MatDialog } from '@angular/material';
import {ProductDialogComponent} from '../../dialogs/product-dialog/product-dialog.component';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProductService} from '../../services/product.service';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockProductService;

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj(['getProducts', 'deleteProduct']);
    component = new ProductComponent(null,mockProductService);

  });

  describe('getProducts',() =>{
    it('should return list of product', () =>{
      let response = { 
        code : 200, 
        data : [
          {
          id: 1,
          name: "Barbie Developer",
          description: "Nothing",
          ageRestriction: 5,
          company: "Matel",
          price: 19.99
        },
        {
          id: -2,
          name: "Barbie QA",
          description: "Nothing",
          ageRestriction: 4,
          company: "Matel",
          price: 22.99
        }
      ],
        message: "Succefull Operation"
      };

      mockProductService.getProducts.and.returnValue(of(response));
      component.getProducts();
      expect(component.dataSource.data.length).toBe(2);
    })
  });
});
