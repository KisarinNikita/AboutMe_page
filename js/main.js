var mass;
var sleep = 2000;

//Заполнение массива рандомными числами
var arrayFillRandom = function(){
    var limit = 5;
    var arr = new Array(limit);
    for (var i = 0; i < limit; i++){
        arr[i] = Math.round(Math.random()*500);
    };
    return arr;
};


//Вывод эллементов массива в блок #container
var displayArray = function(mass) {
    for(var i in mass) {
      var leftStep = i * 200;
      var div = document.createElement('div')
      $(div).addClass('item')
            .attr('id', 'item-'+mass[i])
            .css({"left":""+leftStep+"px"}) //двигаем каждый новый элемент на 200px
            .html('<p>'+mass[i]+'</p>');
      $('#container').append(div);
    };
};

//Сортировка пузырьком.
//Задержка итерации реализована через callback функцию, метод setTimeout рекурсивно вызывает функцию сортировки пока массив не будет полностью отсортирован
var BubbleSort = function(mass){
  var c;
  var swapped = false;

  for(var i = 0; i < mass.length - 1; i++) {
    if (mass[i] > mass[i+1]) {
        var leftStep = i * 200; //значение свойства left для элемента который хотим поменять
        var leftStepNext = (i+1) * 200; //значение свойства left для элемента с которым хотим поменять
        $('#item-'+mass[i]).css({"left":""+leftStepNext+"px"}).addClass("animation blue"); //меняем местами и добавляем класс с анимацией
        $('#item-'+mass[i+1]).css({"left":""+leftStep+"px"}).addClass("animation blue");  //меняем местами и добавляем класс с анимацией
        c = mass[i];
        mass[i] = mass[i+1];
        mass[i+1] = c;
        swapped = false;
        break;
    } else {
      swapped = true;
    }
  }

  if(swapped) {
    $('#start').css('opacity', '0.5').attr('disabled', true);
    $('#getrand').css('opacity', '1').attr('disabled', false);
    $('.sort-status').html("Сортировка завершена!<br>заполните блоки заново");
    return 0;
  } else {
    setTimeout(function() {
        $('#item-' + mass[i]).removeClass("animation blue");
        $('#item-' + mass[i+1]).removeClass("animation blue");
      return BubbleSort(mass);
    }, sleep);
  }

};

$(document).ready(function(){
    $('#start').css('opacity', '0.5').attr('disabled', true);
    $('#getrand').click(function(){
      $('.start-item').css('display', 'none');
      $('#start').css('opacity', '1').attr('disabled', false);
      $('#getrand').css('opacity', '0.5').attr('disabled', true);
      mass = arrayFillRandom();
      $('.sort-status').html('Нажмите кнопку<br>"начать сортировку"');
      displayArray(mass);
    });

    $('#start').click(function(){
      $('.sort-status').text("Сортировка выполняется...");
      BubbleSort(mass);
    });
});
