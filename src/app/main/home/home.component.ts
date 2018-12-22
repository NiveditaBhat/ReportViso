import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { NgForm, Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth/auth.service';
import { ReportService } from '../report.service';
declare const jquery: any;
declare const $: any;
import * as Chart from 'chart.js';
import { Report } from '../report.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
reportList ;
selected;
public context: CanvasRenderingContext2D;
@ViewChild('myChart1') myCanvas: ElementRef;
@ViewChild('myChart2') lineGraph: ElementRef;
  constructor(private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute,
    private reportService: ReportService) { }
loader = false;
reportQual = {'poor': 0, 'medium': 0, 'good': 0};
currTime;
  ngOnInit() {
const currentTime = new Date();
 this.currTime = currentTime.toLocaleTimeString();
this.loader = true;
    this.selected = '';
    this.reportList = [];
    this.reportList = this.reportService.fetchReports();

    this.reportService.getReportsChangedListener().subscribe(
      ({reports: reportList}) => {
       this.reportList = reportList;


       if (reportList) {
        this.loader = false;

     reportList.forEach((report) => {

  this.reportQual[report.quality] = + this.reportQual[report.quality] + 1;

        });
        console.log(this.reportQual);
        const pieData = [this.reportQual['poor'], this.reportQual['medium'], this.reportQual['good']];
        this.drawPieChart(this.myCanvas.nativeElement, pieData);

                }


       this.selected = '';
      } );

      recentActivity();
      function recentActivity() {

     $('#reports').DataTable({
          'columnDefs': [
            { 'width': '5%', 'targets': 0 }
          ],
          paging:         false,
          'searching': false,
          'bInfo' : false,
          'ordering': false
        });

      }

  }

  ngAfterViewInit() {
drawLineGraph(this.lineGraph.nativeElement);





function drawLineGraph(canvas) {
const context = (<HTMLCanvasElement>canvas).getContext('2d');
  const speedData = {
    labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
    datasets: [{
      label: 'Your Visits',
      data: [0, 59, 75, 20, 20, 55, 40],
    }]
  };

  const myChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [{
            label: 'Data',
            borderColor: 'grey',
            pointBorderColor: 'blue',
            pointBackgroundColor: 'blue',
            pointHoverBackgroundColor: 'blue',
            pointHoverBorderColor: 'blue',
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            fill: false,
            borderWidth: 1,
            data: [100, 120, 150, 170, 180, 170, 160]
        }]
    },
    options: {
      responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: ['User Activity'],
            fontColor: '#343a40',
            fontSize: 17
        },
        legend: {
            position: 'bottom'
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: 'rgba(0,0,0,0.5)',
                    fontStyle: 'bold',
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 20
                },
                gridLines: {
                    drawTicks: false,
                    display: false
                }
}],
            xAxes: [{
                gridLines: {
                    zeroLineColor: 'transparent'
},
                ticks: {
                    padding: 20,
                    fontColor: 'rgba(0,0,0,0.5)',
                    fontStyle: 'bold'
                }
            }]
        }
    }
});

}



  }

 drawPieChart(canvas,data) {
    const context = (<HTMLCanvasElement>canvas).getContext('2d');


        const myChart = new Chart(context, {
            type: 'pie',
            data: {
                labels: ['Poor', 'Medium', 'Good'],

                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: [
                        '#FF9999',
                        '#FFFF99',
                        '#B2FF66'
                    ],
                    borderColor: [
                      'red',
                      'orange',
                      'green'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: ['Report Quality Analysis', '(Total no. Of Reports vs Quality)'],
                fontSize: 13
            },
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



  onMainSubmitted(myForm: NgForm) {
    console.log(myForm);
if(myForm.form.value.visualize === 'new') {
  this.selected = 'new';
}
else if(myForm.form.value.visualize === 'old')
{
  this.router.navigate(['/main/reportList']);
}
  }

}
