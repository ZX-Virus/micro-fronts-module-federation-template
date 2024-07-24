import { injectable } from 'inversify';
import { IMobXStore } from '../../shared/inaterfaces/mobx-store.interface';
import { makeAutoObservable } from 'mobx';

@injectable()
export class MobXStore implements IMobXStore {
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}
