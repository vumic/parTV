import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { RequestApiService } from './request-api.service';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import {HomePageComponent} from './home-page/home-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule,RouterModule.forRoot([
    {path: '', component: HomePageComponent },
    {path: 'movie/:movieID', component: MovieDisplayComponent},
    {path: 'search/:query/:page', component: SearchPageComponent},
    {path: 'about', component: AboutPageComponent}
  ])],
  declarations: [ AppComponent, HeaderComponent, PopularMoviesComponent, MovieDisplayComponent,HomePageComponent, SearchPageComponent, AboutPageComponent ],
  bootstrap:    [ AppComponent ],
  providers: [RequestApiService],
  
})
export class AppModule { }
