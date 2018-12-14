import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from '../auth/auth/auth.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

}
