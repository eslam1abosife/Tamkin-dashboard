export function filterArrayObjects<T extends Record<string, any>>(array: T[], keysToKeep: (keyof T)[]): Partial<T>[] {
    return array.map((obj: T) => {
      return keysToKeep.reduce((filteredObj, key) => {
        if (key in obj) {
          (filteredObj as T)[key] = obj[key];
        }
        return filteredObj;
      }, {} as Partial<T>);
    });
  }