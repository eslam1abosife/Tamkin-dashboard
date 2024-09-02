import { defineStore, acceptHMRUpdate } from 'pinia';

import { useGetPackagesTypes, useGetCategory,useGetPackages } from '@/composables/usePackages'


export const usePackgesStore = defineStore('packages', {
  state: () => ({
    currentTab: '',
    intialTab: '',
    currentTabTitle: '',
    types: [],
    categories: [],
    currentType: '',
    currentFaq: '',
    selectedQuestion: '',
    showNavbar: true,
    packages: []
  }),


  actions: {
    async  getPacks(){
      const { getPackages } = useGetPackages()
      const packsdata = await getPackages();
      this.packages = packsdata
    },
    setTabTitle(title) {
      this.currentTabTitle = title
    },

    changeTab(tab) {
      this.currentTab = tab

      this.showNavbar = false
      this.currentTabTitle = tab.title

      if (tab.title === 'Plugins') {
        this.showNavbar = true
      } else {
        this.showNavbar = false

      }
    },

    async getPackagesTypes() {
      const { getPackagesTypes } = useGetPackagesTypes()
      const typesData = await getPackagesTypes();
      this.types = typesData

      if (this.types.length > 0) {
        // this.currentType = this.types[0]
        this.currentFaq = this.types[0].faqs[0].name
        this.selectedQuestion = this.types[0].faqs[0]
      }
    },
    async getCategories() {
      const { getCategories } = useGetCategory()
      const categories = await getCategories();
      this.categories = categories
      this.currentTab = this.categories[0]
      this.intialTab = this.categories[0]
      this.currentTabTitle = this.categories[0].title

    }
  },
  getters: {
    getPackageDetails: (state) => (typeString, highlightText, page) => {
      const type = state.types.find((t) => t.name === state.currentType.name);
      if (type) {
        // alert(page)
        let color_title = type.color_title;

        if (highlightText && color_title.includes(highlightText)) {
          let highlightedHtml =
            `<span class="bg-gradient-to-br from-[#46A095] via-[#46A095] to-[#17159D] text-transparent bg-clip-text">${highlightText}</span>`;

          switch (page) {
            case 'signlang':
              color_title = color_title.replace(highlightText, highlightedHtml);
              break;
            case 'bundle':
              color_title = color_title.replace(highlightText,
                `<span class="bg-gradient-to-br  from-[#2DADA3]  to-[#3A4D8F] text-transparent bg-clip-text">${highlightText}</span>`);
              break;
            case 'translate':
              color_title = color_title.replace(highlightText, `<span class="text-[#0AACA1]">${highlightText}</span>`);
              break;
            case 'media':
              color_title = color_title.replace(highlightText,
                `<span class="bg-gradient-to-br  from-[#31A69F]  via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text">${highlightText}</span>`);
              break;

          }
        }

        return {
          color_title: color_title,
          description: type.description,
        };
      }
      return { color_title: '', description: '' };
    },
    getTabDetails: (state) => (tab, highlightText, page) => {
      const type = state.categories.find((t) => t.name === state.currentTab.name);
      if (type) {
        // alert(type.color_title)
        let color_title = type.color_title;

        if (highlightText && color_title.includes(highlightText)) {
          let highlightedHtml =
            `<span class="bg-gradient-to-br from-[#46A095] via-[#46A095] to-[#17159D] text-transparent bg-clip-text">${highlightText}</span>`;

          switch (page) {
            case 'signlang':
              color_title = color_title.replace(highlightText, highlightedHtml);
              break;
            case 'bundle':
              color_title = color_title.replace(highlightText,
                `<span class="bg-gradient-to-br  from-[#2DADA3]  to-[#3A4D8F] text-transparent bg-clip-text">${highlightText}</span>`);
              break;
            case 'translate':
              color_title = color_title.replace(highlightText, `<span class="text-[#0AACA1]">${highlightText}</span>`);
              break;
            case 'media':
              color_title = color_title.replace(highlightText,
                `<span class="bg-gradient-to-r  from-[#31A69F]  via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text">${highlightText}</span>`);
              break;

          }
        }

        return {
          color_title: color_title,
          description: type.description,
        };
      }
      return { color_title: '', description: '' };
    },
    getFaqBasedOnType() {
      const typeObj = this.types.find(_it => _it.name === this.currentType.name);

      return typeObj ? typeObj.faqs : [];
    },
    getPackageByTypeAndCategory() {
      let filteredPackages = this.packages.filter(pkg => pkg.type === this.currentType.name);
      
      if (this.currentTab !== null) {
        filteredPackages = filteredPackages.filter(pkg => pkg.category === this.currentTab.name);
      }

      return filteredPackages;
    }
  

    // getPackageForTypeAndCategory(type,category){

    // }




  },



});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePackgesStore, import.meta.hot));
}
