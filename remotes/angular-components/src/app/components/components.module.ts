import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component1Component } from "./component1/component1.component";
import { Component2Component } from "./component2/component2.component";
import { Component3Component } from "./component3/component3.component";

const COMPONENTS = [
  Component1Component,
  Component2Component,
  Component3Component
]

@NgModule({
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
