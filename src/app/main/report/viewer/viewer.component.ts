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
  encapsulation:ViewEncapsulation.None
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

    const margin = {top: 35, right: 35, bottom: 35, left: 35},
    width = 600 * 1.5 - margin.left - margin.right,
    height = 270 * 1.6 - margin.top - margin.bottom;
// Parse the date / time


// Set the ranges
const x =  d3.scale.linear()
.domain(
  [
    d3.min([0, d3.min(data, function (d) { return d.x; })]),
    d3.max([0, d3.max(data, function (d) { return d.x; })])
    ])
.range([0, width]);
const y =  d3.scale.linear()
.domain( [
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
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });
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


            data.forEach(function(d) {
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
                               .style('fill', function(d) { return 'blue'; })
                               .on('mouseover', function(d) {
                                div.transition()
                                    .duration(200)
                                    .style('opacity', .9);
                                div	.html('<html><table cellspacing="7" cellpadding="4">'+
                                '<tr><td align="left"><b>JEID</b></td><td align="left">'+d.JEID+
                                '</td></tr><tr><td align="left"><b>Project</b></td><td align="left">'+d.Project+
                                '</td></tr><tr><td align="left"><b>X</b></td><td align="left">'+d.x+
                                '</td></tr><tr><td align="left"><b>Y</b></td><td align="left">'+d.y+
                                '</td></tr></table></html>')
                                    .style('left', Number(d3.select(this).attr('cx'))+30 + 'px')
                                    .style('top', Number( d3.select(this).attr('cy')) +50+ 'px');
                                })
                            .on('mouseout', function(d) {
                                div.transition()
                                    .duration(500)
                                    .style('opacity', 0);
                            }) ;




              }


              CreateGuiPanel() {
                const text = {
                  size : 2.5,
                 pointColor : '#FFFFFF',
                 project: 'car',
                 pc : '21',
                 norm: '+x',
                 stpos: false,
                 reset: false
                };
                const gui = new dat.GUI({autoPlace: false });
             $('#gui').append($(gui.domElement));
               const f1 = gui.addFolder('Weld Point');
              const weldColor = f1.addColor(text, 'pointColor').name('Color').listen();
               const weldSize =  f1.add(text, 'size').min(2).max(6).step(0.25).name('Size');

                f1.open();
                const f2 = gui.addFolder('Filter by Weld Features');
                f2.add(text, 'project', [ 'car', 'van', 'pkw' ] ).name('Project');
                f2.add(text, 'pc', [ '21', 'van', 'pkw' ] ).name('Procedure Code');
                f2.add(text, 'norm', [ '+x', '-x', '+y', '-y' ] ).name('Norm');
                f2.add(text, 'stpos').name('STPOS Errors');
                f2.add(text, 'reset').name('Reset');
                f2.open();


                weldColor.onChange(
                  function(newValue) {
                    d3.selectAll('.weldPoints').style('fill', newValue);
           });
           weldSize.onChange(
            function(newValue) {
              d3.selectAll('.weldPoints').attr('r', newValue);
     });
              }

  }

