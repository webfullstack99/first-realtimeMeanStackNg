import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { User } from './shared/defines/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public _items: User[] = [];
    public _form: FormGroup;

    constructor(
        private _api: ApiService,
        private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getUsers();
        this._api.getSocket().on('new-data', function (data: any) {
            this.getUsers();
        }.bind(this));
    }

    private initForm(): void {
        this._form = this._formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
        })
    }

    public getUsers() {
        this._api.getUsers((items: User[]) => {
            this._items = items
        })
    }

    public onItemClicked(item: User) {
        this._api.deleteUser(item.getId(), () => {
            this._api.getSocket().emit('delete-data', null);
        })
    }

    public onSubmit($event) {
        if (this._form.valid) {
            const { username, email, fullName } = this._form.value;
            let user: User = new User(null, username, email, '123456', fullName);
            this._api.addUser(user, () => {
                this._api.getSocket().emit('new-data', null);
            });
            this._form.reset();
        }
    }

    public isEnableSubmitBtn(): boolean {
        return this._form.valid;
    }
}
