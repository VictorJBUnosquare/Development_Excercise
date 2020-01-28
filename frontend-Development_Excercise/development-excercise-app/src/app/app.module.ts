import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { NumberDirective } from '../app/directives/numbers-only.directive';


//Material modules
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './components/product/product.component';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDialogComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, {useHash: true})
  ],
  entryComponents: [
    ProductDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
