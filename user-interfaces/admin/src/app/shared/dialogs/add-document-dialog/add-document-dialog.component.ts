import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DocumentTypesService } from '../../../dashboard/catalog/document-types/_services/document-types.service';
import { IDocumentTypeAttributes } from '../../interfaces/document-types/IDocumentType';
import { IQueryparam } from '../../interfaces/queryparam/IQueryparam';
import { TooltipPosition } from '@angular/material/tooltip';
import { DocumentService } from '../../../dashboard/documents/_services/document.service';
import { IDocumentAttributes } from '../../interfaces/documents/IDocument';
import { NotificationService } from '../../services/notifications/notification.service';
import { IProject, IProjectAttributes } from '../../interfaces/project/IProject';

@Component({
  selector: 'app-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.scss']
})
export class AddDocumentDialogComponent implements OnInit, OnDestroy {

  file: File | null = null;

  isLoading: boolean = true;

  date = new Date();
  currentDate: string = `${this.date.getFullYear()}/${this.date.getMonth()}/${this.date.getDay()}` ;

  documentForm!: FormGroup;

  documentTypes! : IDocumentTypeAttributes[];
  fileteredDocumentTypes: Observable<IDocumentTypeAttributes[]> | undefined;
  private subscription!: Subscription;

  languages = [
    {
      'title': 'it is',
      'value': 'es'
    },
    {
      'title': 'on',
      'value': 'en'
    }
  ];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];

  constructor(
    private fb: FormBuilder,
    private _documentService: DocumentService,
    private _notificationService: NotificationService,
    private _documentTypesService: DocumentTypesService,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProjectAttributes) {
      this.getAllDocumentTypes({ q: 'all', section: data.section_id });
    }

  ngOnInit(): void {
    this.setUpDocumentForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  setUpDocumentForm(): void {
    this.documentForm = this.fb.group({
      'document_type_id': ['', [Validators.required]],
      'document': ['', [Validators.required]],
      'author': [''],
      'qualification': [''],
      'description': [''],
      'language': [''],
      'publication_date': [this.currentDate ? this.currentDate : '', ''],
      'home_page': [''],
      'final_page': ['']
    });
  }

  saveDocument(formValue: FormGroup): void {

    if (this.documentForm.invalid) {
      return;
    }

    let document = {
      'section_id': this.data.section_id,
      'project_id': this.data.id,
      'document_types_id': formValue.controls.document_type_id.value.id,
      'document_qualification': formValue.controls.qualification.value,
      'document_description': formValue.controls.description.value,
      'document_title': formValue.controls.author.value,
      'document_author': formValue.controls.author.value,
      'document_language': formValue.controls.language.value ? formValue.controls.language.value : 'es',
      'document_published': formValue.controls.publication_date.value,
      'document_start': formValue.controls.home_page.value,
      'document_end': formValue.controls.final_page.value,
    }

    this.isLoading = true;

    this._documentService.addDocument(document, this.file).subscribe(
      (document) => {
        this.isLoading = false;
        this.closeDialog();
        this._notificationService.showSuccessNotification('Saved Successfully!', 'Document has been added.')
        console.log('Document ', document);
      },
      (error) => {
        this.isLoading = false;
      }
    )

    console.log('Form Value ', formValue.value);
    console.log('Document Data ', document);
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0)
      console.log('File ', this.file);
    }
  }

  getAllDocumentTypes(query: IQueryparam) {
    this.isLoading = true;
    this.subscription = this._documentTypesService.getAllDocumentTypes(query).subscribe(
      (documentTypes) => {
        this.isLoading = false;
        this.documentTypes = documentTypes?.data;
        this.fileteredDocumentTypes = this.documentType?.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterDocumentTypes(value))
        );
        console.log('Document Types ', this.documentTypes);
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }
  private filterDocumentTypes(value: any): any[] {
    const filterValue = this.normalizeValue(value?.type_local || value);
    return this.documentTypes.filter(documentTypes => this.normalizeValue(documentTypes?.type_local).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  displayStateDocumentTypes(state: any) {
    return state ? state.type_local : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get documentType() {
    return this.documentForm.get('document_type_id');
  }
  get documentFile() {
    return this.documentForm.get('document');
  }

  get author() {
    return this.documentForm.get('author');
  }

  get qualification() {
    return this.documentForm.get('qualification');
  }

  get description() {
    return this.documentForm.get('description');
  }

  get language() {
    return this.documentForm.get('language');
  }

  get publicationDate() {
    return this.documentForm.get('publication_date');
  }

  get homePage() {
    return this.documentForm.get('home_page');
  }

  get finalPage() {
    return this.documentForm.get('final_page');
  }

}
