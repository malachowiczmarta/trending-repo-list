import { makeAutoObservable } from 'mobx';
import { persistence, StorageAdapter } from 'mobx-persist-store';

export const sortOption = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
}

export const dateRangeOption = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly"
}

function readStore(name: string) {
  return new Promise<string | undefined>((resolve) => {
    const data = localStorage.getItem(name) as string;
    resolve(JSON.parse(data));
  });
}

function writeStore(name: string, content: any) {
  return new Promise<Error | undefined>((resolve) => {
    localStorage.setItem(name, JSON.stringify(content));
    resolve(undefined);
  });
}

class UiStore {
    dateRange = dateRangeOption.DAILY;
    language = "";
    sortOrder = "";

    setDateRange(range: string) {
        this.dateRange = range
    };
    setLanguage(lang: string) {
        this.language = lang
    };

    setSortOrder(type: string) {
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
    delay: 50,
  },
})(new UiStore());
