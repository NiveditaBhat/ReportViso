import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report.service';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-detailed-table',
  templateUrl: './detailed-table.component.html',
  styleUrls: ['./detailed-table.component.css']
})
export class DetailedTableComponent implements OnInit {

  constructor(private reportService: ReportService) { }

  ngOnInit() {
   this.addDetailTable();

  }

  addDetailTable() {
    const jsonString = this.reportService.getReportCSV();
      $('#detailTable').DataTable( {
        'scrollX': true,
        'scrollY': '45vh',
        'data': jsonString,
        'columns': [
            { 'data': 'JEID', 'title': 'JEID' },
            { 'data': 'Project', 'title': 'Project' },
            { 'data': 'Geo_typ', 'title': 'Geo_typ' },
            { 'data': 'x', 'title': 'Pos_X' },
            { 'data': 'y', 'title': 'Pos_Y' },
            { 'data': 'z', 'title': 'Pos_Z' },
            { 'data': 'Proc_code', 'title': 'Proc_code' },
            { 'data': 'Norm', 'title': 'Norm' },
            { 'data': 'STPOS1', 'title': 'STPOS1' },
            { 'data': 'STPOS2', 'title': 'STPOS2' },
            { 'data': 'STPOS3', 'title': 'STPOS3' },
            { 'data': 'STPOS4', 'title': 'STPOS4' }
        ]
    } );
  }

}
