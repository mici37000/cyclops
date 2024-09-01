import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../components/modal/modal.component';
import { CustomModalOptions } from '../models/modal-options.model';
import { AlertModalOptions } from '../models/alert-modal-options.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  public showModal(options: CustomModalOptions): BsModalRef {
    const modalOptions: Partial<ModalOptions> = {
      initialState: options as Partial<ModalOptions>,
      class: `modal-${options.size ?? 'lg'}`,
      keyboard: options.keyboard ?? true,
      ignoreBackdropClick: options.ignoreBackdropClick ?? false
    };

    if (!options.buttons || options.buttons.length === 0) {
      modalOptions.initialState.buttons = [
        {
          class: 'btn-primary',
          text: 'Close',
          cb: () => this.hideModal()
        }
      ];
    }

    this.modalRef = this.modalService.show(ModalComponent, modalOptions);
    return this.modalRef;
  }

  public hideModal(): void {
    this.modalRef.hide();
  }

  public alert(options: AlertModalOptions): BsModalRef {
    const modalOptions: CustomModalOptions = {
      title: options.title,
      size: 'md',
      content: `<div class="alert alert-${options.type}">${options.content}</div>`,
      buttons: [
        {
          class: 'btn-primary',
          text: options.buttonText,
          cb: () => this.hideModal()
        }
      ]
    };

    return this.showModal(modalOptions);
  }
}
