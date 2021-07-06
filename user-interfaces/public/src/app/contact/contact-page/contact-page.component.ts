
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  contactForm: FormGroup;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,) {
    this.contactForm = this.fb.group({
      email: [null, Validators.required],
      name: [null, Validators.required],
      message: [null, Validators.required],
    });

  }

  ngOnInit(): void {

  }




  onSubmit(form: FormGroup) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/xknkwrbl',
      { name: form.value.name, replyto: form.value.email, message: form.value.message },
      { 'headers': headers }).subscribe(
        response => {
          console.log(response);
        }
      );
  }

}
