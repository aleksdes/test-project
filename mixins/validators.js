export default {
  methods: {
    //Поле обязательно для заполнения
    fieldRequiredRules() {
      return [v => !!v || 'validate_field_required'];
    },

    //Е-мейл должен быть правильным
    emailRules() {
      return [
        v => !!v || 'validate_field_required',
        v =>
          (!!v && !!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(v)) ||
          'validate_email_invalid'
      ];
    },

    //Требуется ввести номер телефона || Похоже, вы ввели неправильный номер телефона
    phoneRules() {
      return [
        v => !!v || 'validate_field_required',
        v =>
          (!!v &&
            !!v.match(
              /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
            )) ||
          'validate_phone_invalid'
      ];
    }
};
