import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../defines/user';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _url: string = 'http://localhost:3000/api/user';
    private _socket;

    constructor(
        private _http: HttpClient,
        private _helper: HelperService,
    ) {
        this.initSocket();
    }

    private initSocket() {
        this._socket = io(environment.SOCKET_ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
        this._socket.emit('client-connect', {_id: Date.now()});
    }


    public getUsers(doneCallback: Function): void {
        const url = `http://localhost:3000/api/user`;
        this._http.get<User[]>(url).toPromise().then((items: any[]) => {
            let users: User[] = [];
            items.forEach((item: any) => {
                let user: User = new User(item._id, item.username, item.email, item.password, item.fullName);
                users.push(user);
            })
            if (this._helper.isFn(doneCallback)) doneCallback(users);
        })
    }

    public getUser(id: string, doneCallback: Function): void {
        const url = `${this._url}/${id}`;
        this._http.get<User>(url).toPromise().then((item: any) => {
            let user: User = new User(item._id, item.username, item.email, item.password, item.fullName);
            if (this._helper.isFn(doneCallback)) doneCallback(user);
        })
    }

    public addUser(user: User, doneCallback) {
        return this._http.post<User>(this._url, user).toPromise().then((result) => {
            if (this._helper.isFn(doneCallback)) doneCallback(result);
        })
    }

    public deleteUser(id: string, doneCallback: Function): void {
        const url = `${this._url}/${id}`;
        this._http.delete<User>(url).toPromise().then((result) => {
            if (this._helper.isFn(doneCallback)) doneCallback(result);
        })
    }


    public getSocket() {
        return this._socket;
    }
}