/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {

  static lastOptions = '';

  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    try {
      if (element) {
        this.element = element;
        this.registerEvents();
      } else {
        throw new Error('Элемент не существует');
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }


  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    document.querySelector('.content-wrapper').addEventListener('click', (e) => {
      let target = e.target;
      if (target.classList.contains('btn-danger') || target.classList.contains('fa-trash')) {
        if (target.classList.contains('remove-account')) {
          this.removeAccount();
        } else {
          this.removeTransaction(target.closest('.transaction').dataset.transactionId);
        }
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (confirm('Вы согласны удалить счет ?')) {
      let id = document.querySelector('.account.active').getAttribute('data-id');
      Account.remove({
        'id': id
      }, (err, response) => {
        if (response.success) {
          this.clear();
          App.updateWidgets();
          App.updateForms();
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    if (confirm('Вы согласны удалить транзакцию ?')) {
      Transaction.remove({
        'id': id
      }, (err, response) => {
        if (response.success) {
          App.update();
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    this.lastOptions = options;
    if (options !== undefined) {
      Account.get(options.account_id, (err, response) => {
        this.renderTitle(response.data.name);
      });
      Transaction.list(options.account_id, (err, response) => {
        document.querySelector('.content').innerHTML = '';
        this.renderTransactions(response.data);
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let arr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let data = new Date(date);

    function zero(value) {
      if (value > 9) {
        return value;
      } else {
        return '0' + value;
      }
    }
    return `${data.getDay()} ${arr[data.getMonth()]} ${data.getFullYear()} г. в ${zero(data.getHours())}:${zero(data.getMinutes())}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */

  getTransactionHTML(item) {
    document.querySelector('.content').innerHTML += `
    <div class="transaction transaction_${item.type} row" data-transaction-id="${item.id}">
        <div class="col-md-7 transaction__details">
            <div class="transaction__icon">
                <span class="fa fa-money fa-2x"></span>
            </div>
            <div class="transaction__info">
                <h4 class="transaction__title">${item.name}</h4>
                <div class="transaction__date">${this.formatDate(item.created_at)}</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
            </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    data.forEach(item => {
      this.getTransactionHTML(item);
    });
    if (data.length === 0) {
      document.querySelector('.content').innerHTML = '';
    }
  }
}