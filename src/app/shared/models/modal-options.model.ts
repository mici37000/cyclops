import { ModalOptions } from "ngx-bootstrap/modal";
import { ModalButton } from "./modal-button.model";

export interface CustomModalOptions extends ModalOptions {
  title: string;
  size?: string;
  component?: any;
  data?: any;
  content?: string;
  buttons?: ModalButton[];
}