import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PrimengService {

  constructor(public confirmationService: ConfirmationService) { }
}
