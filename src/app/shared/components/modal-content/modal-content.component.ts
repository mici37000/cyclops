import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'modal-content',
  standalone: true,
  imports: [SafeHtmlPipe],
  template: '<div [outerHTML]="content | safeHtml"></div>'
})
export class ModalContentComponent {
  @Input()
  content: string;
  title: string;
  data: any;
}
