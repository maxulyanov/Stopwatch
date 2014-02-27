$(function(){


	//Определение переменных
	var d_h =  1,
		d_m =  1,
		d_sec =  0,
		s = 0,
		init = false,
		time =  0,
		def = 	'<span class="h">' + '00' + '</span>' 
				+ ':'+ 
				'<span class="m">' + '00' + '</span>'
				+ ':' + 
				'<span class="s">' + '00' +'</span>' 
				+ '<span class="point">' + '.' + '</span>' +
				'<span class="ms">' + '00' + '</span>',
		tm = 1,
		def2 = '<span class="h">' + '00' + '</span>' 
				+ ':'+ 
				'<span class="m">' + '00' + '</span>'
				+ ':' + 
				'<span class="s">' + '00' +'</span>',
		m = 0,
		ms = 0,
		i = 0,
		hide = false;
		
	
	$('#display').html(def);


	//Запуск
	function start(){
		if(init == true) return false;
		then = new Date();
		then.setTime(then.getTime() - time); 
		init = true;
		display();
	};
	

	//Стоп
	function stop(){
		if(init == false) return false;
		init = false;
		now = new Date();
		time = now.getTime() - then.getTime();
		if(hide == false){
			$('#display').html(def);
		}
		else{
			$('#display').html(def2);
		}
		$('#display').html(result)
	};
	

	//Круг
	function circle(){
		var box = $('#box-item');
		var item = $('#display').html();
		i++
		$('<div class="circle-item"></div>').html('<span class="i">' + 'Круг ' + i + '</span>' + '<span class="dt">'+ item + '</span>').appendTo(box);
	};
	

	//Сброс
	function reset(){
		d_h =  1, d_m =  1, d_sec =  0, s = 0,
		init = false, time =  0,
		tm = 1, m = 0, ms = 0, i = 0;
		if(hide == false){
			$('#display').html(def);
		}
		else{
			$('#display').html(def2);
		}
		$('.circle-item').remove();
	};
	

	//Скрытие/Показ миллисекунд
	function showMiliSec(){
		if($('#show-ms').is(':checked')){
			$('#wrap-check').animate({
				top:  '50px'
			}, 550);
			$('.point,.ms').animate({
				opacity :  'hide'
			}, 600);
			$('#wrap-reset').animate({
				top: '38px', 
				right: '215px'
			}, 600);
			$('label[for="show-ms"]').text('Снимите, чтобы показать милисекунды -');
			hide = true;
			$('#box-item').addClass('mini-width').animate({
				'margin-top' : '60px'
			}, 550);
			console.log('check');
		}
		else{
			$('#wrap-check').animate({
				top:  '10px'
			}, 550);
			$('.point,.ms').animate({
				opacity :  'show'
			}, 600);
			$('#wrap-reset').animate({
				top: '0px', 
				right: '0px'
			}, 600);
			$('label[for="show-ms"]').text('Отметьте, чтобы скрыть милисекунды -');
			hide = false;
			$('#display').find('span').removeClass('hide');
			$('#box-item').removeClass('mini-width').animate({
				'margin-top' : '20px'
			}, 550);
			console.log('nea');
		}
	};


	//Считалка и вывод на экран
	function display(){
		if (init == true){
			now = new Date();
			time = (now.getTime() - then.getTime() - (s * 1000));
			if (time > 999) s++;
			if (s >= (m * 60)){
				d_sec = 0;
				m++;
			}
			else{
				d_sec = parseInt((ms / 100) + s);
				if(d_sec >= 60) d_sec = d_sec - ((m - 1) * 60);
			}
			if(m > (d_h * 60)){
				d_min = 1;
				d_h++;
			} 
			else{
				d_min = parseInt((ms / 100) + m);
				if(d_min >= 60) d_min = d_min-((d_h - 1) * 60);
			}
			ms = Math.round(time / 10);
			if(ms > 99) ms = 0;
			if(ms == 0) ms ='00';
			if(ms > 0 && ms <= 9) ms = '0' + ms;
			if(d_sec > 0){ 
				sec = d_sec; 
				if (d_sec < 10){ 
					sec = '0' + d_sec; 
				}
			} 
			else{
				sec = '00';
			}
			min = d_min - 1;
			if(min > 0){
				if(min < 10){
					min = '0' + min;
				}
			} 
			else{
				min = '00';
			}
			hour = d_h - 1;
			if(hour > 0){
				if(hour < 10){
					hour = '0' + hour;
				}
			} 
			else{
				hour = '00';
			}
			if(hide == false){
					result = '<span class="h">' + hour + '</span>' 
					+ ':'+ 
					'<span class="m">' + min + '</span>'
					+ ':' + 
					'<span class="s">' + sec +'</span>' 
					+ '<span class="point">' + '.' + '</span>' +
					'<span class="ms">' + ms + '</span>';
			}
			else{
				result = '<span class="h">' + hour + '</span>' 
				+ ':'+ 
				'<span class="m">' + min + '</span>'
				+ ':' + 
				'<span class="s">' + sec +'</span>' 
				+ '<span class="point hide">' + '.' + '</span>' +
				'<span class="ms hide">' + ms + '</span>';

			}		
			$('#display').html(result);
			setTimeout(function(){
					display();
			}, 10);
	    };
	};


	//Запуск функций по клику
	$('#start').on('click', function(event){
		event.preventDefault();
		start();
	});

	$('#stop').on('click', function(event){
		event.preventDefault();
		stop();
	});
	
	$('#reset').on('click', function(event){
		event.preventDefault();
		reset();
	});

	$('#circle').on('click', function(event){
		event.preventDefault();
		circle();
	});

	$('#show-ms').on('click', function(){
		showMiliSec();
	});


	//Запуск функций с клавиатуры
	function register(e) {
		if(!e) e = window.event;
		var key = e.keyCode;
		if(key == 13) start();
		if(key == 32) stop()
		if(key == 17) circle();
		if(key == 27) reset();
    }
    document.onkeydown = register;

});