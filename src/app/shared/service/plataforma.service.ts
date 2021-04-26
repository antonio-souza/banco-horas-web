import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

    isNavegador() {
        return isPlatformBrowser(this.platformId);
    }
}
