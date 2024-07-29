import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { PlatPageComponent } from './components/pages/plat-page/plat-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitreComponent } from './components/partials/titre/titre.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    PlatPageComponent,
    CartPageComponent,
    TitreComponent,
    NotFoundComponent,
    LoginPageComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: "toast-bottom-right",
        newestOnTop: false
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
