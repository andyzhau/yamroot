import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NgModule } from '@angular/core';
import { RuleComponent } from './rule/rule.component';
import { RulesComponent } from './rules/rules.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rules', component: RulesComponent, pathMatch: 'full' },
  { path: 'rules/:ruleId', component: RuleComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, RulesComponent, RuleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    MonacoEditorModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
