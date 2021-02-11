import { makeAutoObservable } from 'mobx';
import { persistence, StorageAdapter } from 'mobx-persist-store';

export const sortOption = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    // DEFAULT: ""
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
        case sortOption.DESCENDING:
          this.sortOrder = sortOption.ASCENDING;
          break;
        case sortOption.ASCENDING:
          this.sortOrder = sortOption.DESCENDING;
          break;
        default:
          this.sortOrder = sortOption.ASCENDING
      }
    }

  constructor() {
    makeAutoObservable(this);
  }
}

export default persistence({
  name: 'UiStore',
  properties: ['dateRange', 'language', 'sortOrder'],
  adapter: new StorageAdapter({
    read: readStore,
    write: writeStore,
  }),
  reactionOptions: {
    delay: 100,
  },
})(new UiStore());
