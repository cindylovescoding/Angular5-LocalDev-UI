import { Injectable } from '@angular/core';
import { DetectorResponse, DetectorMetaData } from 'diagnostic-data';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
//import { AuthService } from './auth.service';
import { map, catchError, share, mergeMap} from 'rxjs/operators';
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/mergeMap'


@Injectable()
export class DiagnosticapiService {
  // public readonly localDiagnosticApi: string = "http://localhost:5000/";
  public readonly localDiagnosticApi: string = "http://localhost:58730/";
  public readonly stagingDiagnosticApi: string = "https://applens-staging.azurewebsites.net/";
  public readonly diagnosticApi: string = "https://applens.azurewebsites.net/";
  public readonly agentApi: string = "https://applensagent20181007033616.azurewebsites.net/";

  detectorSettings: Observable<any>;
  private version: string;
  private resourceId: string;
  private accessToken: string;
  private detectorId: string;
  constructor(private _http: Http) { 
    this.detectorSettings = this.getJSON().share();
  }

  private getJSON(): Observable<any> {
     return this._http.get('assets/detectorSettings.json').map((res:any) => res.json()).catch(error => {console.log(error); return Observable.throw(error)});
   }

  private _getTimeQueryParameters(startTime: string, endTime: string) {
    // let format = 'YYYY-MM-DDTHH:mm'
    // return `&startTime=${this._detectorControlService.startTime.format(format)}&endTime=${this._detectorControlService.endTime.format(format)}`;
    return `&startTime=${startTime}&endTime=${endTime}`;
  }

  getDetector(detector: string, startTime: string, endTime: string, refresh: boolean = false, internalView: boolean = true): Observable<DetectorResponse> {
    var body;
    let timeParameters = this._getTimeQueryParameters(startTime, endTime);
    let path = `${this.version}${this.resourceId}/detectors/${detector}?${timeParameters}`;
    console.log("**************Diagnostic service details****************");


      return this.detectorSettings.mergeMap(data => {
        this.version = data.Version;
        this.resourceId = data.ResourceId;
        this.accessToken = data.Token;
        let path = `${data.Version}${data.ResourceId}/detectors/${data.DetectorId}?&startTime=${data.StartTime}&endTime=${data.EndTime}`;
        console.log(path);
        return this.invoke<DetectorResponse>(data.Token, path, 'POST', body, true, refresh, internalView);
      }
      );
  }

  public getDetectors(): Observable<DetectorMetaData[]> {
      var body;
      return this.detectorSettings.mergeMap(data => {
        this.version = data.Version;
        this.resourceId = data.ResourceId;
        this.accessToken = data.Token;
        let path = `${data.Version}${data.ResourceId}/detectors?&startTime=${data.StartTime}&endTime=${data.EndTime}`;
        return this.invoke<DetectorResponse[]>(data.Token, path, 'POST', body).map(response => response.map(detector => detector.metadata));
      }
    )
  }

  public invoke<T>(token: string, path: string, method: string = 'GET', body: any = {}, useCache: boolean = true, invalidateCache: boolean = false, internalView: boolean = true): Observable<T> {
    var url: string = `${this.agentApi}api/invoke`

    let request = this._http.post(url, body, {
      headers: this._getHeaders(token, path, method, internalView),
      withCredentials: true
    })
      .map((response: Response) => <T>(response.json()));

    return request;
  }

    // headers.append('Authorization', `Bearer ${this._authService.accessToken}`);
  private _getHeaders(token?: string, path?: string, method: string = 'GET', internalView: boolean = true): Headers {
    var headers = new Headers();
   headers.append('Content-Type', 'application/json');
   // headers.append('Content-Type', 'text/plain');
    headers.append('Accept', 'application/json');
   headers.append('Authorization', String(token));
    headers.append('x-ms-internal-client', String(true));
    headers.append('x-ms-internal-view', String(internalView));
    if (path) {
      headers.append('x-ms-path-query', path);
    } 

    if (method) {
      headers.append('x-ms-method', method);
    }

    return headers;
  }
}
