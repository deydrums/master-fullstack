import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  var btns = document.querySelectorAll(".btnc");
  console.log(btns.length);
for (const key in btns) {
  if (Object.prototype.hasOwnProperty.call(btns, key)) {
    const element = btns[key];
    console.log(element);
    alert(element);
  }
}
