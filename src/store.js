import { makeAutoObservable } from 'mobx';
import { persistence, useClear, useDisposers, isSynchronized, StorageAdapter } from 'mobx-persist-store';

const sortOption = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    DEFAULT: ""
}

function readStore(name) {
  return new Promise((resolve) => {
    const data = localStorage.getItem(name);
    resolve(JSON.parse(data));
  });
}

function writeStore(name, content) {
  return new Promise((resolve) => {
    localStorage.setItem(name, JSON.stringify(content));
    resolve();
  });
}

class UiStore {
    dateRange = "daily";
    language = "";
    sortOrder = "";

    setDateRange(range) {
        this.dateRange = range
    };
    setLanguage(lang) {
        this.language = lang
    };

    setSortOrder(type) {
        switch(type) {
            case sortOption.ASCENDING:
                this.sortOrder = sortOption.DESCENDING;
                break;
            case sortOption.DEFAULT:
                this.sortOrder = sortOption.ASCENDING;
                break;
            default:
                this.sortOrder = sortOption.DEFAULT
        }
    }

  constructor() {
    makeAutoObservable(this);
  }
}

export default persistence({
  name: 'UiStore',
  properties: ['dateRange'],
  adapter: new StorageAdapter({
    read: readStore,
    write: writeStore,
  }),
  reactionOptions: {
    delay: 500,
  },
})(new UiStore());
