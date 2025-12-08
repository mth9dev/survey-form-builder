import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { questionTypes, QuestionFormGroup } from 'src/app/models/question';
import { FormService } from 'src/app/services/form.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss']
})
export class AddQuestionDialogComponent implements OnInit {

  private _subs = new SubSink();
  protected _newQuestionForm: FormGroup<QuestionFormGroup> | undefined;
  protected _questionTypes = Object.values(questionTypes);

  protected get _answerArray() {
    return (this._newQuestionForm?.get('answer') as FormArray) || undefined;
  }

  constructor(
    private _dialogRef: MatDialogRef<AddQuestionDialogComponent>,
    private _fb: FormBuilder,
    private _formService: FormService,
  ) { }

  ngOnInit(): void {
    this._newQuestionForm = this._fb.group({
      'text': [null, Validators.required],
      'type': [null, Validators.required],
    })

    this._subs.sink = this._newQuestionForm.get('type')!.valueChanges.subscribe(value => {
      switch (value) {
        case questionTypes.PARAGRAPH: {
          this._newQuestionForm!.setControl('answer', this._fb.control(null));
          break;
        }
        case questionTypes.CHECKBOX: {
          // populated with one option.
          this._newQuestionForm!.setControl('answer', this._fb.array([this._fb.group({
            'option': [null, Validators.required],
            'value': null,
          })]));
          break;
        }
      }
    })
  }

  onSubmit() {
    this._newQuestionForm?.markAllAsTouched();
    if (this._newQuestionForm?.invalid)
      return;
    
    this._formService.addQuestion(this._newQuestionForm!);
    this._dialogRef.close();
  }

  addAnswer() {
    (this._answerArray as FormArray).push(this._fb.group({
      'option': [null, Validators.required],
      'value': null,
    }))
  }

}
