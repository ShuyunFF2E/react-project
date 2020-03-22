import { observable } from 'mobx'
import http from '@commons/http';

class Store {
    @observable

    fetchContent() {
        return http.get('/home/content').then(res => {
            this.content = res;

            return res;
        })
    }
}

export default new Store()
