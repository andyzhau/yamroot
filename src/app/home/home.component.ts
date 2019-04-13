import * as _ from 'underscore';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  te: string;
  request: string;
  ads: Ad[] = [];

  @ViewChild('if') iframe: ElementRef;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.te = param.te;
      this.request = param.request;
      if (this.te && this.request) {
        this.init();
      }
    });
  }

  async init() {
    interval(5000)
      .pipe(startWith(null))
      .subscribe(() => {
        this.sendConnection();
      });

    this.httpClient.get(environment.apiHost + '/trackings/ads', {
      params: {
        te: this.te,
        request: this.request,
      },
    }).subscribe((ads: any) => {
      this.ads = ads;
      for (const ad of this.ads) {
        ad.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(ad.url);
        if (ad.redirect) {
          window.location.href = ad.url;
        }

        _.delay(() => {
          if (this.iframe) {
            try {
              document.domain = 'yizhenzhao.blogspot.com';
              console.log(this.iframe.nativeElement.contentWindow.init);
            } catch (e) {
              /* handle error */
              console.log(e)
            }
          }
        }, 1000);
      }
    });
  }

  sendConnection() {
    this.httpClient
      .get(environment.apiHost + '/trackings/connections', {
        params: {
          te: this.te,
          request: this.request,
        },
      })
      .subscribe(resp => {});
  }
}

export interface Ad {
  url: string;
  redirect: boolean;
  iframe: boolean;
  safeUrl: SafeUrl;
}
