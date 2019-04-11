import {
  CommsService, DiagnosticDataModule, DiagnosticService, DiagnosticSiteService,
  PUBLIC_DEV_CONFIGURATION, PUBLIC_PROD_CONFIGURATION, SolutionService,
  UnhandledExceptionHandlerService, DetectorControlService
} from 'diagnostic-data';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DiagnosticapiService } from './diagnosticapi.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DiagnosticDataModule.forRoot()
  ],
  providers: [
    DetectorControlService,
    DiagnosticapiService,
    {provide: DiagnosticService, useExisting: DiagnosticapiService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
