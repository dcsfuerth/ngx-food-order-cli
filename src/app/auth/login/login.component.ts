import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from './types';

@Component({
  selector: 'dcs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnChanges {
  @Input()
  public authFailed: boolean;
  @Input()
  public testAccount: any;
  @Output()
  public doAuthenticate: EventEmitter<LoginData> = new EventEmitter();
  public form: FormGroup;

  get emailInput() {
    return this.form.get('email') as FormControl;
  }

  get passwordInput() {
    return this.form.get('password') as FormControl;
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required]),
    });
  }

  public login(e: Event) {
    if (e) {
      e.preventDefault();
    }

    if (this.form.valid) {
      this.doAuthenticate.emit(this.form.value);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.testAccount && this.testAccount) {
      this.form.patchValue(this.testAccount);
    }
  }
}
