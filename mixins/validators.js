export default {
  methods: {
    //Поле обязательно для заполнения
    fieldRequiredRules() {
      return [v => !!v || 'validate_field_required'];
    },

    //Необходимо ввести е-мейл || Е-мейл должен быть правильным
    emailReqRules() {
      return [
        v => !!v || 'validate_field_required',
        v =>
          (!!v && !!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(v)) ||
          'validate_email_invalid'
      ];
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
    phoneReqRules() {
      return [
        v => !!v || 'validate_field_required',
        v =>
          (!!v &&
            !!v.match(
              /^[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*$/
            )) ||
          'validate_phone_invalid'
      ];
    },
    //Похоже, вы ввели неправильный номер телефона
    phoneRules() {
      return [
        v =>
          (!!v &&
            !!v.match(
              /^[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*\d[+-\s()]*$/
            )) ||
          'validate_phone_invalid'
      ];
    },

    //Введите имя
    firstnameRules() {
      return [v => !!v || 'validate_field_required'];
    },

    //Введите роль
    roleRules() {
      return [v => !!v || 'validate_field_required'];
    }
  }
};
