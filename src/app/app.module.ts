import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimComponent } from './prim/prim.component';
import { MaterialModule} from './material';

import {CdkTableModule} from '@angular/cdk/table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    PrimComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    CdkTableModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
