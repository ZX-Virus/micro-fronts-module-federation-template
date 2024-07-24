import 'reflect-metadata';
import { Container } from 'inversify';
import { INJECTORS } from '../shared/constants/INJECTORS';
import { IMobXStore } from '../shared/inaterfaces/mobx-store.interface';
import { MobXStore } from './store/mobx-store';

const container = new Container({
    defaultScope: 'Singleton',
});

container.bind(Container).toConstantValue(container);

container.bind<IMobXStore>(INJECTORS.MOBX_STORE).to(MobXStore);

export default container;
