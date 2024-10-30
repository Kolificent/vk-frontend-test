import { makeAutoObservable } from 'mobx';

class DialogStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  openDialog() {
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
  }

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
}

const dialogStore = new DialogStore();
export default dialogStore;
