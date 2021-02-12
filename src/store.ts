import { makeAutoObservable } from 'mobx';
import { persistence, StorageAdapter } from 'mobx-persist-store';

// TODO: Change to TypeScript Enum
export const sortOption = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
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
    dateRange = "daily";
    language = "";
    sortOrder = "";
    isOpen = false;

    setDateRange(range: string) {
        this.dateRange = range
    };
    setLanguage(lang: string) {
        this.language = lang
    };

    setOpen() {
      this.isOpen = !this.isOpen
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
