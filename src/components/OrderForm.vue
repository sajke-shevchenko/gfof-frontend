<template>
  <div class="container tariff">
    <v-row>
      <v-col>
        <v-card>
            <v-card-title>
              Order Form
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="name"
                  label="Name"
              ></v-text-field>
              <v-text-field
                  class="inputPhone"
                  v-model="phone"
                  label="Phone"
                  type="number"
              ></v-text-field>
              <v-text-field
                  v-model="address"
                  label="Address"
              ></v-text-field>
              <v-text-field
                  v-model="date"
                  label="Delivery date"
                  type="date"
                  :disabled="!selectedTariff.name"
              ></v-text-field>
              <v-text-field
                  v-model="selectedTariff.name"
                  label="Tariff"
                  readonly
              ></v-text-field>
            </v-card-text>
            <v-row class="m-2">
              <v-col v-for="tariff in tariffs"
                     :key="tariff.id">
                <v-card class="btn-outline-primary fill-height"
                        @click.native="selectTariff(tariff)"
                >
                  <v-card-title>
                    {{ tariff.name }}
                  </v-card-title>
                  <v-card-text>
                    <p>Price: {{ tariff.price }}</p>
                    <p>Delivery Days: {{ tariff.delivery_days.join(", ") }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
      </v-col>
    </v-row>
    <v-row class="w-50 offset-3">
      <a class="btn btn-outline-primary text-black"
             @click="create"
      >
        Create a new Order
      </a>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import axios from 'axios'

export default {
  name: "OrderForm",
  data() {
    return {
      rules: {
        age: [
          val => val < 10 || `I don't believe you!`,
        ],
        animal: [val => (val || '').length > 0 || 'This field is required'],
        name: [val => (val || '').length > 0 || 'This field is required'],
      },

      date: null,
      name: null,
      phone: null,
      address: null,
      selectedTariff: {
        name: null,
      },
    }
  },
  created() {
    this.loadTariffs();
  },
  computed: {
    ...mapState(['tariffs']),
  },
  methods: {
    ...mapActions([
        'loadTariffs',
    ]),

    /** Create a new order **/
    async create () {
      const data = {
        delivery_date: this.date,
        name: this.name,
        phone: this.phone,
        address: this.address,
        tariff_id: this.selectedTariff.id,
      }
      await axios.post('http://localhost:8000/api/orders', data)
          .then(() => this.$notify({type: 'success', text: 'Successfully created'}))
          .then(() => this.clearFields())
          .catch(error => this.$notify({type: 'error', text: error.response.data.message }));
    },

    /** Select the tariff **/
    selectTariff(tariff) {
      this.selectedTariff = tariff;
    },

    clearFields() {
      this.date = null;
      this.name = null;
      this.address = null;
      this.phone = null;
      this.selectedTariff = {name: null};
    }
  }
}
</script>

<style scoped>
  .tariff {
    text-align: left;
  }

  .inputPhone >>> input[type="number"] {
    -moz-appearance: textfield;
  }
  .inputPhone >>> input::-webkit-outer-spin-button,
  .inputPhone >>> input::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
</style>