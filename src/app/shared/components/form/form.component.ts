import { DropboxService } from './../../../service/dropbox/dropbox.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Field, ColumnSizes, Section } from 'src/app/models/form.interface';
import { UtilService } from './../../../service/util/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  gridCss: Array<ColumnSizes> = ['sm', 'md', 'lg', 'xl'];
  css: any = {};
  form = this.fb.group({});
  duplicate!: Array<Section>;
  country = 'PH';

  @Input() formfields!: Array<Section>;
  @Input() obj!: any;
  @Input() viewMode: boolean = false;
  @Output() formInitiated = new EventEmitter<null>();
  @Output() formListener = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Output() onClick = new EventEmitter<any>();
  @Input() isDisable: boolean = false;

  constructor(
    private fb: FormBuilder,
    public utilService: UtilService,
    public dbx: DropboxService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formfields = JSON.parse(JSON.stringify(this.formfields));
    let temp: any = {};

    this.formfields.forEach((section: Section) => {
      section.items.forEach((i: Field) => {
        i.disabled = i.disabled || false || this.viewMode;
        if (this.obj && i.path) {
          console.log(this.obj, i.path);
          i.default =
            i.type === 'mobileNumber' &&
            this.utilService.deepFind(this.obj, i.path).length != 10
              ? this.utilService.deepFind(this.obj, i.path).slice(3)
              : this.utilService.deepFind(this.obj, i.path);
        }

        let def = i.default || undefined;

        if (i.type == 'checkbox') {
          def = i.default == '' ? false : i.default;
        }

        if (
          [
            'text',
            'number',
            'mobileNumber',
            'email',
            'select',
            'textarea',
          ].includes(i.type)
        ) {
          temp[i.fcname] = new FormControl(
            { value: def, disabled: i.disabled },
            {
              updateOn: 'change',
              validators: this.assembleValidators(i),
            }
          );
        } else {
          temp[i.fcname] = new FormControl(
            { value: def, disabled: i.disabled },
            this.assembleValidators(i)
          );
        }

        this.gridCss.forEach((g: ColumnSizes) => {
          if (!this.css[i.fcname]) {
            this.css[i.fcname] = ['col-12'];
          }
          this.css[i.fcname].push(g + ':col-' + i.colspan[g]);
        });
        this.css[i.fcname] = this.css[i.fcname].join(' ');
      });
    });

    this.form = this.fb.group(temp);
    console.log(this.form);
    this.form.valueChanges.subscribe((raw) => {
      this.formfields.forEach((section: Section) => {
        section.items.forEach((i: Field) => {
          if (i.type === 'number' && raw[i.fcname])
            raw[i.fcname] = parseFloat(
              (raw[i.fcname] + '').split(',').join('')
            );
          if (section.replacers) {
            if (i.showIf) {
              section.replacers.forEach((r: any) => {
                i.show = temp[r.key]?.value;
              });
            }
          }
        });
      });

      var pure = { ...raw };
      this.formfields.forEach((section: Section) => {
        section.items.forEach((i: Field) => {
          if (i.type == 'number' && raw[i.fcname] && !i.isPercentage)
            this.form
              .get(i.fcname)
              ?.setValue(
                (raw[i.fcname] + '').replace(/\d(?=(?:\d{3})+$)/g, '$&,'),
                { emitEvent: false }
              );
        });
      });
      this.formListener.emit(pure);
      setTimeout(() => {}, 0);
    });

    setTimeout(() => {
      this.formInitiated.emit();
    }, 200);
  }

  editing = false;
  editingVar: any;

  edit(event: any) {
    this.editing = true;
    this.editingVar = event;
    this.onClick.emit(event);
    this.form.controls[event].enable();
  }

  cancel(event: any) {
    this.editing = false;
    this.onCancel.emit(event);
    this.form.controls[event].disable();
  }

  numberInputOnly(event: any) {
    //block "0" on first input
    if (event.target.value.length === 0 && event.key === '0') return false;
    return (
      //backspace
      (event.charCode > 7 && event.charCode < 9) ||
      //period(.)
      (event.charCode > 45 && event.charCode < 47) ||
      //0-9
      (event.charCode > 47 && event.charCode < 58) ||
      //delete
      (event.charCode > 126 && event.charCode < 128)
    );
  }

  assembleValidators(i: Field) {
    var validators: Array<any> = [];

    if (!['checkbox'].includes(i.type) && !i.optional) {
      validators.push(Validators.required);
    }

    if (['email'].includes(i.type)) {
      validators.push(
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      );
      validators.push(Validators.email);
    } else if (['mobileNumber'].includes(i.type)) {
      validators.push(Validators.minLength(10));
      validators.push(Validators.maxLength(10));
    }

    return validators;
  }

  copyMessage(toCopy?: any) {
    this.utilService.copyToClipboard(toCopy);
    this.sb.open('Copied', 'Okay', { duration: 3500 });
  }
  compareFn(op1: any, op2: any) {
    console.log(op1, op2);
    return op1 === op2;
  }
}
