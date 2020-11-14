export class User {
    private _id: string;
    private username: string;
    private email: string;
    private password: string;
    private fullName: string;

    constructor(_id: string, username: string, email: string, password: string, fullName: string) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }

    public getId(): string {
        return this._id;
    }

    public setId(value: string): void {
        this._id = value;
    }

    /**
     * Getter username
     * @return {string}
     */
    public getUsername(): string {
        return this.username;
    }

    /**
     * Getter email
     * @return {string}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Getter password
     * @return {string}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Getter fullName
     * @return {string}
     */
    public getFullName(): string {
        return this.fullName;
    }

    /**
     * Setter username
     * @param {string} value
     */
    public setUsername(value: string) {
        this.username = value;
    }

    /**
     * Setter email
     * @param {string} value
     */
    public setEmail(value: string) {
        this.email = value;
    }

    /**
     * Setter password
     * @param {string} value
     */
    public setPassword(value: string) {
        this.password = value;
    }

    /**
     * Setter fullName
     * @param {string} value
     */
    public setFullName(value: string) {
        this.fullName = value;
    }

}
