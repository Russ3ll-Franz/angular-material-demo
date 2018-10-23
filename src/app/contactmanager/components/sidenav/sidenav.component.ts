import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  mediaMatches = this.mediaMatcher.matches;

  users: Observable<User[]>;
  isDarkTheme = false;
  dir = 'ltr';

  constructor(
    zone: NgZone,
    private userService: UserService,
    private router: Router
  ) {
    this.mediaMatcher.addListener(mql => {
      zone.run(() => (this.mediaMatches = mql.matches));
    });
  }

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatches;
  }

  onToggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  onToggleDir() {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
    // not an issue in angular 7 anymore, but this toggle would break the sidenav
    this.sidenav.toggle().then(() => this.sidenav.toggle()); // reset the sidenav by double toggling it
  }
}
