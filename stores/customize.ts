import { defineStore, acceptHMRUpdate } from 'pinia';

interface Checkbox {
    name: string;
    value: boolean;
  }
 
 

export const useCustomizeStore = defineStore('customize', {
    state: () => ({
     currentColor:'#2DADA3',
     gradient1:'',
     gradient2:'',
     colorMode:'solid',
     checkboxes: [] as Checkbox[],
     initialCheckboxes: [] as Checkbox[], // Store the initial state
     initialPositionDesktop:'top_left',
     initialPositionMobile:'top_left',
     buttonPositionDesktop:'top_left',
     buttonPositionMobile:'top_left_mobile',
     force_change:false,
     buttonSizeSlider:2,
     buttonShapeSelector:'type1',
     widgetType:'full_widget'

      }),
      actions: {
         selectWidgetType (v:string){
          this.widgetType = v
          if(this.widgetType !== 'full_widget'){
this.force_change = true
          }else {
this.force_change = false
            
          }
      },
         changeButtonShape (shape: string) {
          this.buttonShapeSelector = shape;
          if(shape !== 'type1'){
            this.force_change = true
          }else {
            this.force_change = false
        
          }
        
        
        },
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
            return JSON.stringify(this.checkboxes) !== JSON.stringify(this.initialCheckboxes) ;
          },

           isChecked(name: string) {
            const checkbox = this.checkboxes.find((checkbox) => checkbox.name === name);
            return checkbox ? checkbox.value : false;
          }
      }
  
      
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCustomizeStore, import.meta.hot));
}
