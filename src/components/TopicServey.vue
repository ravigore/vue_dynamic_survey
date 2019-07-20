<template>
  <div class="container col-sm-6">
    <div id="nav">
      <ul class="nav nav-tabs">
        <template v-for="(data, index) in formJSON">
          <li :key="index" class="nav-item">
            <a
              disabled:isDisabled
              href="#"
              class="nav-link"
              :class="{ active: choice === data.stepName }"
              >{{ data.stepName }}</a
            >
          </li>
        </template>
      </ul>
    </div>
    <div class="tab-content">
      <template v-for="(data, index) in formJSON">
        <div :key="index" v-show="isActiveTab(data.stepName)">
          <form @submit.prevent="onSubmit(index)" :ref="'step' + index">
            <div class="col-sm-12">
              <template v-for="(field, index) in data.Controls">
                <component
                  :key="index"
                  :is="field.Type"
                  v-model="formData[field.Name]"
                  v-bind="field"
                ></component>
              </template>
            </div>
            <div class="text-right" v-show="!(index === formJSON.length - 1)">
              <button type="submit" class="btn btn-light">Next</button>
            </div>
            <div class="text-right" v-show="index === formJSON.length - 1">
              <button type="submit" class="btn btn-light">Submit</button>
            </div>
          </form>
        </div>
      </template>
    </div>
    <div class="p-3 mb-2 mt-sm-4 bg-light text-dark">{{ formData }}</div>
  </div>
</template>

<script>
import TextInput from "../components/controls/TextInput";
import NumberInput from "../components/controls/NumberInput";
import CheckboxInput from "../components/controls/CheckboxInput";
import TextAreaInput from "../components/controls/TextAreaInput";

export default {
  name: "TopicServey",
  components: { NumberInput, TextInput, CheckboxInput, TextAreaInput },
  props: [],
  data() {
    return {
      choice: "Step 1",
      formData: {},
      isDisabled: true,
      email: "",
      count: 0,
      formJSON: [
        {
          stepName: "Step 1",
          Controls: [
            {
              Field: "First Name",
              Type: "TextInput",
              Required: true,
              Length: 30,
              Name: "firstName"
            },
            {
              Field: "Last Name",
              Type: "TextInput",
              Required: true,
              Length: 30,
              Name: "lastName"
            },
            {
              Field: "Address",
              Type: "TextAreaInput",
              Required: true,
              Length: 300,
              Name: "Address"
            }
          ]
        },
        {
          stepName: "Step 2",
          Controls: [
            {
              Field: "Interested In?",
              Type: "CheckboxInput",
              Required: true,
              Options: ["Books", "TV", "Video games"],
              Name: "intrestCheck"
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  provide() {
    return {
      $validator: this.$validator
    };
  },
  methods: {
    makeActive: function(val) {
      this.choice = val;
    },
    isActiveTab: function(val) {
      return this.choice === val;
    },
    nextTab(index) {
      this.makeActive(this.formJSON[index + 1]["stepName"]);
    },
    onSubmit(index) {
      var vm = this;
      var currentForm = this.formJSON[index].Controls;
      vm.count = 0;
      this.$children.forEach(function(child) {
        var formCtrl = currentForm.filter(function(item) {
          return item.Name == child.$options.propsData.Name;
        });
        if (formCtrl.length > 0) {
          child.$validator.validateAll().then(res => {
            if (res) {
              ++vm.count;
              if (vm.count == currentForm.length) {
                if (index + 1 == vm.formJSON.length) {
                  alert("Servey Completed Successfully");
                } else {
                  vm.makeActive(vm.formJSON[index + 1]["stepName"]);
                }
              }
            }
          });
        }
      });
    }
  },
  computed: {},
  created() {},
  updated() {}
};
</script>
<style>
.tab-content {
  background-color: antiquewhite;
  padding: 30px;
}
.container {
  padding: 69px;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #495057;
  background-color: antiquewhite !important;
  border-color: #dee2e6 #dee2e6 #fff;
}
</style>
