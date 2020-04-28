import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  createForm: FormGroup;

  constructor(private auth: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: '',
      email: '',
      password: ''
    });
  }

  signUpWithEmailPassword() {
    const email = this.createForm.value.email
    const password = this.createForm.value.password
    const name = this.createForm.value.name

    this.auth.createUserWithEmailAndPassword(email, password, name);
  }
}