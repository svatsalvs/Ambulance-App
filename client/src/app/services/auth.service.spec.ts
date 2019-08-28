import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService, User} from './auth.service';
import { UserFactory } from '../testing/factories';

fdescribe('Authentication using a service', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should allow a user to sign up for a new account', () => {
    // Set up the data.
    const userData = UserFactory.create();
    const photo = new File(['photo'], userData.photo, {type: 'image/jpeg'});
    // Execute the function under test.
    authService.signUp(
      userData.username,
      userData.first_name,
      userData.last_name,
      'pAssw0rd!',
      userData.group,
      photo
    ).subscribe(user => {
      expect(user).toBe(userData);
    });
    const request = httpMock.expectOne('http://localhost:8000/api/sign_up/');
    request.flush(userData);
  });

  it('should allow a user to log in to an existing account', () => {
  // Set up the data.
  const userData = UserFactory.create();
  // A successful login should write data to local storage.
  localStorage.clear();
  // Execute the function under test.
  authService.logIn(
    userData.username, 'pAssw0rd!'
  ).subscribe(user => {
    expect(user).toBe(userData);
  });
  const request = httpMock.expectOne('http://localhost:8000/api/log_in/');
  request.flush(userData);
  // Confirm that the expected data was written to local storage.
  expect(localStorage.getItem('ambulance.user')).toBe(JSON.stringify(userData));
  });

  it('should determine whether a user is logged in', () => {
  localStorage.clear();
  expect(User.getUser()).toBeFalsy();
  localStorage.setItem('ambulance.user', JSON.stringify(
    UserFactory.create()
  ));
  expect(User.getUser()).toBeTruthy();
  });
});
