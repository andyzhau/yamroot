import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Rule } from '../model';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
})
export class RulesComponent implements OnInit {
  rules: Rule[];

  constructor(private httpClient: HttpClient) {}

  async ngOnInit() {
    this.httpClient
      .get(environment.apiHost + '/rules')
      .subscribe((rules: Rule[]) => {
        this.rules = _.sortBy(rules, 'priority').reverse();
      });
  }
}
