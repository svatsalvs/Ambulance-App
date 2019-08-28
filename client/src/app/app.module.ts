import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // new
import { HttpClientModule } from '@angular/common/http'; // new

import { AuthService } from './services/auth.service'; // new
import { IsRider } from './services/is-rider.service';
import { TripListResolver } from './services/trip-list.resolver';
import { TripDetailResolver } from './services/trip-detail.resolver';
import { TripService } from './services/trip.service';

import { IsDriver } from './services/is-driver.service';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { RiderRequestComponent } from './components/rider-request/rider-request.component';
import { RiderDetailComponent } from './components/rider-detail/rider-detail.component';
import { DriverComponent } from './components/driver/driver.component';
import { DriverDashboardComponent } from './components/driver-dashboard/driver-dashboard.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { GoogleMapsService } from './services/google-maps.service';
import { GeoService } from './services/geo.service';

import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    LandingComponent,
    RiderComponent,
    RiderDashboardComponent,
    RiderRequestComponent,
    RiderDetailComponent,
    DriverComponent,
    DriverDashboardComponent,
    DriverDetailComponent
  ],
  imports: [
    HttpClientModule, // new
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule, // new
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
  apiKey: environment.GOOGLE_API_KEY
    }),
    RouterModule.forRoot([
      { path: 'sign-up', component: SignUpComponent },
      { path: 'log-in', component: LogInComponent },
      { path: 'rider', 
      component: RiderComponent,
     // canActivate: [ IsRider ],
      children: [
      {
        path: 'request',
        component: RiderRequestComponent
      },

      /*
      {
        path: ':id',
        component: RiderDetailComponent,
        resolve: { trip: TripDetailResolver }
      },
      {
        path: '',
        component: RiderDashboardComponent,
        resolve: { trips: TripListResolver }
      }
      */
      ]
      },
      { path: 'driver', 
      component: DriverComponent,
      canActivate: [ IsDriver ],
      children: [
      {
      path: '',
      component: DriverDashboardComponent,
      resolve: { trips: TripListResolver }
      },
      {
      path: ':id',
      component: DriverDetailComponent,
      resolve: { trip: TripDetailResolver }
      }
      ]
      },
      { path: '', component: LandingComponent }
    ], { useHash: true })
  ],
  providers: [ AuthService,IsDriver,IsRider,TripListResolver,TripService,TripDetailResolver,GoogleMapsService,GeoService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

