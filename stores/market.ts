import { defineStore, acceptHMRUpdate } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useMarketStore = defineStore('market', {
  state: () => ({
currentTab:'character',
cartItems:[],
showCart:false,
requestModal:false,
resetModal:false,
characters:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'character',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'character'

    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/man.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    }
],
tops:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Top',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Top'

    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'character'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Top'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Top'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Top'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Top'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Top'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Top'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shirt.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Top'


    }
],
bgs:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/color_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Background',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/color_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Background'

    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/color_3.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Background'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/color_4.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Background'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/color_5.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Background'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/color_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Background'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/color_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Background'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/color_3.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Background'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/color_4.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Background'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/color_5.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Background'


    }
],
bottoms:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Bottom',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Bottom',
        name:'Item Name'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Bottom'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Bottom'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Bottom'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Bottom'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Bottom'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Bottom'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Bottom'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/bottom_jeans.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Bottom'


    }
],
outfits:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Outfit',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Outfit',
        name:'Item Name'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Outfit'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Outfit'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Outfit'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Outfit'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Outfit'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Outfit'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Outfit'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/outfit_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Outfit'


    }
],
caps:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/cap_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Cap',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/cap_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Cap',
        name:'Item Name'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/cap_3.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Cap'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/cap_3.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Cap'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/cap_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Cap'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/cap_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Cap'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/cap_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Cap'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/cap_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Cap'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/cap_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Cap'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/cap_2.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Cap'


    }
],
belts:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Belt',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Belt',
        name:'Item Name'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Belt'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Belt'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Belt'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Belt'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Belt'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Belt'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Belt'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/belt_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Belt'


    }
],
ties:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Tie',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Tie',
        name:'Item Name'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Tie'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Tie'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Tie'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Tie'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Tie'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Tie'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Tie'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/tie_1.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Tie'


    }
],
glasses:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Glasses',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Glasses',
        name:'Item Name'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Glasses'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Glasses'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Glasses'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Glasses'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Glasses'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Glasses'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Glasses'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/glasses.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Glasses'


    }
],
shoes:[
    {
        id:uuidv4(),
        discount:{
            percent:30,
            discountPrice:100
        },
        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:true,
        package:true,
        purchased:false,
        type:'Shoes',
        name:'Item Name'

    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:true,
        purchased:false,
        type:'Shoes',
        name:'Item Name'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Shoes'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:true,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Shoes'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:true,
        type:'Shoes'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Shoes'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Shoes'


    },
    {
        id:uuidv4(),
        discount:false,

        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Shoes'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Shoes'


    },
    {
        id:uuidv4(),
        discount:false,
        price:150,
        img:'/assets/pngs/market/shoes.png',
        description:'Fares aperiam perferendi at libero perferendis',
        applied:false,
        specialOffer:false,
        package:false,
        purchased:false,
        type:'Shoes'


    }
]
  }),
  actions: {
    openResetModal(){
        this.resetModal = !this.resetModal
    },
    openReqestModal(){
        this.requestModal = !this.requestModal
    },
    openCart(){
        this.showCart = !this.showCart
    },
    switchTabs(tab:string){
        this.currentTab = tab
    },
    addToCart(item:any){
        if(!this.cartItems.includes(item)){
            this.cartItems.push(item)
            this.animateCartIcon();

        }else{
            this.removeFromCart(item)
        }
    },
    removeFromCart(item) {
        const index = this.cartItems.indexOf(item);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
        } else {
          alert('Item not found in cart');
        }
      },
      animateCartIcon() {
     if(process.client){
        const cartIcon = document.querySelector('.animate_cart');
        cartIcon.classList.remove('animate-scale');
        void cartIcon.offsetWidth;  // Trigger reflow
        cartIcon.classList.add('animate-scale');
     }
    }
  },
  getters: {
    cartSubtotal(state) {
      return state.cartItems.reduce((sum, item) => sum + item.price, 0);
    },
    cartDiscount(state) {
      return state.cartItems.reduce((discountSum, item) => {
        if (item.discount && item.discount.discountPrice) {
          return discountSum + (item.price - item.discount.discountPrice);
        }
        return discountSum;
      }, 0);
    },
    cartTotal(state) {
      return state.cartSubtotal - state.cartDiscount;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarketStore, import.meta.hot));
}
