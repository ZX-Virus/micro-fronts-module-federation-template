import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { loadRemoteModule } from "@angular-architects/module-federation";
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import {NativeJsComponent} from "./components/native-js/native-js.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'angular_content',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      exposedModule: "./ContentModule",
    })
      .then(m => m.ContentModule)
      .catch(e => console.log(e))
  },
  {
    path: 'vue_content',
    component: WebComponentWrapper,
    data: {
      remoteEntry: `http://localhost:3002/remoteEntry.js`,
      remoteName: 'vue_content',
      exposedModule: './MFVueContent',
      elementName: 'mf-vue-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'react_content',
    component: WebComponentWrapper,
    data: {
      remoteEntry: `http://localhost:3001/remoteEntry.js`,
      remoteName: 'react_content',
      exposedModule: './MFReactContent',
      elementName: 'mf-react-element',
    } as WebComponentWrapperOptions,
  },

  {path: 'native_js_content', component: NativeJsComponent},
];
