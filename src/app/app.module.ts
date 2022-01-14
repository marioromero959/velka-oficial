import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
<<<<<<< HEAD
import { FooterComponent } from './footer/components/footer.component';
=======
>>>>>>> 21e2a19e99d7d5d612f668d38dbe0d6f03b8689a
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout/layout.component';

@NgModule({
  declarations: [
<<<<<<< HEAD
    AppComponent,
    FooterComponent,
    LoginComponent,
    LayoutComponent
=======
    AppComponent
>>>>>>> 21e2a19e99d7d5d612f668d38dbe0d6f03b8689a
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
