import { Component, OnInit } from '@angular/core';
import { Report } from '../report.model';
import { ReportService } from '../report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
//reports: Report[];
reportList;
title;
message;
delDialog = false;
loader = false;
  constructor(private reportService: ReportService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
this.loader = true;
this.reportList = [];
    this.reportService.fetchReports();
    this.reportService.getReportsChangedListener().subscribe(
      ({reports: reportList}) => {
        this.reportList = [];
        if (reportList) {
this.loader = false;
        }
        for (const report of reportList) {
          this.reportList.push({'id': report.id, 'name': report.name, 'state' : false});
        }

      }
    );
    $('#reportList').DataTable({
      'columnDefs': [
        { 'width': '5%', 'targets': 0 }
      ],
      scrollY:        '56vh',
      paging:         false,
      'searching': false,
      'bInfo' : false,
      'ordering': false
    });
  }

  onFileUpload(event: Event) {
    this.reportService.onFileSelect(event);
      }

      reportSubmitted(form: NgForm) {
        this.router.navigate(['/main/report/summary'], {relativeTo: this.activatedRouter});
      //  this.router.navigate(['main/report', {outlets: {primary: ['SummaryComponent'],
       // secondchild: ['SidepanelComponent']}}]);
      }


  selectAll(event: Event) {

    for (let i = 0; i < this.reportList.length; i++ ) {
  this.reportList[i].state = (event.target as HTMLInputElement).checked;
       }
  }

  onDeleteClicked() {
    this.delDialog = true;
this.title = '';
    this.message = 'Are you sure You want to Delete the selected Reports ?';

  }

  onVisualize() {
    let reportId;
    for (let i = 0; i < this.reportList.length; i++ ) {
      if(this.reportList[i].state === true) {
reportId = this.reportList[i].id;
      }

    }
    this.reportService.findReport(reportId);
      this.router.navigate(['/main/report/summary']);


  }

  isDelDis(){
    let count = 0;
    for (let i = 0; i < this.reportList.length; i++ ) {
    if(this.reportList[i].state === true) {
      count ++;
    }
       }
       if(count === 0) {
         return true;
       }
       else
       {
        return false;
       }

  }

  isVislizeDis(){
    let count = 0;
    for (let i = 0; i < this.reportList.length; i++ ) {
    if(this.reportList[i].state === true) {
      count ++;
      if(count > 1)
      {
        return true;
      }
    }
       }
   if(count === 1) {
         return false;
       }
       else
       {
        return true;
       }

  }

  onOk(event:Event) {
    let reportIds = '';
    for (let i = 0; i < this.reportList.length; i++ ) {
      if(this.reportList[i].state === true) {
        reportIds = reportIds + this.reportList[i].id + ':';
      }

       }
       reportIds = reportIds.replace(/^(.*?):*$/, '$1');
       this.reportService.deleteReports(reportIds).subscribe(
        (response) => {
          console.log(response);
          this.reportService.fetchReports();

        }
      );

  }

}
