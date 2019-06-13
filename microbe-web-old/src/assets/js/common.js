$(function(){

    $(document).on('click','.left-menu .dropA',function(){
        $(this).children('i').toggleClass('down');
        $(this).parent('li').siblings('li').children('.dropA').children('i').removeClass('down'); 
        $(this).parent('li').siblings('li').children('.dropMenu').addClass('hide'); 
        $(this).siblings('.dropMenu').toggleClass('hide');
        $(this).parents('.firstLi').siblings('.firstLi').children('.dropMenu').addClass('hide');
    })

    //people image
    $(document).on('mouseover','.people a',function(){
        $($(this).data('id')).addClass('hover').click();
        var a = $(this).offset();
        if($($(this).data('id')).hasClass('hover')){
            $('.popup').removeClass('hide').css({
                left: a.left + $(this).width()/2 - 60,
                top: a.top + $(this).height() + 9
            });
        } 
    })    
    $(document).on('mouseout','.people a',function(){
        $($(this).data('id')).removeClass('hover');
        $('.popup').addClass('hide');       
    })
    $(document).on('mouseover','.y-data li',function(){
        $('.'+$(this).attr('id')).addClass('hover');

        $(this).click();
        var a = $('.'+$(this).attr('id')).offset();
        if($($('.'+$(this).attr('id')).data('id')).hasClass('hover')){
            $('.popup').removeClass('hide').css({
                left: a.left + $('.'+$(this).attr('id')).width()/2 - 60,
                top: a.top + $('.'+$(this).attr('id')).height() + 9
            });
        }       
    })
    $(document).on('mouseout','.y-data li',function(){
        $('.'+$(this).attr('id')).removeClass('hover'); 
        $('.popup').addClass('hide');      
    }) 
})
