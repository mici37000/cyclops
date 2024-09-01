import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ModalButton } from '../../models/modal-button.model';
import { PlaceHolderDirective } from '../../directives/placeholder.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [PlaceHolderDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild(PlaceHolderDirective, { static: true }) modalContent: PlaceHolderDirective;

  title: string;
  component: any;
  content: string;
  data: any;
  buttons: ModalButton [];
  controls: [];

  ngAfterViewInit(): void {
    if (this.component) {
      this.loadComponent(this.component);
    } else if (this.content) {
      this.loadComponent(ModalContentComponent);
    } else {
      console.debug('No modal passed to display');
    }
  }

  ngOnDestroy(): void {
    console.debug('modal is being destroyed...');
    this.modalContent.viewContainerRef.clear();
  }

  private loadComponent(component: any): Component {
    const { viewContainerRef }: PlaceHolderDirective = this.modalContent;
    viewContainerRef.clear();

    const { instance } = viewContainerRef.createComponent<any>(component);
    instance.data = component;
    instance.data = this.data;
    instance.title = this.title;
    instance.buttons = this.buttons;

    if (this.content) {
      instance.content = this.content;
    }

    if (this.controls) {
      instance.controls = this.controls;
    }

    return instance;
  }
}
