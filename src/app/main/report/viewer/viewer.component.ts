import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
declare var jquery: any;
declare var $: any;
import * as d3 from 'd3-3';
import { ReportService } from '../../report.service';
import * as dat from 'dat.gui';
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewerComponent implements OnInit {
  @Input() id;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    if (this.id) {
      this.reportService.findReport(this.id);
    }
    this.CreateViewer();
    this.CreateGuiPanel();
  }

  CreateViewer() {



    const data = this.reportService.getReportCSV();

    const margin = { top: 35, right: 35, bottom: 35, left: 35 },
      width = 600 * 1.5 - margin.left - margin.right,
      height = 270 * 1.6 - margin.top - margin.bottom;
    // Parse the date / time


    // Set the ranges
    const x = d3.scale.linear()
      .domain(
        [
          d3.min([0, d3.min(data, function (d) { return d.x; })]),
          d3.max([0, d3.max(data, function (d) { return d.x; })])
        ])
      .range([0, width]);
    const y = d3.scale.linear()
      .domain([
        d3.min([0, d3.min(data, function (d) { return d.y; })]),
        d3.max([0, d3.max(data, function (d) { return d.y; })])
      ])
      .range([height, 0]);

    // Define the axes
    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .innerTickSize(-height)
      .outerTickSize(0)
      .tickPadding(5);

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(5);



    // Define the line
    const line = d3.svg.line()
      .x(function (d) { return x(d.x); })
      .y(function (d) { return y(d.y); });
    const viewer = '#viewer';
    // Adds the svg canvas
    const svg = d3.select(viewer).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    /*  svg.append('rect')
    .attr('x', -(margin.left ))
    .attr('y', -28)
    .attr('width',  width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('fill', '#EFF9FF')
    .style('stroke-width', '1');*/

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // Define the div for the tooltip
    const div = d3.select(viewer).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);




    // text label for the y axis


    data.forEach(function (d) {
      d.x = +d.x;
      d.y = +d.y;
    });



    // Add the valueline path.
    const circles = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle');

    const circleAttributes = circles
      .attr('class', 'weldPoints')
      .attr('cx', function (d) { return x(d.x); })
      .attr('cy', function (d) { return y(d.y); })
      .attr('r', function (d) { return 2.5; })
      .attr('project', function (d) { return d.Project; })
      .attr('proc', function (d) { return d.Proc_code; })
      .attr('norm', function (d) { return d.Norm; })
      .attr('stpos1', function (d) { return d.STPOS1; })
      .attr('stpos2', function (d) { return d.STPOS2; })
      .attr('stpos3', function (d) { return d.STPOS3; })
      .attr('stpos4', function (d) { return d.STPOS4; })
      .style('fill', function (d) { return 'blue'; })
      .on('mouseover', function (d) {
        div.transition()
          .duration(200)
          .style('opacity', .9);
        div.html('<html><table cellspacing="7" cellpadding="4" style="font-size:12px">' +
          '<tr><td align="left"><b>JEID</b></td><td align="left">' + d.JEID +
          '</td></tr><tr><td align="left"><b>Project</b></td><td align="left">' + d.Project +
          '</td></tr><tr><td align="left"><b>X</b></td><td align="left">' + d.x +
          '</td></tr><tr><td align="left"><b>Y</b></td><td align="left">' + d.y +
          '</td></tr><tr><td align="left"><b>Proc_Code</b></td><td align="left">' + d.Proc_code +
          '</td></tr><tr><td align="left"><b>Norm</b></td><td align="left">' + d.Norm +
          '</td></tr><tr><td align="left"><b>STPOS1</b></td><td align="left">' + d.STPOS1 +
          '</td></tr><tr><td align="left"><b>STPOS2</b></td><td align="left">' + d.STPOS2 +
          '</td></tr><tr><td align="left"><b>STPOS3</b></td><td align="left">' + d.STPOS3 +
          '</td></tr><tr><td align="left"><b>STPOS4</b></td><td align="left">' + d.STPOS4 +
          '</td></tr></table></html>')
          .style('left', Number(d3.select(this).attr('cx')) + 10 + 'px')
          .style('top', Number(d3.select(this).attr('cy')) + 50 + 'px');
      })
      .on('mouseout', function (d) {
        div.transition()
          .duration(500)
          .style('opacity', 0);
      });




  }


  CreateGuiPanel() {
    const text = {
      size: 2.5,
      pointColor: '#808080',
      project: 'Choose',
      pc: 'Choose',
      norm: 'Choose',
      stpos: false,
      reset: function() {
        d3.selectAll('.weldPoints').style('fill', 'grey');
        d3.selectAll('.weldPoints').attr('r', '2.5');
      }
    };
    const gui = new dat.GUI({ autoPlace: false });
    $('#gui').append($(gui.domElement));
    const f1 = gui.addFolder('Weld Point');
    const weldColor = f1.addColor(text, 'pointColor').name('Color').listen();
    const weldSize = f1.add(text, 'size').min(2).max(6).step(0.25).name('Size');

    f1.open();
    const f2 = gui.addFolder('Filter by Weld Features');
    const projectControl = f2.add(text, 'project', ['Choose', 'car', 'van', 'pkw']).name('Project');
    const procCodeControl = f2.add(text, 'pc', ['Choose', '21', '23', '71', '66']).name('Procedure Code');
    const normControl = f2.add(text, 'norm', ['Choose', '+x', '-x', '+y', '-y']).name('Norm');
    const stposControl = f2.add(text, 'stpos').name('Show/Hide STPOS Errors');
    f2.add(text, 'reset').name('Reset');
    f2.open();


    weldColor.onChange(
      function (newValue) {
        d3.selectAll('.weldPoints').style('fill', newValue);
      });
    weldSize.onChange(
      function (newValue) {
        d3.selectAll('.weldPoints').attr('r', newValue);
      });

    projectControl.onChange(
      function (newValue) {
        d3.selectAll('.weldPoints').style('fill', 'grey');
        d3.selectAll('.weldPoints').attr('r', '2.5');
        d3.selectAll('.weldPoints')
        .filter(function(d, i) {
          if (d['Project'] === newValue) {
            return d;
          }
        })
        .style('fill', 'red')
        .attr('r', '3.5');
      });

      procCodeControl.onChange(
        function (newValue) {
          d3.selectAll('.weldPoints').style('fill', 'grey');
          d3.selectAll('.weldPoints').attr('r', '2.5');
          d3.selectAll('.weldPoints')
          .filter(function(d, i) {
            if (d['Proc_code'] === newValue) {
              return d;
            }
          })
          .style('fill', 'red')
          .attr('r', '3.5');
        });

        normControl.onChange(
          function (newValue) {
            d3.selectAll('.weldPoints').style('fill', 'grey');
            d3.selectAll('.weldPoints').attr('r', '2.5');
            d3.selectAll('.weldPoints')
            .filter(function(d, i) {
              if (d['Norm'] === newValue) {
                return d;
              }
            })
            .style('fill', 'red')
            .attr('r', '3.5');
          });

          stposControl.onChange(
            function (newValue) {
              d3.selectAll('.weldPoints').style('fill', 'grey');
              d3.selectAll('.weldPoints').attr('r', '2.5');
              d3.selectAll('.weldPoints')
              .filter(function(d, i) {
                if (newValue){
                if ((d['STPOS1'] < 0) || (d['STPOS2'] < 0) || (d['STPOS3'] < 0) || (d['STPOS4'] < 0) ) {
                  return d;
                }
              }
              })
              .style('fill', 'red')
              .attr('r', '3.5');
            });



  }

}

