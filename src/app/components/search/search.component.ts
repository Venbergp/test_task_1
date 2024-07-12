import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MockService} from "../../services/mock.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit {
  searchControl: FormControl = new FormControl('');

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(term => {
      this.mockService.setSearchTerm(term);
    });
  }
}
