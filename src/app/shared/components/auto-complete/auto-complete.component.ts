import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
  form = this.fb.group({});
  optForm = new FormControl('', Validators.required);
  @Output() onSelect: any = new EventEmitter<any>();
  @Input() defaultValue: any;
  @Input() opt: any;
  selectedOpt: any;
  filteredOpt: Observable<any> | undefined;
  constructor(private fb: FormBuilder) {
    this.filteredOpt = this.optForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {
    console.log(this.opt.item);
    if (this.defaultValue) this.optForm.setValue(this.defaultValue);
  }
  private _filter(value: any) {
    if (typeof value !== 'object' && value !== '') {
      return this.opt.item.filter((option: any) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
    }
    return this.opt.item;
  }
  onOptionSelect(event: any) {
    let opt = event?.option?.value || event;
    this.selectedOpt = event?.option?.value || event;
    this.optForm.setValue(opt);
    console.log(this.optForm.value);
    this.onSelect.emit(this.optForm.value);
  }
}
