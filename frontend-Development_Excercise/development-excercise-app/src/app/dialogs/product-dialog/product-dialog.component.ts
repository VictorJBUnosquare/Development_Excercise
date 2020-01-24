import { Component, OnInit, Inject, } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})

export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;

  formisvalid:boolean;
  claveRol = "";
  nombreRol = "";
  botonGuardar = true;
  idRol = "";

  constructor(private dialogRef:MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any, private formBuilder : FormBuilder) { 

                console.log('Imprimiendo data',data);

                this.claveRol = "";
                this.nombreRol = "";
                this.claveRol = data.claveRol;
                this.nombreRol = data.nombreRol;
                this.botonGuardar = data.botonGuardar;
                this.idRol = data.idRol;
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
    console.log(this.productForm);
    alert(this.productForm.valid);
    alert(this.productForm.value.productName);
  }

}



