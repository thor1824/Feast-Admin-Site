import {Injectable} from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {map, take} from 'rxjs/operators';
import {roles} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {


  constructor(private authService: AuthenticationService) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authUser$.pipe(
      take(1),
      map(userIn => {
      return userIn.role === roles.admin;

    }));


  }

}
