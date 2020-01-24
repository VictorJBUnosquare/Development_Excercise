import { Routes } from '@angular/router';
import { ProductComponent } from '../app/components/product/product.component';

export const ROUTES: Routes = [
    { 
        path:'', 
        component:ProductComponent
    },
    { 
        path:'**', 
        pathMatch: 'full', 
        component: ProductComponent
    }
];
