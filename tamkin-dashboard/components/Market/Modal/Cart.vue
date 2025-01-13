<script setup>
import { useMarketStore } from "@/stores/market";
import { useModalManager } from "@/composables/useModalManager";
import { useCart } from "@/composables/useMarket";
import { useFullUrl } from "@/composables/useSharedFunctions";
const { fullUrl } = useFullUrl();

const props = defineProps({
  showModal: Boolean,
});

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData,
} = useModalManager();
const openModalAndHideChat = () => {
  openModal("requestmodal", "market");
};

const marketStore = useMarketStore();

const confirmOrder = async () => {
  // await createOrder();
  // openModal("upgrade", "market");
  navigateTo("mycart", "market", "paymentMethods_market");
};
</script>

<template>
  <div
    class="bg-selected dark:bg-p fixed z-[9999] top-[0] rtl:lg:left-0 ltr:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full lg:h-screen lg:overflow-x-hidden"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn_payment dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[24px] !cursor-pointer z-[999]"
      @click="closeModal('mycart')"
    >
      <svg
        class="w-[12px] h-[12px]"
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="w-full h-full pb-[50px]">
      <h1
        class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:px-0 px-[20px]"
      >
        {{ $t("My Cart") }}
        {{
          marketStore.cartItems.length === 0
            ? ""
            : `(${marketStore.cartItems.length})`
        }}
      </h1>
      <div
        class="flex flex-col items-center justify-between lg:overflow-x-hidden space-y-[20px] overflow-x-scroll bg-white dark:bg-tamkinDarkPrimary w-full mx-auto rounded-[10px] mt-[16px] h-full relative"
        style="box-shadow: 0px 4px 24px 8px #51459f14"
      >
        <div
          class="w-full grid grid-cols-1 px-[20px]"
          v-if="marketStore.cartItems.length"
        >
          <!-- Items List -->
          <div v-if="marketStore.cartItems.length" class="space-y-4 mt-[10px]">
            <!-- Item -->
            <div
              class="flex items-center border-b justify-between pb-4"
              v-for="(cartItem, index) in marketStore.cartItems"
              :key="cartItem.name"
            >
              <div class="flex items-center rtl:space-x-reverse space-x-4">
                <div
                  class="rounded-lg bg-[#F8F8F8] dark:bg-tamkinDarkPrimary w-[97px] h-[101px] flex items-center justify-center border"
                >
                  <img
                    v-if="!cartItem.background_color"
                    :src="cartItem.image_url"
                    alt="Top"
                    class="w-[63px] h-[67px]"
                  />

                  <div
                    v-if="cartItem.background_color"
                    class="w-[78px] h-[78px] rounded-[10px]"
                    :style="{ background: cartItem.background_color }"
                  ></div>
                </div>
                <div>
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                  >
                    <div>
                      <img
                        :src="cartItem.category_image"
                        alt="Top"
                        class="w-[26px] h-[26px]"
                      />
                    </div>
                    <div class="py-2">
                      <h3
                        class="font-[500] text-[#878787] capitalize dark:text-whiteTamkin"
                      >
                        {{ $t(cartItem.category_title) }}
                      </h3>
                    </div>
                  </div>
                  <p
                    class="text-darkGrey dark:text-whiteTamkin text-sm font-[500] rtl:text-right ltr:text-left mt-[6px] capitalize"
                  >
                    {{ $t(cartItem.item_title) }}
                  </p>
                  <button
                    v-if="cartItem.type == 'custom_character'"
                    class="text-tamkin underline font-[500] text-[13px]"
                    @click="openModalAndHideChat(), setData(cartItem)"
                  >
                    {{ $t("Edit request") }}
                  </button>
                </div>
              </div>
              <div class="flex items-end flex-col justify-start space-y-[44px]">
                <button
                  @click="marketStore.removeFromCart(cartItem)"
                  class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB] w-[32px] h-[32px] border rounded-lg flex items-center justify-center"
                >
                  <img src="/assets/imgs/icons/bin.svg" alt="" />
                </button>
                <p
                  class="text-[#021328] text-[14px] font-[500] dark:text-whiteTamkin"
                >
                  {{ $t("Price") }}
                  <span class="px-1">${{ cartItem.cost }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="sticky bg-white bottom-0 dark:bg-p inset-x-0 w-full px-[20px]"
          v-if="marketStore.cartItems.length"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="py-2 border-b dark:border-light text-[16px] leading-[30px] text-darkGrey dark:text-whiteTamkin font-[600] ltr:text-left rtl:text-right"
                  colspan="12"
                >
                  {{ $t("Summary") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
              >
                <td
                  class="py-2 px-5 border-b dark:border-light rtl:text-left ltr:text-right font-[500] w-full dark:text-whiteTamkin"
                  colspan="2"
                >
                  {{ $t("Subtotal") }}
                </td>
                <td
                  class="py-2 px-1 border-b dark:border-light rtl:text-left ltr:text-right w-full font-[500] dark:text-whiteTamkin"
                  colspan="2"
                >
                  ${{ marketStore.cartSubtotal }}
                </td>
              </tr>
              <tr
                class="text-[14px] leading-[24px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                v-if="marketStore.cartDiscount"
              >
                <td
                  class="py-2 px-5 border-b dark:border-light rtl:text-left ltr:text-right font-[500] w-full dark:text-whiteTamkin"
                  colspan="2"
                >
                  {{ $t("Discount") }}
                </td>
                <td
                  class="py-2 px-1 border-b dark:border-light rtl:text-left ltr:text-right w-full font-[500] dark:text-whiteTamkin"
                  colspan="2"
                >
                  ${{ marketStore.cartDiscount }}
                </td>
              </tr>
              <tr class="text-[14px] leading-[24px] bg-[#FAFCFE] dark:bg-p">
                <td
                  class="py-2 px-5 border-b dark:border-light rtl:text-left ltr:text-right font-[500] w-full dark:text-whiteTamkin"
                  colspan="2"
                >
                  {{ $t("Total") }}
                </td>
                <td
                  class="py-2 px-1 border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin"
                  colspan="2"
                >
                  ${{ marketStore.cartTotal }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Actions -->
          <div
            class="mt-8 flex justify-end rtl:space-x-reverse space-x-[20px] py-3"
          >
            <button
              class="btn_bordered_dashboard"
              @click="closeModal('mycart')"
            >
              {{ $t("Cancel") }}
            </button>
            <button
              class="btn-dashboard hover_tamkin max-w-[195px]"
              @click="
                () => {
                  confirmOrder();
                }
              "
            >
              {{ $t("Continue to payment") }}
            </button>
          </div>
        </div>
        <div
          class="flex items-center justify-center flex-col w-full h-full"
          v-else-if="marketStore.cartItems.length === 0"
        >
          <div>
            <img
              src="/assets/pngs/market/empty_cart.png"
              class="w-[116px] h-[110px]"
              alt=""
            />
          </div>

          <div
            class="text-[#23262F] dark:text-whiteTamkin font-[600] text-[16px] w-3/4 mt-[20px] text-center"
          >
            {{
              $t(
                "Your Cart is empty when you add products , they will appear here"
              )
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
