<template>
  <div>
    <order-form></order-form>
  </div>
</template>

<script>
import OrderForm from '@/components/OrderForm.vue'

export default {
  name: 'Orders',
  components: {
    OrderForm,
  }
}
</script>