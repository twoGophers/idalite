<template>
    <transition name="itemCart">
        <div class="cart-item" @mouseover="showCart(cart_item)" @mouseleave="hideCart(cart_item)">
            <div class="cart-item__img">
                <img :src="cart_item.images" :alt="require('../../assets/images/test.jpg')">
            </div>
            <div class="cart-item__content item">
                <div class="item-title">
                    {{cart_item.name}}
                </div>
                <div class="item-content">
                    {{cart_item.content}}
                </div>
                <div class="item-price">
                    {{cart_item.price}} руб.
                </div>
            </div>
            <transition name="cartDelete">
                <div class="cart-delete " v-show="showCartIcon" @click="removeItem(cart_item)">
                    <img :src="require('../../assets/images/delete1.svg')" alt="require('../../assets/images/delete1.svg')" >
                </div>
            </transition>
        </div>
    </transition>

</template>

<script>
export default {
    props : {
        cart_item : {
            type : Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            showCartIcon : false,
        }
    },
    methods : {
        showCart : function() {
            this.showCartIcon = true;
        },
        hideCart : function() {
            this.showCartIcon = false;
        },
        removeItem : function(item) {
            this.$emit('removeCartItem', item);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/Mixim.scss";

.cart-item{
    width: 30%;
    height: 57.2vh;
    display: flex;
    flex-direction: column;
    background: #FFFEFB;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        box-shadow: 0 6px 6px -4px rgba(0, 0, 0, .5);
        margin-top: -3px;
    }
    &__img {
        width: 100%;
        height: 47.1%;
        img {
            width: 100%;
            height: 100%;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
    }
    &__content {
        height: 52.9%;
        padding: 16px;
        display: flex;
        flex-direction: column;
        .item-title {
            color: #3F3F3F;
            font-family: $ssPro;
            letter-spacing: 0.01em;
            @include font ($fz20, $fw6, $lh25, $fsn);
        }
        .item-content {
            margin-top: 5.6%;
            height: 61.5%;
            color: #3F3F3F;
            font-family: $ssPro;
            letter-spacing: -0.001em;
            @include font ($fz16, $fw4, $lh20, $fsn);
            overflow: scroll;
        }
        .item-price{
            color: #3F3F3F;
            font-family: $ssPro;
            letter-spacing: 0.01em;
            @include font ($fz24, $fw6, $lh30, $fsn);
        }
    }
    .cart-delete{
        position: absolute;
        top: -10px;
        right: -10px;
        width: 32px;
        height: 32px;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FF8484;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        transform: translate(1);
        img {
            width: 50%;
            height: 50%;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        }
    }
}

//Animation cart item
.itemCart-enter-active {
    animation: showCartItem 0.5s reverse;
}
.itemCart-leave-active {
    animation: showCartItem 0.5s reverse;
}
@keyframes showCartItem {
    0%{opacity: 0;}
    100%{opacity: 1;}
}
//Animation cart delete
.cartDelete-enter-active {
    animation: showCartDelete 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.cartDelete-leave-active {
    animation: showCartDelete 0.5s reverse;
}
@keyframes showCartDelete {
    0%{opacity: 0;}
    100%{opacity: 1;}
}

@media screen and (max-width: 1200px) {
    .cart-item {
        width: 40%;
    }
}

@media screen and (max-width: 900px) {
    .cart-item {
        height: 70vh;
        width: 70%;
    }
}

@media screen and (max-width: 800px) {
  .cart-item {
        height: 70vh;
        width: 70%;
    }
}

@media screen and (max-width: 700px) {
  .cart-item {
        width: 80%;
    }
}

@media screen and (max-width: 600px) {
  .cart-item {
        width: 95%;
        height: 70vh;
    }
}

@media screen and (max-width: 550px) {
  .cart-item {
        width: 47%;
        height: 70vh;
        &__content {
            .item-price {
                @include font ($fz20, $fw6, $lh30, $fsn);
            }
        }
    }
}

@media screen and (max-width: 400px) {
  .cart-item {
        width: 80vw;
        height: 70vh;
    }
}

@media screen and (max-width: 350px) {
  .cart-item {
        width: 90vw;
        height: 70vh;
    }
}
</style>