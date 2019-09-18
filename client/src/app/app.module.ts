import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared-modules/material-module/material-module.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwapsFormComponent } from './components/swaps-form/swaps-form.component';
import { NotificationComponent } from './shared-components/notification/notification.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    SwapsFormComponent,
    NotificationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
