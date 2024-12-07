import { defineStore, acceptHMRUpdate } from "pinia";

import { useGetPackages } from "@/composables/useAddSite";
import { useCouponCode } from "@/composables/useMarket";
import { useRoute } from "vue-router";

export const useAddSiteStore = defineStore("addsite", {
  state: () => ({
    packages: [],
    currentPackage: "",
    urls: [],
    packagePayload: "",
    selectedPaymentMethod: "",
    promo: "",
    currentDiscount: 0,
    validPromo: false,
    noDiscount: false,
    loadingPromo: false,
    levelsTraffic: "",
    currentLevel: "",
    selectedCrypto: "",
    tags: [],
    validatedSites: [],
    loadingBlock: [],
    currentWebsite: "",
    sortedPlans: [],
  }),

  actions: {
    async addPromoCode() {
      this.loadingPromo = true;
      const { ApplyCoupon, noCodeFound } = useCouponCode();
      const res = await ApplyCoupon(this.promo);
      if (res) {
        if (res.isValid) {
          this.validPromo = res.isValid;
          this.currentDiscount = Number(res.discount);
          this.noDiscount = false;
          this.loadingPromo = false;
        } else {
          this.noDiscount = !res.isValid;
          this.loadingPromo = false;
        }
      }
    },

    removePromoCode() {
      if (this.promo) {
        this.validPromo = false;
        this.promo = "";
        this.noDiscount = false;
        this.currentDiscount = 0;
      }
    },
    setCurrentPackage(pack) {
      this.currentPackage = pack;
    },
    async getPackages() {
      const { getPakcagesAddSite } = useGetPackages();
      const packsdata = await getPakcagesAddSite();
      this.packages = packsdata.packages;
    },
  },
  getters: {
    getSortedPackagesAddSite: (state) => {
      const route = useRoute();
      const desiredType = "Sign language";

      const specificTypePackages = state.packages
        .filter((pkg) => pkg.type === desiredType)
        .slice(0, 3);

      const otherPackages = state.packages
        .filter((pkg) => pkg.type !== desiredType)
        .slice(0, 3);

      if (
        route.fullPath.includes("/sign-language/addons") ||
        route.fullPath.includes("/sign-language/statistics") ||
        route.fullPath.includes("/sign-language/customize") ||
        route.fullPath.includes("/sign-language/settings")
      ) {
        return specificTypePackages;
      }

      if (
        route.fullPath.includes("/addons") ||
        route.fullPath.includes("/statistics") ||
        route.fullPath.includes("/customize") ||
        route.fullPath.includes("/settings")
      ) {
        return otherPackages;
      }

      return [...specificTypePackages, ...otherPackages];
    },
  },
  persist: {
    storage: localStorage,
    paths: ["currentPackage", "packagePayload"],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddSiteStore, import.meta.hot));
}
