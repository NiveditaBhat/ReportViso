import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
reportName ;
reportId;
title: string ;
saveDialog = false;
message: string;
textbox = false;


  constructor(private activatedRoute: ActivatedRoute, private reportService: ReportService,private router:Router) { }

  ngOnInit() {
//const reportProp = this.reportService.getReportProp();
this.reportName = this.reportService.getRepoName();

  }

  onCancel() {
    this.router.navigate(['/main/reportList']);
  }

  OnSaveClicked() {
    this.title = 'Please choose a suitable name for the report';
this.message = this.reportName;
this.textbox = true;
this.saveDialog = true;
  }

  onReportSave(reportName: String) {
//this.loader = true;
this.reportId = '';
 this.reportId = this.reportService.getReportId();
 if(this.reportId) {
  this.reportService.updateReport(reportName, this.reportId).subscribe(
    responseData => {
      console.log(responseData);
      this.title = 'Report renamed Successfully!';
      this.message = 'Please find it under "Reports" section';
      this.textbox = false;
    },
    error => {
      this.textbox = false;
      this.title = 'Report renaming Failed!';
      this.message = 'Please try again';

    }
  );
 }
 else {

    this.reportService.saveReport(reportName).subscribe(responseData => {
      console.log(responseData);
      this.title = 'Report Saved Successfully!';
      this.message = 'Please find it under "Reports" section';
    this.textbox = false;
      }, error => {
        this.textbox = false;
        this.title = 'Report Saving Failed!';
        this.message = 'A Report with the same name already exists.Please try again with a different name';
      });
 }


  }

  onOk() {
    this.saveDialog = false;
    console.log('save');
  }
}
