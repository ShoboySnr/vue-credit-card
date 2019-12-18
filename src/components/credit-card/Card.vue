<template>
  <v-row>
      <CardTitle />
      <CreditCard />
      <Total subTotal=2497.00 tax=199.64 promotional_code='Z4KXLM9A' promotional=-60.00 />
  </v-row>
</template>

<style lang="scss">
@import '../../styles/card.scss';

</style>
<script>
import CreditCard from './CreditCard.vue';
import CardTitle from './CardTitle.vue';
import { Total } from '../cards';


export default {
  components: {
    CreditCard,
    Total,
    CardTitle,
  }
}
</script>