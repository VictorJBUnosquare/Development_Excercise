import { Component, OnInit, Inject, } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})

export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;

  formisvalid:boolean;
  id = "";

  constructor(private dialogRef:MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any, private formBuilder : FormBuilder) { 
                this.id = data.id;
  }

  ngOnInit() {
    this.createProductForm();
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

  addProduct(){
    if(this.productForm.valid == true){
      if(this.id != '0'){
        Swal.fire(
          'Updated!',
          'Product udated succefully',
          'success'
        );
  
        this.dialogRef.close();
      }
      else{
        Swal.fire(
          'Added!',
          'Product added succefully',
          'success'
        );
  
        this.dialogRef.close();
      }
    }
  }
}



