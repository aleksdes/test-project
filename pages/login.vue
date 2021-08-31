<template>
  <div id="login" class="login">
    <div class="login-form">
      <img class="login-form_logo" src="/img/logo.png" />
      <h2 class="login-form_title">Sign in to continue.</h2>
      <input
        v-model="email"
        type="email"
        class="login-form_input"
        placeholder="Email"
        autofocus
        @keypress.enter="focusPass"
      />
      <input
        v-model="password"
        type="password"
        class="login-form_input"
        placeholder="Password"
        @keypress.enter="login"
      />
      <button class="login-form_button" @click="login">
        Sign In
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',

  auth: false,

  data() {
    return {
      email: 'foo@example.com',
      password: 'password'
    };
  },

  methods: {
    async login() {
      let response;
      try {
        response = await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password }
        });
      } catch (e) {
        console.log('Error LoginPage', e);
        if (e.response) {
          switch (e.response.status) {
            case 404:
              this.$store.dispatch('snackbar/setSnackbar', {
                id: Math.random(),
                color: 'basic_error',
                text: 'snack_bar_for_login_error_message_wrong_data',
                timeout: 4000
              });
              break;
            default:
              this.$store.dispatch('snackbar/setSnackbar', {
                id: Math.random(),
                color: 'basic_error',
                text: 'snack_bar_for_login_error_message_wrong_data',
                timeout: 4000
              });
              break;
          }
        } else {
          this.$store.dispatch('snackbar/setSnackbar', {
            id: Math.random(),
            color: 'basic_error',
            text: 'snack_bar_for_all_error_message_unknown_error',
            timeout: 4000
          });
        }
      }
      if (response) {
        console.log('response', this.$auth.strategy.token.get());
        this.$auth.setUser({});

        const path = this.localePath({ path: `/` });
        this.$router.push(path);
      }
    },

    focusPass() {
      document.querySelector('.login-form_input[type=password]').focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #afafaf;

  &-form {
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.18);
    padding: 20px 40px 40px 40px;
    text-align: center;
    display: flex;
    flex-direction: column;

    &_logo {
      height: 36px;
      margin: 10px auto;
    }

    &_title {
      font-family: Verdana;
      font-size: 14px;
      line-height: 21px;
      font-weight: 400;
      margin-bottom: 40px;
    }

    &_input {
      width: 425px;
      font-size: 14px;
      padding: 8px 10px 8px 15px;
      margin-bottom: 14px;
      border: 1px solid #86a4c3;
      border-radius: 5px;
    }

    &_button {
      display: block;
      width: max-content;
      padding: 12px 32px;
      align-self: flex-end;
      font-family: 'Verdana';
      font-weight: 700;
      color: #ffffff;
      cursor: pointer;
      background-color: #f64e60;
      border-radius: 5px;
    }
  }
}
</style>
