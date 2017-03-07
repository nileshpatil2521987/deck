import {destroyPlatform} from '@angular/core';

import {AuthenticationService, IUser} from './authentication.service';

describe('authenticationService', function () {

  beforeEach(() => destroyPlatform());
  afterEach(() => destroyPlatform());

  let authenticationService: AuthenticationService;
  beforeEach(() => {
    authenticationService = new AuthenticationService();
  });

  describe('setAuthenticatedUser', function () {
    it('sets name, authenticated flag', function () {
      let user: IUser = authenticationService.getAuthenticatedUser();
      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);

      authenticationService.setAuthenticatedUser({name: 'kato@example.com', authenticated: false});
      user = authenticationService.getAuthenticatedUser();
      expect(user.name).toBe('kato@example.com');
      expect(user.authenticated).toBe(true);
    });

    it('disregards falsy values', function () {
      const user: IUser = authenticationService.getAuthenticatedUser();

      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);

      authenticationService.setAuthenticatedUser(null);
      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);

      authenticationService.setAuthenticatedUser({name: '', authenticated: false});
      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);
    });
  });

  describe('authentication', function () {
    it('fires events and sets user', function () {
      let firedEvents = 0;
      authenticationService.onAuthentication(() => firedEvents++);
      authenticationService.onAuthentication(() => firedEvents++);
      authenticationService.setAuthenticatedUser({name: 'foo@bar.com', authenticated: false});
      expect(authenticationService.getAuthenticatedUser().name).toBe('foo@bar.com');
      expect(firedEvents).toBe(2);
    });
  });
});
