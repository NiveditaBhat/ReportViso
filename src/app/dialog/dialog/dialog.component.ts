import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportService } from '../../main/report.service';
import { Report } from '../../main/report.model';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() message;
  @Input() title;
  @Input() textbox;
  @Input() upload;
  @Output() reportSave = new EventEmitter<string>();
  @Output() newReportSubmitted = new EventEmitter();
  @Output() okClicked = new EventEmitter<void>();
  loader = false;
 // @ViewChild('reportName') reportName: ElementRef;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    document.getElementById('modalLauncher').click();
  }

  ngOnDestroy() {
    $('.modal-backdrop').remove();

  }

  onOkClicked() {
    this.okClicked.emit();
  }

  onSaveReport(form: NgForm) {
    this.reportSave.emit(form.form.value.reportName);


  }


  onFileUpload(event: Event) {
    this.reportService.onFileSelect(event);
      }


  reportSubmittedClicked(form:NgForm) {
this.newReportSubmitted.emit();
  }
}
