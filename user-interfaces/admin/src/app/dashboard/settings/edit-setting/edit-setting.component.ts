import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements OnInit {

  isLoading!: boolean;
  errorMessage: string = '';

  settingForm!: FormGroup;

  sections = [
    {
      id: 1,
      title: 'Preparation',
    },
    {
      id: 1,
      title: 'To Tend',
    },
    {
      id: 1,
      title: 'Contract',
    },
    {
      id: 1,
      title: 'Implementation',
    },
    {
      id: 1,
      title: 'Advances',
    },
  ];

  settingTypes = [
    {
      id: 1,
      title: 'Multi Year Budget Program',
    },
    {
      id: 1,
      title: 'Environmental Impact license',
    },
    {
      id: 1,
      title: 'Resettlement compensation Plan',
    },
  ];

  currencies = [
    {
      id: 1,
      title: 'HNL'
    },
    {
      id: 2,
      title: 'USD'
    }
  ]

  filteredSections: any;
  filteredProjects: any;
  filteredSettingTypes: any;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.setUpSettingForm();
  }

  setUpSettingForm(): void {
    this.settingForm = this.fb.group({
      organization: ['', []], // Validators.required
      publisher: ['', []], // Validators.required
      currency: ['', []], // Validators.required
      publication_date: ['', []], // Validators.required
    });
  }

  saveSetting(formValue: FormGroup): void {

  }

}
