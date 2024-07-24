import {afterNextRender, AfterRenderPhase, Component} from '@angular/core';
import {loadRemoteModule} from "@angular-architects/module-federation";

@Component({
  selector: 'app-native-js',
  standalone: true,
  imports: [],
  templateUrl: './native-js.component.html',
  styleUrl: './native-js.component.scss'
})
export class NativeJsComponent {

  constructor() {
    afterNextRender(() => {
      const element = document.getElementById('native-js-content');

      if (element && !element.innerHTML.length) {
        loadRemoteModule({
          type: 'script',
          remoteEntry: "http://localhost:8082/remoteEntry.js",
          remoteName: "native_js_content",
          exposedModule: './native_js_content',
        })
          .catch(e => console.log(e))
      }
    }, {phase: AfterRenderPhase.Write});
  }
}
