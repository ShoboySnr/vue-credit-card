import Vue from 'vue';

Vue.filter('returnPrice', function(value) {
  if (!value) return 0;
  let val = (value/1).toFixed(2);
  return `₦${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
});