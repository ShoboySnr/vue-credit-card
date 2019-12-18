<template>
    <v-flex id="credit-card-demo">
        <div class="vue-credit-card" :class="className">
            <div class="card-form-and-image" :style="{flexDirection: direction}">
                <div class="credit-card-image" v-if="!noCard">
                    <div class="creditcard" :class="{flipped}" @click="flipped = !flipped">
                        <Front :cardNumber="form.cardNumber"
                            :expiration="form.expiration"
                            :name="form.name"
                            :isTwoDigitsYear="isTwoDigitsYear"
                            :color="color">
                            <div slot="card-icon" id="ccsingle">
                                <component :is="cardInnerIcon"/>
                            </div>
                        </Front>
                        <Back :nameBack="form.name"
                            :security="form.security"
                            :color="color"/>
                    </div>
                </div>
                <div class="credit-card-form">
                <div class="field-group">
                    <div class="field">
                        <label for="card-number">{{ trans.card.label}}</label>
                        <input type="text"
                            name="card_number"
                            id="card-number"
                            ref="cardNumber"
                            pattern="[0-9 ]*"
                            inputmode="numeric"
                            :placeholder="trans.card.placeholder"
                            @focus="flipped = false">
                        <svg class="ccicon" width="750" height="471" viewBox="0 0 750 471" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <component :is="cardIcon"/>
                        </svg>
                    </div>
                    <div class="field">
                        <label for="expirationdate">{{ trans.expiration.label}} (mm/{{isTwoDigitsYear ? 'yy' : 'yyyy'}})</label>
                        <input type="text"
                            name="expiration_date"
                            id="expirationdate"
                            pattern="[0-9\/]*"
                            ref="expiration"
                            :placeholder="isTwoDigitsYear ? '03/24' : '03/20224'"
                            inputmode="numeric"
                            @focus="flipped = false">
                    </div>
                </div>
                    <div class="field-group">
                        <div class="field">
                            <label for="securitycode">{{ trans.security.label}}</label>
                            <input type="text"
                                name="security_code"
                                id="securitycode"
                                ref="security"
                                pattern="[0-9]*"
                                :placeholder="trans.security.placeholder"
                                inputmode="numeric"
                                @focus="flipped = true">
                        </div>
                        <div class="field">
                            <label for="postalCode">{{ trans.postalCode.label}} </label>
                            <input type="text"
                                name="postal_code"
                                id="postal_code"
                                pattern="[0-9\/]*"
                                ref="postal_code"
                                :placeholder="trans.postalCode.placeholder"
                                inputmode="numeric">
                        </div>
                    </div>
                    <div class="field">
                        <v-checkbox v-model="next_time" label="Use this card for next time purchase"></v-checkbox>
                    </div>
                    <div class="field">
                        <v-col>
                            <v-row
                                align="center"
                                justify="space-between"
                            >
                            <v-btn block large color="primary" class="font-weight-bold add-button">Add card</v-btn>
                            </v-row>
                        </v-col>
                    </div>
                </div>
                <br /><br />
            </div>
        </div>
    </v-flex>
</template>

<script>
import IMask from 'imask';
import cardTypes from '../../cardTypes';
import {cardMasks, expirationMask, securityMask} from '../../masks';
import {Front, Back, Total} from '../cards';
import * as InputIcons from '../icons';
import * as CardIcons from '../singles';

const formDefaults = {
    name: '',
    cardNumber: '',
    expiration: '',
    security: ''
};

const masksDefaults = {
    cardNumberMask: null,
    expirationDateMask: null,
    securityCodeMask: null
};

const defaultColor = 'grey';

const defaultTranslations = {
    name: {
        label: 'Name',
        placeholder: 'Full Name'
    },
    card: {
        label: 'Credit card number',
        placeholder: '4324 5433 9382 1030'
    },
    expiration: {
        label: 'Expiration',
        placeholder: '03/24'
    },
    security: {
        label: 'Security code',
        placeholder: '420'
    },
    postalCode: {
        label: 'Postal Code',
        placeholder: '10119'
    }
}

// Source reference: https://codepen.io/quinlo/pen/YONMEa
export default {
    props: {
        trans: {
            type: Object,
            default: () => (defaultTranslations)
        },
        direction: {
            type: String,
            default: 'row',
            validator(value) {
                return ['row', 'column'].includes(value)
            }
        },
        className: {
            type: String,
            default: ''
        },
        noCard: {
            type: Boolean,
            default: false
        },
        yearDigits: {
            type: Number,
            default: 2,
            validator(value) {
                return [2, 4].includes(value)
            }
        }
    },
    mounted() {
        this.defineMasks();
        this.setMasksListeners();
    },
    data() {
        return {
            flipped: false,
            cardType: 'Visa',
            cardIcon: null,
            cardInnerIcon: CardIcons['Visa'],
            color: 'lime',
            masks: masksDefaults,
            form: formDefaults
        };
    },
    methods: {
        defineMasks() {
            //Mask the Credit Card Number Input
            this.cardNumberMask = new IMask(this.$refs.cardNumber, cardMasks);

            //Mask the Expiration Date
            this.expirationDateMask = new IMask(this.$refs.expiration, expirationMask(this.isTwoDigitsYear));

            //Mask the security code
            this.securityCodeMask = new IMask(this.$refs.security, securityMask);
        },
        setMasksListeners() {
            // Update expiration date field
            this.expirationDateMask.on('accept', () => this.form.expiration = this.expirationDateMask.value);

            // Update security code field
            this.securityCodeMask.on('accept', () => this.form.security = this.securityCodeMask.value);

            // Update card number field and card icon
            this.cardNumberMask.on('accept', () => {
                const cardName = this.cardNumberMask.masked.currentMask.cardtype;
                this.form.cardNumber = this.cardNumberMask.value;

                if (cardTypes.hasOwnProperty(cardName)) {
                    const card = cardTypes[cardName];

                    this.cardIcon = InputIcons[card.name];
                    this.cardInnerIcon = CardIcons[card.name];
                    this.cardType = card.name;
                    this.setColor(card.color);
                    return;
                }

                this.resetCardDefaults();
            });
        },
        resetCardDefaults() {
            this.cardIcon = null;
            this.cardInnerIcon = null;
            this.cardType = null;
            this.setColor();
        },
        setColor(colorName) {
            this.color = colorName || defaultColor;
        }
    },
    computed: {
        isTwoDigitsYear() {
            return this.yearDigits === 2;
        },
        fields() {
            return [this.form.name, this.form.cardNumber, this.form.expiration, this.form.security].join('');
        }
    },
    watch: {
        fields() {
            this.$emit('change', Object.assign({}, this.$data.form));
        },
        cardType(val) {
            this.$emit('cardChanged', val);
        }
    },
    components: {
        Front,
        Back,
        Total
    }
}
</script>

<style lang="scss">

</style>
