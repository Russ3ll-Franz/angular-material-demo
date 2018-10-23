import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const USERS_URL = 'https://angular-material-api.azurewebsites.net/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataStore: {
    users: User[];
  };

  private _users: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadAll() {
    return this.http.get<User[]>(USERS_URL).subscribe(
      data => {
        this.dataStore.users = data;
        this._users.next({ ...this.dataStore }.users);
      },
      error => {
        console.log('Failed to fetch users');
        console.log('----', JSON.stringify(error), '----');
      }
    );
  }

  getById(userId: number) {
    return this.dataStore.users.find(user => user.id == userId);
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this._users.next({ ...this.dataStore }.users);
      resolve(user);
    });
  }
}
