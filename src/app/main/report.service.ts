import { Injectable } from "@angular/core";
import * as d3 from 'd3-3';
import { HttpClient } from "@angular/common/http";
import { Report } from "./report.model";
import { Subject } from "rxjs";
import {map} from 'rxjs/operators';
import { AuthService } from "../auth/auth/auth.service";


@Injectable()

export class ReportService {
  private report = new Report()  ;

backendUrl = 'http://localhost:3000/';
private reports: Report[];
 panelLoaded = new Subject();
 panelUnLoaded = new Subject();
private reportsChanged = new Subject<{reports: Report[]}>();
constructor(private http: HttpClient, private authService: AuthService) {

}

onFileSelect(event: Event) {
  const file =  (event.target as HTMLInputElement).files[0];
 //this.reportProp = file;
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (data1) => {
//const report.content = reader.result;
const csvJson = d3.csv.parse(reader.result);

this.report.content = csvJson;
this.assignReportProp(file);
  };
}

assignReportProp(file) {
  if(file.type) {
    this.report.fileTyp =  file.type;
  } else if(file.fileTyp) {
    this.report.fileTyp =  file.fileTyp;
}

if(file.lastModifiedDate) {
  this.report.lastModi = file.lastModifiedDate;
} else if(file.lastModi) {
  this.report.lastModi = file.lastModi;
}

this.report.name = file.name;


}



findReport(id){
const fetchedReport = this.reports.find(report => report.id === id);
this.report.content = fetchedReport.content;
//this.report.id = fetchedReport.id;
this.report.creator = fetchedReport.creator;
this.assignReportProp(fetchedReport);
}

getReportId() {
  if (this.report.id) {
    return this.report.id.slice();
  }  else {
    return '';
  }


}

getReportCSV() {
  return this.report.content;
}

getReportProp() {
  return this.assignReportProp(this.report);
}

getRepoName() {
  return this.report.name.slice();
}

createSummary() {
 let summary = {};

 // const project = Array.from(new Set([this.report.content].map((itemInArray) => itemInArray['Project'])));
const summary_project = d3.nest()
 .key(function(d) { return d.Project; })
 .entries(this.report.content);



const summary_proc = d3.nest()
 .key(function(d) { return d.Proc_code; })
 .entries(this.report.content);


 const summary_geoTyp = d3.nest()
 .key(function(d) { return d.Geo_typ; })
 .entries(this.report.content);
let total = 0;
summary_geoTyp.forEach(element => {
  total = total + element.values.length;
});
summary_geoTyp.push({key:'Total', values:{length: total}});
 const summary_STPOS1 = d3.nest()
 .key(function(d) { return d.STPOS1; })
 .entries(this.report.content);

 const summary_STPOS2 = d3.nest()
 .key(function(d) { return d.STPOS2; })
 .entries(this.report.content);

 const summary_STPOS3 = d3.nest()
 .key(function(d) { return d.STPOS3; })
 .entries(this.report.content);

 const summary_STPOS4 = d3.nest()
 .key(function(d) { return d.STPOS4; })
 .entries(this.report.content);

 summary = ({'fileName':this.report.name,'fileType':this.report.fileTyp,'lastModi':this.report.lastModi,
  'geoTyp': summary_geoTyp, 'project': summary_project, 'proc': summary_proc,
 'STPOS1': summary_STPOS1,'STPOS2': summary_STPOS2,'STPOS3': summary_STPOS3,'STPOS4': summary_STPOS4});

 const reportQuality = this.addReportQuality(summary);
summary['reportQuality'] = reportQuality;

 return summary;
}

ComputeSTPOSPercent(stpos) {
  let stposCount = 0;
  let STPOSLength = 0;
  stpos.forEach(element => {
    if (Number(element.key) < 0) {
stposCount = stposCount + element.values.length;
    }
    STPOSLength = STPOSLength + element.values.length;
  });
  const stposPerct =  ((stposCount / STPOSLength)) * 100;
  return Math.round(stposPerct * 100)/100;
}

addReportQuality(summary) {
  const reportQuality = {'quality': '', 'value': ''};
  let stpos1Count = 0;
  let STPOS1Length = 0;
 summary.STPOS1.forEach(element => {
    if (Number(element.key) < 0) {
stpos1Count = stpos1Count + element.values.length;
    }
    STPOS1Length = STPOS1Length + element.values.length;
  });
  let stpos3Count = 0;
  let STPOS3Length = 0;
  summary.STPOS3.forEach(element => {
    if (Number(element.key) < 0) {
      stpos3Count = stpos3Count + element.values.length;
    }
    STPOS3Length = STPOS3Length + element.values.length;
  });
  const stpos1Perct = 100 - ((stpos1Count / STPOS1Length)) * 100;
  const stpos3Perct = 100 - ((stpos3Count / STPOS3Length)) * 100;
  const errorPercent = (stpos1Perct + stpos3Perct) / 2;
  if (errorPercent <= 35) {
reportQuality.quality = 'poor';
reportQuality.value =  errorPercent.toString();
  } else if (errorPercent <= 65) {
    reportQuality.quality = 'medium';
    reportQuality.value =  errorPercent.toString();
  } else {
    reportQuality.quality = 'good';
    reportQuality.value =  errorPercent.toString();
  }

  return reportQuality;
}

getReportsChangedListener() {
 return this.reportsChanged.asObservable();
}

saveReport(reportName) {
const report = {
  'name' : reportName,
  'lastModi': this.report.lastModi,
  'fileTyp': this.report.fileTyp,
  'content' : this.report.content
};
console.log(report);
 return this.http.post<{message: string, id: string}>(this.backendUrl + 'api/report/save', report);

}

updateReport(reportName, reportId) {
  const report = {
    'id': reportId,
    'name' : reportName,
    'lastModi': this.report.lastModi,
    'fileTyp': this.report.fileTyp,
    'content' : this.report.content
  };

   return this.http.put<{message: string}>(this.backendUrl + 'api/report/'+ reportId, report);

}

fetchReports() {
  this.http.get<{message: string, reports: any}>(this.backendUrl + 'api/report/fetch')
  .pipe(map((reportData)  => {
    return {
   reports: reportData.reports.map(
     reportRecieved => {
return {
 name : reportRecieved.name,
 lastModi: reportRecieved.lastModi,
 fileTyp: reportRecieved.fileTyp,
 content : reportRecieved.content,
 id : reportRecieved._id,
 creator: reportRecieved.creator
};
      })
     };
  }))
  .subscribe(
     (FetchedData) => {
       console.log(FetchedData);

    FetchedData.reports.forEach(function(v) { delete v._id; });
    this.reports = FetchedData.reports;
       this.reportsChanged.next({reports: this.reports});
     }, error => {
       console.log(error);
     }
   );
}

deleteReports(ids: string) {
console.log(ids);
return this.http.delete(this.backendUrl + 'api/report/delete/' + ids);
}



}
