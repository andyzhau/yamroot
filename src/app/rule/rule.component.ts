import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Rule } from '../model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css'],
})
export class RuleComponent implements OnInit {
  rule: Rule;
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async param => {
      if (param.ruleId == null) {
        return;
      }
      if (param.ruleId !== 'new') {
        this.httpClient
          .get(environment.apiHost + '/rules/' + param.ruleId)
          .subscribe((rule: Rule) => {
            this.rule = rule;
          });
      } else {
        this.rule = {
          name: '',
          priority: 0,
          enabled: false,
          match: `// (options, ctx, lib) => boolean\n`,
          pre: `// (options, ctx, lib) => void\n`,
          post: `// (ctx, options, lib) => void\n`,
        };
      }
    });
  }

  async save() {
    delete this.rule.createdAt;
    console.log(this.rule);
    const suffix = this.rule._id ? '/' + this.rule._id : '';
    this.httpClient
      .post(environment.apiHost + '/rules' + suffix, this.rule)
      .subscribe((rule: Rule) => {
        this.rule = rule;
        this.snackBar.open('Saved', '', { duration: 2000 });
      });
  }
}
