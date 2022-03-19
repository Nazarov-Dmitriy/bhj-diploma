/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    this.element.children[3].children[1].innerHTML = '';
    Account.list('', (err, response) => {
      response.data.forEach(element => {
        this.element.children[3].children[1].innerHTML += `<option value="${ element.id}">${ element.name}</option>`;
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else if (!response.success) {
        if (document.querySelector('.error_label') == null) {
          this.element.insertAdjacentHTML('beforeend', `<div class="error_label"> ${response.error}</div>`);;
          setTimeout(() => {
            document.querySelector('.error_label').remove();
          }, 3000);
        }
      }
    });
  }
}