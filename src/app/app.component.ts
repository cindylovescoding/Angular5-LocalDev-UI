import { Component, OnInit } from '@angular/core';
import { DetectorResponse, DetectorMetaData } from 'diagnostic-data';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { map, catchError} from 'rxjs/operators';
//import * as momentNs from 'moment';
import 'moment-timezone';
import * as momentNs from 'moment-timezone';
import * as moment from 'moment-timezone';
import { DiagnosticService } from 'diagnostic-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Detector-Output';
  detectorResponse: DetectorResponse = null;
  detectorResponse1: DetectorResponse = null;
  author = "";

  startTime: momentNs.Moment = moment.utc().subtract(1, 'days');
  endTime: momentNs.Moment = moment.utc();
  detectorId: string;

  ngOnInit() {
   // this._detectorControlService.setCustomStartEnd(this.startTime.format('YYYY-MM-DDTHH:mm'), this.endTime.format('YYYY-MM-DDTHH:mm'));
    console.log("try to get response");
    // this._diagnosticService.getDetector(this.detectorId, this._detectorControlService.startTimeString, this._detectorControlService.endTimeString).subscribe(response => {
    //   this.detectorResponse1 = response;
    //   });

      this._diagnosticService.getDetector(this.detectorId, this.startTime.format('YYYY-MM-DDTHH:mm'), this.endTime.format('YYYY-MM-DDTHH:mm')).subscribe(response => {
        this.detectorResponse = response;
        console.log("Response");
        console.log(this.detectorResponse);
        });
    };
//   this.detectorResponse.metadata.author = "Cindy";
 //   this.author = this.detectorResponse.metadata.author;
  // this.endTime = moment.tz('Etc/UTC');
  // this.endTime.startOf('minute').minute(this.endTime.minute() - this.endTime.minute() % 5);
  // this.startTime = this.endTime.clone().add(-1, 'days');
  

  constructor(private http: Http,  private _diagnosticService: DiagnosticService) {
    // this.getJSON('assets/invocationOutput.json').subscribe(data => {
    //   this.detectorResponse = data
    // }
    //   , error => {console.error("First Error"); console.error(error)});

    this.getJSON('assets/detectorSettings.json').subscribe(data => {
      this.startTime = data.StartTime,
      this.endTime = data.EndTime,
      this.detectorId = data.DetectorId,
      console.log(`StartTime: ${this.startTime}`);
      console.log(this.startTime);
      console.log(data);
      console.log(`StartTime: ${this.endTime}`);
     }
     , error => {console.error("Second Error"); console.error(error)});
  }

  public getJSON(path: string): Observable<any> {

    return this.http.get(path).pipe(map((res:any) =>
    {
      // if (res && res.json())
      // { 
      //   this.detectorResponse = res;
      // }
      return res.json();
    }));
   // return this.http.get(path).map((res:any) => res.json()).catch((error:any) => Observable.throw(error));
  //  return this.http.get('assets/invocationOutput.json').pipe(map((res:any) => res.json()), catchError(error => {console.log(error); return throwError(error)}));

  // const name = Rx.Observable
  // .getJSON<{ name: string }>("/api/employees/alice")
  // .map(employee => employee.name)
  // .catch(error => Rx.Observable.of(null));
  }

//   public getJSON1(): Observable<any> {
//     return this.http.get("./file.json")
//                     .map((res:any) => res.json())
//                     .catch((error:any) => console.log(error));

// }
}

export class TimeZones {
  public static readonly UTC: string = 'Etc/UTC';
}