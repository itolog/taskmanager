<template>
  <section class="welcom">
    <h1>Планировшик задач</h1>
    <!-- Form -->
    <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Введите имя"
      v-model="name"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-checkbox
      label="Do you agree?"
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      required
    ></v-checkbox>

    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  </section>
</template>

<script>
export default {
data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    checkbox: false
  }),

methods: {
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  submit () {
    if (this.$refs.form.validate()) {
      this.$store.commit('nameSet', this.name)
    }
  },
  clear () {
    this.$refs.form.reset()
  }
}
}
</script>

<style lang="scss" scoped>

</style>
