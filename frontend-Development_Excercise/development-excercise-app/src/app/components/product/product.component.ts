import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {ProductDialogComponent} from '../../dialogs/product-dialog/product-dialog.component';
import {ProductService} from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent{

  displayedColumns: string[] = ['ID', 'NAME','AGE','PRICE','COMPANY','ACTIONS'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  titleModal = "";

  constructor(public productDialog : MatDialog, public productService : ProductService){
    this.dataSource = new MatTableDataSource();
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts(){
    this.productService.getProducts().subscribe(response =>{
      if(response.code === 200){
        this.dataSource.data = response.data;
      }
      else {
        Swal.fire(
          'Error',
          'Error loading the products',
          'error'
        )
      }
    })
  }

  addProduct(){
    this.productDialog.closeAll();
    let productModal = 
    this.productDialog.open(ProductDialogComponent,
      { 
        disableClose: true,
        width: '400px',
        data:{
          id: 0
        }
      });

      productModal.afterClosed().subscribe(() => {
        this.loadProducts();
    });
  }

  editProduct(id:any){
    this.productDialog.closeAll();

    this.productService.getProduct(id).subscribe(response =>{
      if(response.code === 200){

        let productModal = 
        this.productDialog.open(ProductDialogComponent,
          { 
            disableClose: true,
            width: '400px',
            data:{
              id: id,
              name :  response.data.name,
              description : response.data.description,
              ageRestriction : response.data.ageRestriction,
              company : response.data.company,
              price : response.data.price
            }
          });
    
          productModal.afterClosed().subscribe(() => {
            this.loadProducts();
        });
      }
      else {
        Swal.fire(
          'Error',
          'Error getting the product',
          'error'
        )
      }
    })
  }

  deleteProduct(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(id).subscribe(response =>{
          if(response.code === 200){
            this.loadProducts();
            Swal.fire(
              'Deleted!',
              'The product has been deleted.',
              'success'
            )
          }
          else{
            this.loadProducts();
            Swal.fire(
              'Error',
              'An error occurred and the product was not deleted',
              'error'
            )
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.loadProducts();
        Swal.fire(
          'Cancelled',
          'The product was not deleted',
          'error'
        )
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


