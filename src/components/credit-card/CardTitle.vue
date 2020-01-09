<template>
  <div id="card-title">
    <v-flex id="total">
      <v-col cols="12">
        <v-row
        align="center"
        class="top-card-title"
        >
        <v-col class="mb-3 payment" sm="12">
          <v-text class="headline font-weight-bold">Payment Information</v-text><br />
          <v-text class="subtitle-2 grey--text">Choose your method of payment </v-text>
        </v-col>
        <v-col class="mb-3 card" sm="12">
          <v-img width="200" contain=true src="../../assets/img/creditcards.png" alt="credit-cards"></v-img>
        </v-col>
        </v-row>
      </v-col>
    </v-flex>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  
}
</script>