/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response !== undefined && response.success) {
        App.getForm('login').element.reset();
        App.setState('user-logged');
        App.getModal('login').close();
      } else if (response !== undefined) {
        if (document.querySelector('.error_label') == null) {
          App.getForm('login').element.insertAdjacentHTML('beforeend', `<div class="error_label"> ${err}</div>`);;
          setTimeout(() => {
            document.querySelector('.error_label').remove();
          }, 3000);
        }
      }
    });
  }
}