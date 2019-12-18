<template>
<v-container>
  <v-row id="total">
    <v-col cols="12">
      <v-row
        align="center"
        justify="space-between"
      >
      <p class="subtitle-1 font-weight-bold">
        SubTotal
      </p>
      <p class="subtitle-1 font-weight-bold">
        {{ subTotal | returnPrice }}
      </p>
      </v-row>
      <v-row
        align="center"
        justify="space-between"
      >
      <p class="subtitle-1 font-weight-bold">
        Extimated TAX
      </p>
      <p class="subtitle-1 font-weight-bold">
        {{ tax | returnPrice }}
      </p>
      </v-row>
       <v-row
        align="center"
        justify="space-between"
      >
      <p class="subtitle-1 font-weight-bold">
        Promotional Code: <v-text class="promotional-code grey--text">{{ promotional_code }}</v-text>
      </p>
      <p class="subtitle-1 font-weight-bold">
        {{ promotional | returnPrice }}
      </p>
      </v-row>
    </v-col>
  </v-row>
  <v-row id="complete-payment">
     <v-col cols="12">
      <v-row
        align="center"
        justify="space-between"
      >
      <v-btn large color="primary" class="font-weight-bold complete-button">Complete payment</v-btn>
       <p class="headline font-weight-bold text--normal">
        TOTAL: {{ totalOrder | returnPrice }}
      </p>
      </v-row>
     </v-col>
  </v-row>
</v-container>
</template>
<style scoped lang="scss">
@import '../../styles/total.scss';

</style>
<script>
import { filter } from '../../filters/filter';

export default {
  props: {
    subTotal: {
      type: Number
    },
    promotional_code: {
      type: String,
    },
    tax: {
      type: Number
    },
    promotional: {
      type: Number
    }
  },
  filters: {
    filter,
  },
  computed: {
    totalOrder() {
      return parseFloat(this.subTotal) + parseFloat(this.tax) + parseFloat(this.promotional); 
    }
  }
}
</script>