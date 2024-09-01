import { CustomModalOptions } from "./modal-options.model";

export interface AlertModalOptions extends CustomModalOptions {
  type: 'success' | 'info' | 'warning' | 'danger'
  buttonText: string;
}