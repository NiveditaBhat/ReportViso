import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportService } from '../../main/report.service';
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
  @Output() reportSave = new EventEmitter<string>();
  @Output() okClicked = new EventEmitter<void>();
  loader = false;
 // @ViewChild('reportName') reportName: ElementRef;

  constructor() { }

  ngOnInit() {
    document.getElementById('modalLauncher').click();
  }

  ngOnDestroy() {
    $('#basicExampleModal').remove();
  }

  onOkClicked() {
    this.okClicked.emit();
  }

  onSaveReport(form: NgForm) {
    this.reportSave.emit(form.form.value.reportName);


  }
}
