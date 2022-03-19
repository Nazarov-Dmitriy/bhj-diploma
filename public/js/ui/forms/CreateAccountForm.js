/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response.success) {
        App.getModal('createAccount').close();
        App.update();
      } else if (!response.success) {
        if (document.querySelector('.error_label') == null) {
          App.getForm('createAccount').element.insertAdjacentHTML('beforeend', `<div class="error_label"> ${response.error}</div>`);
          setTimeout(() => {
            document.querySelector('.error_label').remove();
          }, 3000);
        }
      }
      console.log(err);
    });
  }
}