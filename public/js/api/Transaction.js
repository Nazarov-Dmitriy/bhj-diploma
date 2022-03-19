/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {

    static URL = '/transaction';

    onSubmit(data) {
        Entity.create(data, (err, response) => {
            callback(err, response);           
        });               
    }  
}