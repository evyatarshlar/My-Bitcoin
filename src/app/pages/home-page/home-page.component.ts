import { Component, OnInit } from '@angular/core'
import { Observable, Subscription, switchMap } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { BitcoinService } from 'src/app/services/bitcoin.service.service'
import { UserService } from 'src/app/services/user.service'

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {

    user$: Observable<User> = this.userService.loggedInUser$
    BTC$: Observable<string> = this.user$.pipe(
        switchMap(user => this.bitcoinService.getRateStream(user.coins))
    )

    constructor(
        private userService: UserService,
        private bitcoinService: BitcoinService
    ) { }



}

