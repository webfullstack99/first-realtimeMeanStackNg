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

    public _username: string = '';
    public _userOnline: any[] = [];
    public _messages: any[] = [];
    public _form: FormGroup;
    private _isUsernameDisabled: boolean = false;

    constructor(
        private _api: ApiService,
        private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.initForm();

        // USER ONLINE
        this._api.getSocket().on('SERVER_RETURN_USER_ONLINE', function (data: any) {
            this._userOnline = data;
        }.bind(this));

        // MESSAGE
        this._api.getSocket().on('SERVER_RETURN_MESSAGE', function (data: any) {
            this._messages.push(data);
            let el = document.getElementById('message-container');
            if (el) {
                setTimeout(() => {
                    el.scrollTop = el.scrollHeight;
                });
            }
        }.bind(this));
    }

    private initForm(): void {
        this._form = this._formBuilder.group({
            username: ['', [Validators.required]],
            message: ['', [Validators.required]],
        })
    }

    public onSubmit($event) {
        if (this._form.valid) {
            const { username, message } = this._form.value;
            if (username) this._username = username;
            this._form.controls.username.disable();
            this._form.controls.message.reset();
            this._api.getSocket().emit('CLIENT_SEND_MESSAGE', { username: this._username, content: message });
        }
    }

    public isEnableSubmitBtn(): boolean {
        return this._form.valid;
    }

    public getIsUsernameDisabled(): boolean {
        return this._isUsernameDisabled;
    }

    public setIsUsernameDisabled(value: boolean) {
        this._isUsernameDisabled = value;
    }

    public isMine(username: string): boolean {
        return (username == this._username);
    }

    public onMessageContainerScrolled($event: Event) {
    }
}
