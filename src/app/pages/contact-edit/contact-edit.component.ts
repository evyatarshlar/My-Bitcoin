// import { Component, inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { filter, map } from 'rxjs';
// import { Contact } from 'src/app/models/contact.model';
// import { ContactService } from 'src/app/services/contact.service';

// @Component({
//   selector: 'contact-edit',
//   templateUrl: './contact-edit.component.html',
//   styleUrls: ['./contact-edit.component.scss']
// })
// export class ContactEditComponent implements OnInit {
//   private contactService = inject(ContactService)
//   private router = inject(Router)
//   private route = inject(ActivatedRoute)



//   form!: FormGroup
//   contact = this.contactService.getEmptyContact()

//   constructor(private fb: FormBuilder) {
//     this.form = this.fb.group({
//       name: ['', Validators.required],
//       phone: ['', [Validators.required, Validators.pattern(/^\d{9,}$/)]],
//       email: ['', [Validators.required, Validators.email]]
//     })
//   }

//   ngOnInit(): void {
//     this.route.params.pipe(
//       map(params => params['contact']),
//       filter(contact => contact),
//     ).subscribe({
//       next: contact => this.contact = contact
//     })
//   }

//   onSaveContact() {
//     this.contactService.saveContact(this.contact as Contact)

//       .subscribe({
//         error: err => console.log('err:', err),
//         complete: this.back
//       })
//   }

//   back = () => {
//     this.router.navigateByUrl('/contact')
//   }
// }

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  private contactService = inject(ContactService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  contactId: string | null = null;
  subscription = new Subscription();

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });

    const sub = this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter(id => !!id),
        switchMap(id => {
          this.contactId = id;
          return this.contactService.getContactById(id!);
        })
      )
      .subscribe(contact => {
        if (contact) this.form.patchValue(contact);
      });

    this.subscription.add(sub);
  }

  onSaveContact() {
    if (this.form.invalid) return;

    const contact: Contact = {
      ...this.form.value,
      _id: this.contactId || undefined,
    };

    const saveSub = this.contactService.saveContact(contact).subscribe({
      error: err => console.error('Save error:', err),
      complete: this.back,
    });

    this.subscription.add(saveSub);
  }

  back = () => {
    this.router.navigateByUrl('/contact');
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

