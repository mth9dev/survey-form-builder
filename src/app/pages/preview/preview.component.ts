import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preview, questionTypes } from 'src/app/models/question';
import { FormService } from 'src/app/services/form.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    standalone: false
})
export class PreviewComponent implements OnInit, OnDestroy {

  private _subs = new SubSink();
  protected _preview: Preview | undefined;
  protected _questionTypes = questionTypes;

  constructor(
    private _formService: FormService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._subs.sink = this._formService.preview$.subscribe(preview => {
      this._preview = preview;
    })
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  backToBuilder() {
    this._router.navigate(['/form/builder']);
  }

}
