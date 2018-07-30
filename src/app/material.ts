import { MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule
  ],
})
export class MaterialModule { }