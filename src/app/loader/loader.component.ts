import { Component, OnInit, OnDestroy } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit,OnDestroy {

  constructor() { }

  ngOnInit() {
    document.getElementById('modalLauncher').click();
  }

  ngOnDestroy() {
   // $('#basicExampleModal').modal('hide');
   $('.modal-backdrop').remove();
   $('#basicExampleModal').remove();
   $('body').css({paddingRight: '0'});
  }

}
