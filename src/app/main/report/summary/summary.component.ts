import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '../../report.service';
import { ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;
import * as Chart from 'chart.js';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

summary ;
stpos = {};
@ViewChild('quality') qualityMeter: ElementRef;
  constructor(private reportService: ReportService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


this.summary = this.reportService.createSummary();
this.stpos['stpos1'] = this.reportService.ComputeSTPOSPercent(this.summary.STPOS1);
this.stpos['stpos2'] = this.reportService.ComputeSTPOSPercent(this.summary.STPOS2);
this.stpos['stpos3'] = this.reportService.ComputeSTPOSPercent(this.summary.STPOS3);
this.stpos['stpos4'] = this.reportService.ComputeSTPOSPercent(this.summary.STPOS4);
QualityMeter(this.qualityMeter.nativeElement, this.summary);

console.log(this.summary);


$('#summary').DataTable({
 'columnDefs': [
    {'width': '20%', 'targets': 0 }
  ],
  'scrollX': true,
  scrollCollapse: true,
  paging:         false,
  'searching': false,
  'bInfo' : false,
  'ordering': false
});



  }

}

function QualityMeter(canvas, summary) {
let bgColor = [];
let qualityMeterData = [];
let reportLabels = [];
  const context = (<HTMLCanvasElement>canvas).getContext('2d');
if (summary.reportQuality.quality === 'poor') {
 bgColor =  ['#FF9999', '#D3D3D3' ];
 reportLabels = ['Poor','None'];
} else if (summary.reportQuality.quality === 'medium') {
  bgColor =  ['Orange', '#D3D3D3' ];
  reportLabels = ['Medium','None'];
} else if (summary.reportQuality.quality === 'good') {
  bgColor =  ['#B2FF66', '#D3D3D3' ];
  reportLabels = ['Good','None'];
}
qualityMeterData = [summary.reportQuality.value, 100 - Number(summary.reportQuality.value)];

      const myChart = new Chart(context, {
          type: 'doughnut',
          data: {
              datasets: [{

                  data: qualityMeterData,
                  backgroundColor: bgColor
              }]
          },
          options: {
            events : [],
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            responsive: true,
            maintainAspectRatio: false,

              scales: {
                  yAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false
                    },
                      ticks: {
                          beginAtZero: true,
                          display: false
                      }
                  }],
                  xAxes: [{
                    gridLines: {
                      drawBorder: false,
                      display: false,
                    },
                     ticks: {
                          beginAtZero: true,
                          display: false
                      }
                  }]
              }
          }
      });
    }


