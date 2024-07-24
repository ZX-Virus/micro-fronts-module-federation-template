import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { loadRemoteModule } from "@angular-architects/module-federation";
import { IMobXStore } from "../../../remotes/mobx-store/shared/inaterfaces/mobx-store.interface";
import { Container } from 'inversify';
import { INJECTORS } from '../../../remotes/mobx-store/shared/constants/INJECTORS';
import { MobxAngularModule } from "mobx-angular";


@Component({
  selector:'app-root',
  standalone:true,
  imports:[
    RouterOutlet,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatButton,
    RouterLink,
    MobxAngularModule,
  ],
  templateUrl:'./app.component.html',
  styleUrl:'./app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('component1', { read: ViewContainerRef, static: true })
  component1!: ViewContainerRef;
  @ViewChild('component2', { read: ViewContainerRef, static: true })
  component2!: ViewContainerRef;
  @ViewChild('component3', { read: ViewContainerRef, static: true })
  component3!: ViewContainerRef;

  title = 'shell-app';
  store!: IMobXStore;

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
  ) {
    loadRemoteModule({
      remoteEntry:'http://localhost:8081/remoteEntry.js',
      remoteName:'mobx_store',
      exposedModule:'./mobx_store',
      type:'script',
    }).then((module) => {
      const container = module.default as Container;
      if (container) {
        this.store = container.get<IMobXStore>(INJECTORS.MOBX_STORE);
      }
    }).catch((err) => {
      console.error('Failed to load remote module:', err);
    });
  }

  ngAfterViewInit() {
    this.loadAndCreateComponent(this.component1, 'component1', 'Component1Component');
    this.loadAndCreateComponent(this.component2, 'component2', 'Component2Component');
    this.loadAndCreateComponent(this.component3, 'component3', 'Component3Component');
  }

  loadAndCreateComponent(viewChild: ViewContainerRef, exposedModule: string, componentName: string) {
    loadRemoteModule({
      remoteEntry: "http://localhost:4202/remoteEntry.js",
      exposedModule: `./${exposedModule}`,
      type:'module',
    })
      .then(module => {
        const factory = this.resolver.resolveComponentFactory(module[componentName]);
        viewChild?.createComponent(factory, undefined, this.injector);
      })
      .catch(e => console.log(e))
  }
}
