import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() { }

    public isFn(value: Function): boolean{
        return (typeof value == 'function' && value != null);
    }

}
