import { ref } from "vue";
export const inputRules = {
  required: (v) => !!v || "This field is required",
  invalidNegative: (v) => v >= 0 || "Invalid input",
  characters: (v) => v.length <= 50 || "Max 50 characters",
  textArea: (v) => v.length <= 500 || "Max 500 characters",
  vselect: (v) => v.length > 0 || "This field is required",
};
export const validateForm = async (formType) => {
  const form = await formType.value.validate();
  if (!form.valid) return false;
  return true;
};
export const snackBarData = ref({
  isVisible: false,
  text: "",
  type: "",
});

export const dialogData = ref({
  text: "",
  type: "",
  buttonText: "",
  buttonColor: "",
  itemId: "",
});
