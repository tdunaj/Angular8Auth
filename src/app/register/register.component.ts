import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import  { AuthService } from  '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;
  
  constructor(private fb: FormBuilder, private auth: AuthService) { 
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.valid);
    this.auth.register(this.form.value);
  }

}
