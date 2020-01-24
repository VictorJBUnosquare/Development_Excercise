import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {ProductDialogComponent} from '../../dialogs/product-dialog/product-dialog.component';
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

  constructor(public productDialog : MatDialog){
    this.dataSource = new MatTableDataSource();
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts(){
    let product1 = { ID : 1, NAME: 'Product1', AGE: 12, PRICE:'$25.99', COMPANY:'MATEL'};
    let product2 = { ID : 2, NAME: 'Product2', AGE: 4, PRICE:'$76.50', COMPANY:'MATEL'};
    let product3 = { ID : 3, NAME: 'Product3', AGE: 18, PRICE:'$99.99.', COMPANY:'MATEL'};
    let product4 = { ID : 4, NAME: 'Product4', AGE: 12, PRICE:'$77.99', COMPANY:'MATEL'};
    let product5 = { ID : 5, NAME: 'Product5', AGE: 4, PRICE:'$12.50', COMPANY:'MATEL'};
    let product6 = { ID : 6, NAME: 'Product6', AGE: 18, PRICE:'$140.99.', COMPANY:'MATEL'};
    let object1 = [];
    object1.push(product1);
    object1.push(product2);
    object1.push(product3);
    object1.push(product4);
    object1.push(product5);
    object1.push(product6);
    this.dataSource.data = object1;
  }

  addProduct(){
    this.productDialog.closeAll();
    let productModal = 
    this.productDialog.open(ProductDialogComponent,
      { 
        disableClose: true,
        width: '400px',
        data:{
          id: '0'
        }
      });

      productModal.afterClosed().subscribe(() => {
        //alert('Reloading products');
    });
  }

  editProduct(id:any){
    this.productDialog.closeAll();
    let productModal = 
    this.productDialog.open(ProductDialogComponent,
      { 
        disableClose: true,
        width: '400px',
        data:{
          id: id
        }
      });

      productModal.afterClosed().subscribe(() => {
        //alert('Reloading products');
    });
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
        Swal.fire(
          'Deleted!',
          'The product has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
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


