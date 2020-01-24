import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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

  constructor(){
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
    let objeto = [];
    objeto.push(product1);
    objeto.push(product2);
    objeto.push(product3);
    objeto.push(product4);
    objeto.push(product5);
    objeto.push(product6);
    this.dataSource.data = objeto;
  }

  addProduct(){

  }

  editProduct(id:any){
    alert(id);
  }

  deleteProduct(id:any){
    alert(id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


