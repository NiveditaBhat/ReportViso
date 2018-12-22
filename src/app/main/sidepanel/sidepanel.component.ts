import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth/auth.service';
import { Subject } from 'rxjs';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent implements OnInit,OnDestroy {
  @Input() isAuthenticated ;
  @Output() reportClicked = new EventEmitter();

  constructor(private authService: AuthService, private reportService: ReportService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getAuthStatus();
this.reportService.panelLoaded.next();
  }

  ngOnDestroy() {
    this.reportService.panelUnLoaded.next();
  }

  onSaveReportClicked() {
this.reportClicked.emit();
  }

}
