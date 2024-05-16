import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter();

  onCloseModal() {
    this.closeModal.emit(false);
  }
}
