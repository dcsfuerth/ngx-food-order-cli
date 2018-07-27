import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../reducers/users/models/user.class';

@Component({
  selector: 'dcs-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnChanges {
  @Input() public user: User;
  @Input() public updating: boolean;
  @Input() public loading: boolean;
  @Input() public error: any;
  @Output() public doSave = new EventEmitter<User>();

  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      planet: fb.group({ name: [''] }),
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.form.setValue(changes.user.currentValue.toObject());
  }

  public save() {
    if (this.form.valid) {
      this.doSave.emit(this.user.merge(this.form.value));
    }
  }
}
