import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

    @Input() contactId: string
    @Output() onBack = new EventEmitter()
    contact: Contact

    constructor(private contactService: ContactService) { }

    async ngOnInit(): Promise<void> {
        this.contactService.getContactById(this.contactId)
            .subscribe(contact => this.contact = contact)
    }

}
