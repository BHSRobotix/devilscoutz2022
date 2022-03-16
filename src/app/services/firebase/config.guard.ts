import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigGuard implements CanActivate {

  constructor(
    public configService: ConfigService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.configService.configLoaded !== true) {
      this.router.navigate(['menu']);
    }
    return true;
  }
}

