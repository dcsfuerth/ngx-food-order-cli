import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dcs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() public authFailed: boolean;
  @Output() public doAuthenticate: EventEmitter<string> = new EventEmitter();
  public form: FormGroup;

  get emailInput() {
    return this.form.get('email') as FormControl;
  }

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
    });
  }

  public login(e: Event) {
    if (e) {
      e.preventDefault();
    }

    if (this.form.valid) {
      this.doAuthenticate.emit(this.form.value.email);
    }
  }
}
