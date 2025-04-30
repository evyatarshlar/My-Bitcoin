import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ // important soo we could use this service in the root app, have access to it
    providedIn: 'root'
})
export class UserService {

    private user: User = {
        name: "Satoshi Nakamoto",
        coins: 100,
        moves: []
    }

    private _loggedInUser$ = new BehaviorSubject<User>(this.user)
    public loggedInUser$ = this._loggedInUser$.asObservable()


    getUser(): User {
        return this.user
    }

    addCoins = (coins: number) => {
        const user = this._loggedInUser$.value
        this._loggedInUser$.next({ ...user, coins: user.coins + coins })
    }
}