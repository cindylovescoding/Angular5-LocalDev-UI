import { DiagnosticDataModule, PUBLIC_CONFIGURATION, } from 'applens-diagnostics';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DiagnosticService, DetectorControlService } from 'applens-diagnostics';
import { DiagnosticapiService } from './diagnosticapi.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DiagnosticDataModule.forRoot()
  ],
  providers: [
    DetectorControlService,
    DiagnosticapiService,
    {provide: DiagnosticService, useExisting: DiagnosticapiService},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
