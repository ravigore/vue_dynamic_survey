<template>
  <div class="form-group row">
    <div class="col-sm-3">
      <label class="col-form-label">{{ Field }}</label>
    </div>
    <div class="col-sm-9">
      <div
        :key="index"
        class="form-check"
        v-for="(checktext, index) in Options"
      >
        <input
          class="form-check-input"
          :value="checktext"
          :name="Name"
          :checked="checkedflag"
          @click="click(checktext)"
          type="checkbox"
          v-validate="validation"
        />
        <label class="form-check-label" for>{{ checktext }}</label>
      </div>
      <span class="text-danger small">{{ errors.first(Name) }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckboxInput",
  props: ["Options", "Name", "Field", "Required", "value"],
  data() {
    return {
      checkdata: [],
      checkedflag: false,
      validation: ""
    };
  },
  created() {
    if (this.Required) {
      this.validation = "required";
    }
  },
  methods: {
    click(checktext) {
      if (this.checkdata.includes(checktext)) {
        this.checkdata.splice(this.checkdata.indexOf(checktext), 1);
      } else {
        this.checkdata.push(checktext);
      }
      this.$emit("input", this.checkdata);
    }
  }
};
</script>
