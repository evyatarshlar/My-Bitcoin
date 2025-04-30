import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    isLoading$ = inject(LoaderService).isLoading$
}
