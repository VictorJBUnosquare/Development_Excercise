import { Component, OnInit, Inject, } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})

export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  formisvalid:boolean;
  id = 0;

  constructor(private dialogRef:MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any, private formBuilder : FormBuilder,
              private productService : ProductService) { 
                this.id = data.id;
                console.log('Service',this.productService);
  }

  ngOnInit() {
    this.createProductForm();
    
    if(this.id != 0){
      this.productForm.controls['productName'].setValue(this.data.name);
      this.productForm.controls['productDescription'].setValue(this.data.description);
      this.productForm.controls['productAge'].setValue(this.data.ageRestriction);
      this.productForm.controls['productCompany'].setValue(this.data.company);
      this.productForm.controls['productPrice'].setValue(this.data.price);
    }
  }

  closeProductModal(){
    this.dialogRef.close();
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      productName: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      productPrice: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      productCompany: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      productAge: this.formBuilder.control(null),
      productDescription: this.formBuilder.control(null),
    });
  }

  saveProduct(){
    if(this.productForm.valid == true){

      let product = new Product();
      product.id = this.id;
      product.name = this.productForm.value.productName;
      product.price = this.productForm.value.productPrice;
      product.company = this.productForm.value.productCompany;
      product.ageRestriction = this.productForm.value.productAge;
      product.description = this.productForm.value.productDescription;


      if(this.id != 0){

        this.productService.updateProduct(this.id,product).subscribe(response =>{
          if(response.code === 200){
            Swal.fire(
              'Updated!',
              'Product updated succefully',
              'success'
            );

            this.dialogRef.close();
          }
          else{
            Swal.fire(
              'Error',
              response.message,
              'error'
              );
          }
        });
      }
      else{
        this.productService.addProduct(product).subscribe(response => {
          if(response.code === 200){
            Swal.fire(
              'Added!',
              'Product added succefully',
              'success'
            );

            this.dialogRef.close();
          }
          else{
            Swal.fire(
              'Error',
              response.message,
              'error'
              );
          }
        });
      }
    }
  }
}



