import { computed } from 'mobx';
import store from './store';

export default class ViewModel {
    @computed get content() {
        return store.content
    }

    fetchContent() {
        store.fetchContent();
    }
}