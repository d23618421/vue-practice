<template>
  <v-dialog
    v-model="modal"
    width="400"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="warning"
        dark
        v-on="on"
      >
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Edit Ad
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          name="title"
          label="Title"
          type="text"
          v-model="editedTitle"
        ></v-text-field>
        <v-textarea
          name="description"
          label="Description"
          type="text"
          v-model="editedDescription"
        ></v-textarea>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="onCancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="onSave"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.editedTitle = this.ad.title
      this.editedDescription = this.ad.description
      this.modal = false
    },
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })

        this.modal = false
      }
    }
  }
}
</script>

<style scoped>

</style>
