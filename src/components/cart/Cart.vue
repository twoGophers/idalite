<template>
    <div class="cart">
        <div class="cart__header header">
            <div class="header-title">
                Добавление товара
                <div class="header-title__burger" @click="showFormItem = !showFormItem">
                        <img  :src="require('../../assets/images/menu-button_icon-icons.com_74261.svg')" :alt="require('../../assets/images/menucircularbutton_79284.svg')">
                </div>
                
            </div>
            <div class="header-filter filter" @click="clickFilter = !clickFilter">
                <div class="filter-header">
                    <p>По умолчанию</p>
                    <div class="filter__vector" :style="[clickFilter ? {transform: `rotate(45deg)`} : {transform: `rotate(-45deg)`}]"></div>
                </div>
                <transition name="transmisionForm">
                    <div class="filter-man" :style="[clickFilter ? {display: `flex`} : {transform: `none`}]" v-if="clickFilter">
                        <p @click="filterName">Имя</p>
                        <p @click="filterMin">Min</p>
                        <p @click="filterMax">Max</p>
                    </div>
                </transition>
            </div>
        </div>
        <div class="cart__main main">
            <transition name="transmisionForm">
            <form @submit="onCheckForm" class="main__form form" v-if="showFormItem">
                <div class="form-item item1">
                    <label class="form-item__label" for="name">Наиминование товара</label>
                    <input class="form-item__input" v-model="modalName" placeholder="Введите наиминование товара" type="text" name="name" id="" >
                    <label class="from-item__opacity" for="name">{{errorName}}</label>
                </div>
                <div class="form-item item2">
                    <label class="hideClipse" for="content">Описание товара</label>
                    <textarea class="form-item__input" v-model="modalContent" placeholder="Введите описание товара" style="height : 112px" type="text" name="content" id="" ></textarea>
                    <label class="from-item__opacity" for="content">{{errorContent}}</label>
                </div>
                <div class="form-item item3">
                    <label class="form-item__label" for="images">Ссылка на изображение товара</label>
                    <input class="form-item__input" v-model="modalImages" placeholder="Введите ссылку" type="text" name="images" id="" >
                    <label class="from-item__opacity" for="images">{{errorImages}}</label>
                </div>
                <div class="form-item item4">
                    <label class="form-item__label" for="price">Цена товара</label>
                    <input class="form-item__input"  v-model="modalPrice" placeholder="Введите цену" type="number" name="price" id="" >
                    <label class="from-item__opacity" for="price">{{errorPrice}}</label>
                </div>
                <button class="form-btn" :style="[isButtonDisabled ? {background : '#EEEEEE', color : '#B4B4B4'} : {background : '#7BAE73', color : '#FFFFFF'}]" type="submit" :disabled="isButtonDisabled" >Добавить товар</button>
            </form>
            </transition>
            <div class="main__cartProduct">
                <CartItem 
                v-for="item in this.activeCart"
                :key="item.id"
                :cart_item="item"
                @removeCartItem="removeCartItem"
                ></CartItem>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
    data() {
        return {
            List : [
                { 
                    id : 1,
                    status : null,
                    name : 'Товар',
                    content : 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    images : 'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
                    price : 10000
                },
                { 
                    id : 2,
                    status : null,
                    name : 'Наименование товара',
                    content : 'Довольно-таки ',
                    images : 'https://icocnews.ru/wp-content/uploads/2015/09/priroda.jpg',
                    price : 10000
                },
                { 
                    id : 3,
                    status : null,
                    name : 'Наименование товара',
                    content : 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    images : 'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
                    price : 10000
                },
                { 
                    id : 4,
                    status : null,
                    name : 'Наименование товара',
                    content : 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    images : 'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
                    price : 1000
                },
            ],
            modalName : '',
            modalContent : '',
            modalImages : '',
            modalPrice : '',
            //error
            errorName : '',
            errorContent : '',
            errorImages : '',
            errorPrice : '',

            //Button
            isButtonDisabled : true,

            activeCart : [],

            //Filter
            clickFilter : false,

            //Form widht < 550px
            showFormItem : true,
            width : window.innerWidth,
            height : window.innerHeight
        }
    },
    
    components : {
        CartItem
    },
    methods : {
        onCheckForm: function(e) {
            e.preventDefault();
            this.activeCart.push({
            id : this.activeCart.index,
            name : this.modalName,
            content : this.modalContent,
            images : this.modalImages,
            price : this.modalPrice
            })
            this.modalName = '';
            this.modalContent = '';
            this.modalImages = '';
            this.modalPrice = '';

            console.log(this.activeCart);

            this.saveList();  
        },

        validateModalName(value) {
            if(value == '') {
                this.errorName = 'Поле является обязательным';
            } else {
                this.errorName= '';
                this.modalName = value;
            }
        },
        validateModalContent(value) {
            if(value == '') {
                this.errorContent = 'Поле является обязательным';
            } else {
                this.errorContent = '';
            }
        },
        validateModalImages(value) {
            if(value == '') {
                this.errorImages = 'Поле является обязательным';
            } else {
                this.errorImages = '';
            }
        },
        validateModalPrice(value) {
            if(value == '') {
                this.errorPrice = 'Поле является обязательным';
            } else {
                this.errorPrice = '';
            }
        },
//Button fotm
        showBtn: function() {
            if(this.modalName && this.modalContent && this.modalImages && this.modalPrice) {
                this.isButtonDisabled = false;
            } else {
                this.isButtonDisabled = true;
            }
        },
//Remove cart item from catalog
        removeCartItem(itemCart) {
            this.activeCart.map(item => {
                let index = this.activeCart.indexOf(item);
                if(item == itemCart) {
                    this.activeCart.splice(index, 1);
                    this.saveList();
                } else {
                    return this.activeCart;
                }
            })
        },

//Save List
        saveList : function() {
            const parsed = JSON.stringify(this.activeCart);
            localStorage.setItem('List', parsed);
        },

//Show filter
        showFilter : function() {
            this.clickFilter = true;
        },
//Filter Name
        filterName : function() {
            this.activeCart = this.activeCart.sort((a, b) => a.name.localeCompare(b.name));
        },
//Filter Min
        filterMin : function() {
            this.activeCart.sort((prev, curr) => prev.price - curr.price);
        },
//Filter Max
        filterMax : function() {
            this.activeCart.sort((prev, curr) => curr.price - prev.price);
        },
// width and height
        onResize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if(this.width < 550) {
                this.showFormItem = false;
            } else {
                this.showFormItem = true;
            }
        },
    },
    watch : {
        modalName(value) {
            this.modalName = value;
            this.showBtn();
            this.validateModalName(value);
        },
        modalContent(value) {
            this.modalContent = value;
            this.showBtn();
            this.validateModalContent(value);
        },
        modalImages(value) {
            this.modalImages = value;
            this.showBtn();
            this.validateModalImages(value);
        },
        //??Number
        modalPrice(value) {
            let test = this.modalPrice;
            value = test.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            this.showBtn();
            this.validateModalPrice(value);
        },
    },

    mounted() {
        this.activeCart = this.List;
        if(localStorage.getItem('List')) {
            try {
                this.activeCart = JSON.parse(localStorage.getItem('List'));
            } catch(e) {
                localStorage.removeItem('List');
            }
        }
    },
//winth and heigth
    created() {
        window.addEventListener("resize", this.onResize);
    },

    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },

}
</script>

<style lang="scss" scoped>
@import "../../assets/style/Mixim.scss";

.cart {
    width: 100%;
    display: flex;
    flex-direction: column;
    .header {
        width: 100%;
        height: 7vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 30;
        .header-title {
            color: #3F3F3F;
            letter-spacing: 0.01em;
            font-family: $ssPro;
            @include font ($fz28, $fw6, $lh35, $fsn);
            display: flex;
            flex-direction: row;
            .header-title__burger {
                display: none;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                margin-left: 0%;
                img {
                    width: 50%;
                }
            }
        }
        .header-filter{
            height: 70%;
            width: 123px;
            background: #FFFEFB;
            padding: 0px 11px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            position: relative;
            transition: 0.5s;
            cursor: pointer;
            &:hover {
                background: rgb(245, 245, 245);
                color: white;
            }
            .filter-header{
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-top: 10%;
                p{
                    font-family: $ssPro;
                    color: #B4B4B4;
                    @include font ($fz12, $fw4, $lh15, $fsn);
                }
                .filter__vector {
                    border: 1px solid #B4B4B4;
                    border-width: 0 1px 1px 0;
                    display: inline-block;
                    padding: 2px;
                    margin-left: -4px;
                    transition: 0.5s;
                }
            }
            .filter-man {
                position: absolute;
                width: 100%;
                margin-left: -9%;
                margin-top: 12%;
                background: #FFFEFB;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                z-index: 10;
                display: none;
                flex-direction: column;
                transition: 0.5s;
                overflow: hidden;
                p {
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.185);
                    font-family: $ssPro;
                    color: #B4B4B4;
                    @include font ($fz12, $fw4, $lh15, $fsn);
                    margin: 1%;
                    transition: 0.5s;
                    &:hover {
                        background: #e2e2e2;
                        color: white;
                    }
                }
            }
            
        }
    }
    .main {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        .main__form{
            width: 24.1%;
            height: 59.5vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #FFFEFB;
            box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
            border-radius: 4px;
            .form-item {
                width: 85%;
                display: flex;
                flex-direction: column;
                position: relative;
                line-height: 17px;
                .form-item__label, .hideClipse, .from-item__opacity{
                    color: #49485E;
                    font-family: $ssPro;
                    letter-spacing: -0.03em;
                    //margin-top: 1px;
                    @include font ($fz10, $fw4, $lh13, $fsn);
                }
                .form-item__label::after {
                    content: "●";
                    color: #FF8484;
                    width: 4px;
                    height: 4px;
                    margin-top: -5px;
                    position: absolute;
                }
                
                textarea {
                    resize: none;
                    padding-top: 5.5%;
                    font-family: $ssPro;
                    color :#3F3F3F;
                    @include font ($fz12, $fw4, $lh14, $fsn);
                }
                textarea::placeholder {
                    font-family: $ssPro;
                    padding-top: 4.5%;
                    @include font ($fz12, $fw4, $lh15, $fsn);
                    color: #B4B4B4;
                    letter-spacing: -0.001em;
                }
                input::placeholder {
                    font-family: $ssPro;
                    @include font ($fz12, $fw4, $lh15, $fsn);
                    color: #B4B4B4;
                }
                .form-item__input {
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    height: 5.3vh;
                    letter-spacing: -0.001em;
                    padding-left: 5.4%;
                    padding-top: 3px;
                    font-family: $ssPro;
                    color :#3F3F3F;
                    @include font ($fz12, $fw4, $lh15, $fsn);
                }
                .from-item__opacity {
                    height: 13px;
                    color: rgb(245, 78, 78);
                }
            }
            .form-btn {
                width: 85%;
                padding: 10px;
                border-radius: 10px;
                font-family: $int;
                @include font ($fz12, $fw6, $lh15, $fsn);
                text-align: center;
                letter-spacing: -0.02em;
                transition: all 1s ease-out;
                margin-top: 12px;
            }
            .item1 {
                margin-top: 24px;
            }
            .item2 {
                margin-top: 3px;
            }
            .item3 {
                margin-top: 3px;
            }
            .item4 {
                margin-top: 4px;
            }
        }
        .main__cartProduct{
            width: 74.7%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            column-gap: 16px;
            row-gap: 16px;
        }
    }
}

@media screen and (max-width: 1200px) {
    .cart {
        .main {
            .main__cartProduct{
                justify-content: space-around;
            }
        }
    }
}

@media screen and (max-width: 980px) {
  .cart {
        .header{
            width: 90%;
            margin: 0 auto;
            z-index: 20;
        }
        .main {
            .main__form{
                width: 40%;
                height: 65vh;
            }
            .main__cartProduct{
                width: 60%;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .cart {
        .main {
            .main__form{
                width: 50%;
                height: 65vh;
            }
            .main__cartProduct{
                width: 50%;
            }
        }
    }
}
@media screen and (max-width: 600px) {
  .cart {
        .main {
            .main__form{
                width: 50%;
            }
            .main__cartProduct{
                width: 50%;
            }
        }
    }
}
@media screen and (max-width: 550px) {
  .cart {
      .header{
          .header-title{
              width: 70%;
              font-size: 4vw;
              .header-title__burger{
                  display: flex;
                  width: 25px;
                  height: 25px;
                  margin-left: 5%;
                  margin-top: 2%;
                  transition: 0.5s;
                  background: #faf9f9;
                  box-shadow: 0px 0px 4px 0px rgba(97, 134, 163, 0.2);
                  &:hover {
                    background: #ebeaea;
                    box-shadow: 0px 0px 4px 0px rgba(97, 134, 163, 0.2);
                  }
              }
          }
      }
        .main {
            flex-direction: column;
            width: 100%;
            .main__form{
                width: 100%;
                height: 70vh;
                margin: 0 auto;
                margin-bottom: 3%;
                position: absolute;
                box-shadow: 0px 0px 4px 0px rgba(97, 134, 163, 0.2);
                z-index: 5;
            }
            .main__cartProduct{
                width: 100%;
            }
        }
    }
}

@media screen and (max-width: 400px) {
      .cart {
          justify-content: space-around;
      .header{
          .header-title{
              font-size: 4vw;
              
          }
      }
    }
}


//Animation
.transmisionForm-enter-active {
  animation: showForm 1s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.transmisionForm-leave-active {
  animation: showForm 1s reverse;
}
@keyframes showForm {
    0%{margin-top: -100%; opacity: 0;}
    100%{margin-top: 0%; opacity: 1;}
}
</style>