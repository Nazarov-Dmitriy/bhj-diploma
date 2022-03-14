/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */

  onSubmit(data) {
    User.register(data, (err, response) => {
      if (response !== undefined && response.success) {
        App.getForm('register').element.reset();
        App.setState('user-logged');
        App.getModal('register').close();
      } else if (response !== undefined) {
        if (document.querySelector('.error_label') == null) {
          App.getForm('register').element.insertAdjacentHTML('beforeend', `<div class="error_label"> ${err}</div>`);;
          setTimeout(() => {
            document.querySelector('.error_label').remove();
          }, 3000);
        }
      }
    });
  }
}