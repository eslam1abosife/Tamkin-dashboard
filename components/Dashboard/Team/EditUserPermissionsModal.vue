<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";
import { useModalManager } from '@/composables/useModalManager';
import {  useGetPermissions, useUpdateUserPermission, useGetUserPermissions } from '@/composables/usePermissions';
import { useInviteMember, useGetAllMembers } from '@/composables/useTeam';


const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
  setData,
} = useModalManager();

const { getPermissions, permissions, loading: getAllPermissionsLoading } = useGetPermissions();
const { userPermissions, getUserPermissions, loading: getUserPermissionsLoading } = useGetUserPermissions();

onMounted(async () => {
  await nextTick();
  const state = getData();
  await getPermissions();
  if (state.from_edit) {
    await getUserPermissions(state.name);
    if (userPermissions.value.length > 0) {
      checked.value = [...checked.value, ...userPermissions.value.map(ele => ele.tamkin_roles)];
    }
  }
})

const props = defineProps({
  showModal: Boolean
});

const checked = ref([]);
const checkAll = computed({
  get() {
    return permissions.value && checked.value.length === permissions.value.length;
  },
  set(value) {
    checked.value = value ? permissions.value.map(lang => lang.name) : [];
  }
});


const errMsg = ref(null);

// const { updateUserPermission, loading: updatePermssionLoading } = useUpdateUserPermission();
const { inviteMember, memberData, loading: submitLoading } = useInviteMember();
const { getAllTeamMember } = useGetAllMembers();

const emit = defineEmits(['onSuccess']);

const error_message=ref({error:''})
const savePermission = async () => {
  try {  
    const user = JSON.parse(localStorage.getItem('user'));

    const state=getData();

    state.permissions=checked.value
    
    // await /* updateUserPermission */(state);
    await inviteMember(state);
    getAllTeamMember(user.agency);

    emit('onSuccess', 'User added successfully!');

    closeModal('userpermissions');
  } catch (err:any) {
    errMsg.value = err;
    console.error(err);
    closeModal('userpermissions');
    openModal('invitemember');
    error_message.value.error=err
    setData(error_message.value);

  }
}
</script>

<template>
  <div v-if="isOpen('userpermissions')"
    class="fixed z-[9999] top-[50px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] lg:h-[550px] w-10/12 max-h-[80vh] "
    style="left: 50%; transform: translate(-50%, 0)">
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('userpermissions')">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="container mx-auto h-full max-h-[100%] overflow-y-scroll">
      <h1
        class="ltr:text-left rtl:text-right font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]">
        Permissions
      </h1>

      <div
        class="flex items-center rtl:space-x-reverse space-x-[12px] justify-start mt-[40px] border-[1px] border-t border-b-0 border-l-0 border-r-0 pt-[16px]">
        <div> <img src="/assets/imgs/icons/avatar_table.svg" class="w-[56px] h-[56px]" /></div>
        <div class="flex flex-col items-start justify-center">
          <div>
            <h2 class="ltr:text-left rtl:text-right font-[500] text-darkGrey dark:text-whiteTamkin text-[14px] ">
              {{ getData().firstName + ' ' + getData().lastName }}
            </h2>
          </div>
          <div>
            <h2
              class="ltr:text-left rtl:text-right font-[400] text-[#878787]  dark:text-whiteTamkin text-[13px]  leading-[27px]">
              {{ getData().email }}
            </h2>
          </div>

        </div>

        <div>

        </div>

      </div>


      <div v-loading="getAllPermissionsLoading || getUserPermissionsLoading" class="min-h-[150px]">
        <table v-if="permissions && permissions.length > 0"
          class="min-w-full divide-y divide-gray-200 dark:border-light mt-[40px] ">
          <thead>
            <tr>
              <th class="py-3   text-right text-[15px]  leading-[22.5px] font-[500] text-darkGrey
             flex items-center justify-start rtl:space-x-reverse space-x-[10px] ">
                <div>
                  <input type="checkbox" id="checkbox" class="peer sr-only   m-auto" v-model="checkAll" />
                  <label for="checkbox"
                    class="relative block border-[1px]  w-[18px] h-[18px] border-tamkin bg-whiteTamkin dark:bg-tamkinDarkPrimary rounded-[4px] peer-checked:bg-gradient-checked">
                    <svg class="peer-checked:block  absolute inset-0 m-auto w-4 h-4 text-white dark:text-darkTamkin"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </label>
                </div>
                <div class="text-[14px] leading-[22px] text-darkGrey dark:text-whiteTamkin">ALL Permissions</div>

              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-light h-[250px] overflow-y-auto">
            <tr v-for="permission in permissions " :key="permission.name">
              <td class="py-4  flex items-center rtl:space-x-reverse space-x-4">
                <div>
                  <input type="checkbox" v-model="checked" :id="`checkbox_` + permission.name" :value="permission.name"
                    class="peer sr-only ltr:ml-auto rtl:mr-auto  " number />
                  <label :for="`checkbox_` + permission.name"
                    class="relative block border-[1px]  ltr:ml-auto rtl:mr-auto w-[18px] h-[18px] border-tamkin bg-whiteTamkin rounded-[4px] peer-checked:bg-gradient-checked">
                    <svg class="peer-checked:block  absolute inset-0 m-auto w-4 h-4 text-white" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </label>
                </div>
                <span class="text-[14px] leading-[21px] font-[400] text-darkGrey">{{ permission.uniq_name }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <NoData v-else />
      </div>

      <h6 v-if="errMsg" class="text-center text-[red] font-light text-[14px] mt-[10px] !mb-[30px]"> {{ errMsg }} </h6>


      <div class="flex items-center justify-center  rtl:space-x-reverse space-x-[30px] mx-auto mt-[40px]">
        <button class="btn_bordered_dashboard normal_hover text-center w-1/6" @click="closeModal('userpermissions')">
          Cancel
        </button>
        <button :disabled="checked.length === 0 || updatePermssionLoading"
          class=" btn-dashboard hover_tamkin text-center w-1/6" @click="savePermission()">
          <div class="flex items-center justify-center">
            <div :class="updatePermssionLoading ? 'mr-2':''">
            Save
            </div>
       
             <svg  v-if="updatePermssionLoading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
           </div>
        </button>

      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
