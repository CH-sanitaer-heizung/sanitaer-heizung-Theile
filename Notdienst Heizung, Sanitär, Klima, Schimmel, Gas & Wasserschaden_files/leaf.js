// JavaScript Document
(function($) { //use strict 

jQuery(document).ready(function(e) {
	jQuery('.top-tab-link').click(function() {
		jQuery('.top-tab-link').removeClass('active');
		jQuery(this).addClass('active');
	});
	//search toggle focus
	jQuery('.search-toggle').click(function(e) {
		jQuery('body').toggleClass('enable-search');
		if(jQuery('body').hasClass('enable-search')){
			//jQuery('.search-field').focus();
		}
		return false;
	});
	//improve mobile menu
	jQuery('.mobile-menu li a').click(function(){
		jQuery('body').removeClass('enable-mobile-menu');
	});

	//carousel
	jQuery(".init-carousel").each(function(){
		var carousel_id = jQuery(this).attr('id');
		var auto_play = jQuery(this).data('autoplay');
		var items = jQuery(this).data('items');
		var navigation = jQuery(this).data('navigation');
		if(jQuery(this).hasClass('single-carousel')){ //single style
			var owl = jQuery(this).owlCarousel({
				singleItem:true,
				autoHeight: true,
				autoPlay: auto_play,
				navigation: navigation?true:false,
				navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				addClassActive : true,
				stopOnHover: true,
				slideSpeed : 600,
			});
		}else{
			var owl = jQuery(this).owlCarousel({
				autoPlay: auto_play,
				items: items?items:4,
				itemsDesktop: items?false:4,
				//itemsDesktopSmall: items?(items>3?3:false):3,
				singleItem: items==1?true:false,
				navigation: navigation?true:false,
				navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				slideSpeed: 500,
				addClassActive : true,
				afterInit: leaf_owl_update,
				afterUpdate : leaf_owl_update,
			});
		}
		jQuery(window).load(function(e) { //fix vc strech row
			setTimeout(function() {
				owl.data('owlCarousel').updateVars();
			}, 50);
		});
	});
	
	function leaf_owl_update(this_owl){
		if(jQuery('.header-carousel-item').length){
			jQuery('.header-carousel-item').each(function(index, element) {
				var width = jQuery(this).outerWidth();
				var c_height = jQuery(this).parent().next('.owl-item').outerHeight();
				var padding = c_height/width*100;
				jQuery('.header-carousel-item-inner',this).css('padding-top',padding+'%');
			});
		}
	}
	//post slider
	jQuery('.post-slider-prev').click(function(e) {
		var owl = jQuery(this).closest('.post-slider-carousel').data('owlCarousel');
		owl.prev();
		return false;
    });
	jQuery('.post-slider-next').click(function(e) {
		var owl = jQuery(this).closest('.post-slider-carousel').data('owlCarousel');
		owl.next();
		return false;
    });
	
	//grid turn to carousel
	if(jQuery(window).width()<977){
		jQuery(".grid-listing").owlCarousel({ addClassActive : true });
	}
	
	//Countdown
	jQuery('[data-countdown]').each(function() {
		var $this = jQuery(this), finalDate = jQuery(this).data('countdown');
		var day_label = $this.data('daylabel');
		var hour_label = $this.data('hourlabel');
		var minute_label = $this.data('minutelabel');
		var second_label = $this.data('secondlabel');
		var show_second = $this.data('showsecond');
		$this.countdown(finalDate, {elapse: true})
		  .on('update.countdown', function(event) {
			if (event.elapsed) { // Either true or false
			  $this.html(event.strftime(''
				+ '<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%D</span><span class="countdown-label main-color-1">'+day_label+'</span></span>'
				+ '<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%H</span><span class="countdown-label main-color-1">'+hour_label+'</span></span>'
				+ '<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%M</span><span class="countdown-label main-color-1">'+minute_label+'</span></span>'
				+ (show_second?'<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%S</span><span class="countdown-label main-color-1">'+second_label+'</span></span>':'')
			));
			} else {
			  $this.html(event.strftime(''
				+ '<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%D</span><span class="countdown-label main-color-1">'+day_label+'</span></span>'
				+ '<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%H</span><span class="countdown-label main-color-1">'+hour_label+'</span></span>'
				+ '<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%M</span><span class="countdown-label main-color-1">'+minute_label+'</span></span>'
				+ (show_second?'<span class="countdown-block"><span class="countdown-number main-color-1-bg dark-div minion">%S</span><span class="countdown-label main-color-1">'+second_label+'</span></span>':'')
			));
			}
		});
	});
	if(jQuery('.colorbox-grid').length){
		jQuery('.colorbox-grid').colorbox({
			rel: function(){
				return jQuery(this).data('rel');
			},
			inline:true,
			href: function(){
				if(jQuery(this).data('isgallery')){
					return jQuery(this).data('content')+' .popup-data-gallery';
				}else{
					return jQuery(this).data('content')+' .popup-data:not(.popup-data-gallery)';
				}
			},
			width: 900,
			responsive: true,
			onOpen: function(){
				jQuery('body').addClass('popup-active');
			},
			onClosed: function(){
				jQuery('body').removeClass('popup-active');
			},
			previous: '<i class="fa fa-chevron-left"></i>',
			next: '<i class="fa fa-chevron-right"></i>',
			close: '<i class="fa fa-times"></i>',
		});
	}
	
	//mobile menu
	jQuery('.mobile-menu-toggle').click(function(e) {
        jQuery('body').toggleClass('enable-mobile-menu');
		return false;
    });
	jQuery(document).mouseup(function(e){
		var container = jQuery(".mobile-menu-wrap, #off-canvas-search");
		if (!container.is(e.target) && container.has(e.target).length === 0){
			jQuery('body').removeClass('enable-mobile-menu');
		}
	});
	
	//smooth link #
	jQuery('a[href*="#"]:not([href="#"])').click(function() {
		if(jQuery(this).hasClass('featured-tab') || jQuery(this).hasClass('popup-gallery-comment') || jQuery(this).parents('ul').hasClass('tabs') || jQuery(this).hasClass('comment-reply-link') || jQuery(this).hasClass('ui-tabs-anchor') || jQuery(this).data('vc-container') || jQuery(this).parents('div').hasClass('wpb_tour_next_prev_nav')){
			return true;
		}else if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {
			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
			   if (target.length) {
				jQuery('html,body,#body-wrap').animate({
					 scrollTop: target.offset().top - 120
				}, 660);
				return true;
			}
		}
	});
	
	jQuery( 'div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)' ).addClass( 'buttons_added' ).append( '<input type="button" value="+" id="add1" class="plus" />' ).prepend( '<input type="button" value="-" id="minus1" class="minus" />' );
	jQuery('.buttons_added #minus1').click(function(e) {
		var value = parseInt(jQuery(this).siblings('input[type="number"]').val()) - 1;
		if(value>=0){
			jQuery(this).siblings('input[type="number"]').val(value).trigger("change");
			jQuery('.woocommerce-cart table.cart input[name="update_cart"]').prop("disabled", false);
		}
    });
	jQuery('.buttons_added #add1').click(function(e) {
		var value = parseInt(jQuery(this).siblings('input[type="number"]').val()) + 1;
		jQuery(this).siblings('input[type="number"]').val(value).trigger("change");
		jQuery('.woocommerce-cart table.cart input[name="update_cart"]').prop("disabled", false);
    });
    //cart ajax fix
    jQuery( document.body ).on( 'updated_cart_totals', function(){
		jQuery( 'div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)' ).addClass( 'buttons_added' ).append( '<input type="button" value="+" id="add1" class="plus" />' ).prepend( '<input type="button" value="-" id="minus1" class="minus" />' );
		jQuery('.buttons_added #minus1').click(function(e) {
			var value = parseInt(jQuery(this).siblings('input[type="number"]').val()) - 1;
			if(value>=0){
				jQuery(this).siblings('input[type="number"]').val(value).trigger("change");
				jQuery('.woocommerce-cart table.cart input[name="update_cart"]').prop("disabled", false);
			}
	    });
		jQuery('.buttons_added #add1').click(function(e) {
			var value = parseInt(jQuery(this).siblings('input[type="number"]').val()) + 1;
			jQuery(this).siblings('input[type="number"]').val(value).trigger("change");
			jQuery('.woocommerce-cart table.cart input[name="update_cart"]').prop("disabled", false);
	    });
	});

	
	jQuery(document).mouseup(function(e){
		var container = jQuery("#off-canvas-search form");
		if (!container.is(e.target) && container.has(e.target).length === 0){
			jQuery('body').removeClass('enable-search');
		}

	});
	
	
});//document ready

jQuery(window).resize(function(e) {
	if(jQuery(window).width()<977){
		jQuery(".grid-listing").each(function(index, element) {
			if(!jQuery(this).hasClass('owl-carousel')){
				jQuery(this).owlCarousel({ addClassActive : true });
			}
		});
	}else{
		jQuery(".grid-listing").each(function(index, element) {
            if(jQuery(this).hasClass('owl-carousel')){
				var owl = jQuery(this).data('owlCarousel');
				owl.destroy();
			}
        });
	}
});

jQuery(window).scroll(function(e) {
	if( jQuery(window).width() > 991 && jQuery('.summary.portrait-screenshot').length){
		var scrollTop = jQuery(window).scrollTop();
		
		var box_height = jQuery('.summary.portrait-screenshot').outerHeight();
		var box_offset = jQuery('.summary.portrait-screenshot').offset().top;
		
		var mobile_height = jQuery('.images .ias-devide-wrap').height();
		var mobile_offset = jQuery('.images .ias-devide-wrap').offset().top;
		
		var menu_height = 50 + jQuery('#wpadminbar').height();

		if( mobile_offset - scrollTop - menu_height - 30 <=0 ){
			margin_top = scrollTop - mobile_offset + menu_height + 30;
			if(margin_top >= mobile_height - box_height){
				margin_top = mobile_height - box_height;
			}
		}else{
			margin_top = 0;
		}
		jQuery('.summary.portrait-screenshot').css('margin-top',margin_top);
	}else{
		jQuery('.summary.portrait-screenshot').css('margin-top',0);
	}
});

// Get browser add body class
jQuery.each(jQuery.browser, function(i) {
    jQuery('body').addClass(i);
    return false;  
});
// Get OS
var os = [
    'iphone',
    'ipad',
    'windows',
    'mac',
    'linux',
	'android',
	'mobile'
];
var match = navigator.appVersion.toLowerCase().match(new RegExp(os.join('|')));
if (match) {
    jQuery('body').addClass(match[0]);
    if(typeof match[0] == 'undefined'){
		match[0]='';
	}
}

if ( (navigator.appVersion.indexOf("Win")!=-1 || navigator.appVersion.indexOf("Mac")!=-1 || navigator.appVersion.indexOf("X11")!=-1 || match[0]=='windows' || match[0]=='mac') && match[0]!='iphone' && match[0]!='ipad'){
	jQuery('body').addClass('pc');
}else{
	jQuery('body').addClass('mobile');
}
//End body class

//Loading effect
setTimeout(function() {
	jQuery('#pageloader').fadeOut();
}, 30000);
jQuery(window).load(function(e) {
	jQuery("#pageloader").fadeOut(500);
});

})(jQuery); //use strict