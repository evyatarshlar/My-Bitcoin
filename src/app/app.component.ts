import { Component, OnInit } from '@angular/core';
import { ContactService } from './services/contact.service';
import { BitcoinService } from './services/bitcoin.service.service';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private contactService: ContactService,
        private userService: UserService
    ) { }

    title = 'mister-bitcoin-try';

    ngOnInit(): void {
        this.contactService.loadContacts().subscribe({
            error: err => {
                console.log('err:', err)
            }
        })

        setTimeout(() => {
            this.userService.addCoins(50)
        }, 1500);
    }
}
