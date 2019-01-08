import { Component, OnInit } from '@angular/core';
import { Router , NavigationEnd } from '@angular/router';
declare const jquery: any;
declare const $: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {



    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}); }
        }
      }
    });
  }

signupForm() {
this.router.navigate(['/auth/signup']);
}

}
