import {
  getTestBed,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import {
    RouterTestingModule
} from '@angular/router/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "app/app-routing.module";


export const configureTests = (configure: (testBed: TestBed) => void) => {
  const testBed = getTestBed();

  if (testBed.platform == null) {
    testBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
  }

  testBed.configureCompiler({
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ]
    });

    testBed.configureTestingModule({
         imports: [FormsModule,BrowserModule,AppRoutingModule,HttpModule,RouterTestingModule]
            });

  configure(testBed);

  return testBed.compileComponents().then(() => testBed);
};