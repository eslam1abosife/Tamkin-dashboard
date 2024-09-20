import { defineStore, acceptHMRUpdate } from 'pinia';

import { useGetPackagesTypes, useGetCategory,useGetPackages,useGetTokens } from '@/composables/usePackages'
import {useJoinInvestor} from '@/composables/usePackages'
import {useCouponCode} from "@/composables/useMarket";


export const usePackgesStore = defineStore('packages', {
  state: () => ({
    showMoreINInvestors:false,
    currentTab: '',
    intialTab: '',
    currentTabTitle: 'Plugins',
    views_level:'',
    types: [],
    categories: [],
    currentType: {
      title:'Sign language'
    },
    currentFaq: '',
    selectedQuestion: '',
    showNavbar: true,
    packages: [],
    sections:[],
    features:[],
    discountType:'month',
    loadingData:true,
    traffic_level:'',
    investorProgram:'',
    investorUser:'',
    loadingAccessibility:true,
    isLoadingTypes:false,
    currentPackage:'',
    packagePayload:'',
    selectedPaymentMethod:'',
    bundleSelectedPackage:'',
    urls:[],
    promo : '',
currentDiscount:0,
validPromo : false,

noDiscount:false,
loadingPromo:false,
selectedCrypto:''

  }),


  actions: {
    async getInvestorUser(){
      const {isInestorUser} = useJoinInvestor()
const res = await isInestorUser()
this.investorUser = res[0]
    },
    
    async addPromoCode(){
      this.loadingPromo = true
      const {ApplyCoupon,noCodeFound} = useCouponCode()
      const res = await ApplyCoupon(this.promo)
      if(res){
    
       if(res.isValid){
        this.validPromo = res.isValid
        this.currentDiscount = Number(res.discount)
        this.noDiscount = false
        this.loadingPromo = false

       }else {
        this.noDiscount = !res.isValid
        this.loadingPromo = false

       }
      }

    },
    
     removePromoCode (){
       if(this.promo){
        this.validPromo = false
        this.promo =""
        this.noDiscount =false
        this.currentDiscount = 0

       }
    },
    async getProgramInvestor(){
      const { getInvestorProgram } = useGetTokens()
      const programdata = await getInvestorProgram();
      this.investorProgram = programdata
    },
    async  getPacks(){
      const { getPackages } = useGetPackages()
      const packsdata = await getPackages();
      // console.log('data is here',packsdata.packages)
      this.packages = packsdata.packages
      this.sections = packsdata.sections
      this.features = packsdata.list_feature
    },
    setTabTitle(title) {
      this.currentTabTitle = title
    },
    changeType(type) {
      this.currentType = type

      this.currentFaq = type.faqs[0].name
      this.selectedQuestion = type.faqs[0]
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
      if (this.isLoadingTypes) return; // Prevent multiple triggers while loading
      this.isLoadingTypes = true;
    
      const { getPackagesTypes } = useGetPackagesTypes();
      const typesData = await getPackagesTypes();
      this.types = typesData;
    
 
      
      this.isLoadingTypes = false;
    },
    
    
    async getCategories() {
      const { getCategories } = useGetCategory()
      const categories = await getCategories();
      this.categories = categories

      if(this.currentType.title === 'Sign language'){
        this.currentTab = this.categories[0]
        this.intialTab = this.categories[0]
        this.currentTabTitle = this.categories[0].title
      }


    },
    setTrafficLevel(level) {
      this.traffic_level = level;
    },
    setViewsLevel(level) {
      this.views_level = level;
    },
    setFaq(){
      const typeObj = this.types.find(_it => _it.name === this.currentType.name);
     if(typeObj){
      this.currentFaq = typeObj.faqs[0].name
      this.selectedQuestion   = typeObj.faqs[0]
     }
    }

  },
  getters: {
    getType: (state) => (type) => {
     return  state.types.find((t) => t.title === type);
    },
    getPackageDetails: (state) => (typeString, highlightText, page) => {
      const type = state.types.find((t) => t.name === state.currentType.name);
 
      return type
    },
getTabDetails: (state) => (tab, highlightText, page) => {
  const type = state.categories.find((t) => t.name === state.currentTab.name);
  if (type) {
    let color_title = type.color_title;

    if (highlightText && color_title.includes(highlightText)) {
      const { $i18n } = useNuxtApp();

      // Ensure highlightText is a valid translation key
      const translatedText = $i18n.t(highlightText);

      // If the key does not exist, it will just return the highlightText itself
      let highlightedHtml = `<span class="bg-gradient-to-br from-[#46A095] via-[#46A095] to-[#17159D] text-transparent bg-clip-text">${translatedText}</span>`;

      switch (page) {
        case 'signlang':
          color_title = color_title.replace(highlightText, highlightedHtml);
          break;
        case 'bundle':
          color_title = color_title.replace(highlightText,
            `<span class="bg-gradient-to-br  from-[#2DADA3]  to-[#3A4D8F] text-transparent bg-clip-text">${translatedText}</span>`);
          break;
        case 'translate':
          color_title = color_title.replace(highlightText, `<span class="text-[#0AACA1]">${translatedText}</span>`);
          break;
        case 'media':
          color_title = color_title.replace(highlightText,
            `<span class="bg-gradient-to-r  from-[#31A69F]  via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text">${translatedText}</span>`);
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
// getTabDetails: (state) => (tab, highlightText, page) => {
//   const type = state.categories.find((t) => t.name === state.currentTab.name);

//   return type ? type : false

// },
    getFaqBasedOnType() {
      const typeObj = this.types.find(_it => _it.name === this.currentType.name);
      // this.currentFaq =  typeObj.faqs[0].name ;
      // alert(this.currentFaq)
      return typeObj ? typeObj.faqs : [];
    },
    // },
    getPackageByTypeAndCategory: (state) => (typeofpck) => {
      state.loadingData = true

      let filteredPackages = state.packages
      .filter(pkg => pkg.type === state.currentType.name && pkg.package_type === typeofpck)
      .sort((a, b) => a.sort - b.sort); // Sorting by the 'sort' field
    
    
    if (state.currentTab && state.currentTab.name !=='') {
      console.log(filteredPackages)
      filteredPackages = filteredPackages
      .filter(pkg => 
        pkg.category === state.currentTab.name
      )
      // .filter((pkg, index, self) => 
      //   index === self.findIndex(p => p.name === pkg.name) 
      // );
    
      
          }

    // console.log('yea man', filteredPackages)
    state.loadingData = false

    return filteredPackages;

    },
    
    getAddonsOrExtras: (state) => (packageType) => {
      let filteredPackages = state.packages.filter(pkg => 
        pkg.type === state.currentType.name && 
        pkg.package_type === packageType
      );
      
      
      if (state.currentTab) {
        filteredPackages = filteredPackages.filter(pkg => 
          pkg.type === state.currentType.name &&   pkg.category === state.currentTab.name
        )
        .filter((pkg, index, self) => 
          index === self.findIndex(p => p.name === pkg.name) 
        );
      }

      return filteredPackages;
    },

    getTraffiPrices: (state) => (packageType) => {
      let filteredPackages = state.packages.filter(pkg =>
          pkg.type === state.currentType.name &&
          pkg.package_type === packageType
      );
      const result = filteredPackages.flatMap(pkg =>
        pkg.package_price_role.map(item => ({
          name: item.title,
          to_traffic: item.to_traffic,
          id: item.name,
          idx: item.idx
        }))
      ).sort((a, b) => a.idx - b.idx); 
      
 
      return result;
  },

  getPackagesByPricingAndViews: (state) => (packageType, selectedTrafficTitle) => {
    // Filter packages based on the current type and package type
    const filteredB =  state.packages
      .filter(pkg =>
        pkg.type === state.currentType.name &&
        pkg.package_type === packageType &&
        pkg.package_price_role.some(item => item.title === selectedTrafficTitle)
      ).sort((a, b) => a.sort - b.sort)
      .map(pkg => {
        // Find the specific `package_price_role` entry that matches the `selectedTrafficTitle`
        const priceRole = pkg.package_price_role.find(item => item.title === selectedTrafficTitle);
        // Return the package along with the desired fields from `package_price_role`
        return {
          ...pkg,
          // Add fields from the matched price role
          cost_before_month: priceRole.cost_before_month,
          cost_year: priceRole.cost_year,
          cost_month: priceRole.cost_month,
          cost_3_month: priceRole.cost_3_month,
          cost_investor: priceRole.cost_investor,
          is_contact_us: priceRole.is_contact_us,
          data_cost_month: priceRole.data_cost_month,
          cost_yearly: priceRole.cost_yearly,
          discount_month: priceRole.discount_month,
          discount_3_month: priceRole.discount_3_month,
          discount_yearly: priceRole.discount_yearly,
        };
      });
      return filteredB
},



},

// persist: {
//   storage: sessionStorage,
// },


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePackgesStore, import.meta.hot));
}
