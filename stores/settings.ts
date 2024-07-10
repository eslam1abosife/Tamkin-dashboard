import { defineStore, acceptHMRUpdate } from 'pinia';

interface Checkbox {
    name: string;
    value: boolean;
  }
 
 

export const useSettingsStore = defineStore('settings', {
    state: () => ({

     checkboxes: [] as Checkbox[],
     initialCheckboxes: [] as Checkbox[], 


      }),
      actions: {
 
        initializeCheckboxes(names: string[]) {
            this.checkboxes = names.map(name => ({ name, value: false }));
            this.initialCheckboxes = JSON.parse(JSON.stringify(this.checkboxes)); // Deep copy the initial state
          },
          addCheckbox(name: string) {
            if (!this.checkboxes.some(checkbox => checkbox.name === name)) {
              const newCheckbox = { name, value: false };
              this.checkboxes.push(newCheckbox);
              this.initialCheckboxes.push(newCheckbox);
            }
          },
          removeCheckbox(name: string) {
            this.checkboxes = this.checkboxes.filter(checkbox => checkbox.name !== name);
            this.initialCheckboxes = this.initialCheckboxes.filter(checkbox => checkbox.name !== name);
          },
          toggleCheckbox(name: string) {
            const checkbox = this.checkboxes.find(checkbox => checkbox.name === name);
            if (checkbox) {
              checkbox.value = !checkbox.value;
            }
          },
          setCheckboxValue(name: string, value: boolean) {
            const checkbox = this.checkboxes.find(checkbox => checkbox.name === name);
            if (checkbox) {
              checkbox.value = value;
            }
          },
          hasChanges() {
            return JSON.stringify(this.checkboxes) !== JSON.stringify(this.initialCheckboxes);
          },

           isChecked(name: string) {
            const checkbox = this.checkboxes.find((checkbox) => checkbox.name === name);
            return checkbox ? checkbox.value : false;
          }
      }
  
      
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
