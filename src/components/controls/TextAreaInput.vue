<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label">{{ Name }}</label>
    <div class="col-sm-6">
      <textarea
        class="form-control"
        rows="3"
        :name="Name"
        :value="value"
        v-validate="validation"
        @input="$emit('input', $event.target.value)"
      />
      <span class="text-danger small">{{ errors.first(Name) }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TextAreaInput",
  props: ["Name", "Field", "Required", "Length", "value"],
  data() {
    return {
      validation: ""
    };
  },
  mounted() {},
  created() {
    if (this.Required) {
      this.validation = "required";
    }
    if (this.Length) {
      this.validation = this.validation + "|" + "max:" + this.Length;
    }
  }
};
</script>
