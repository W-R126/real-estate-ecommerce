/*!
 * Theme v1.0.0
 * Copyright 2015-2016 Theemon.com
 */
(function($) { 
 "use strict";
var isMobile;
var index;
var cthisleft;
var cthis;
var animSection;
var video1;
var stickOnScroll;

jQuery(document).ready(function() {
	
	isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|iPad|IEMobile|Opera Mini)/);
	index = 0;
	
	 //Header Option
	$('#header').addClass('normal');//Choose Here Class Name (normal or fixed or intelligent);
	
	// Image Thumb slider
	jQuery('.pro-thumb li').on('click', function() {
		jQuery('.item-on-display img').remove();
		jQuery(this).children('img').clone().appendTo('.item-on-display');
	});
	
	// form field homepage custom selectbox

	jQuery('.second .btn-group .dropdown-menu li,.form-field .btn-group .dropdown-menu li,.sort .btn-group .dropdown-menu li,.portfolio-3 .btn-group.custom-select .dropdown-menu li').on('touchstart click', function() {
		var curr_text = $(this).text();

		jQuery(this).parent('.dropdown-menu').siblings('.btn').children('.select-text').text(curr_text);

	});
	
	

	jQuery('.song-sno .fa').on('click',function() {
		$(this).toggleClass('fa-pause');
	});
	// Svg implement
	jQuery('img.svg').each(function() {
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if ( typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if ( typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});
	//=========== Shopping cart value increase and decrease function ================
		$('.add.operator').on('click', function () {
     var value = $(this).parents('.quantity-value').find('input').val();
     value++;
     $(this).parents('.quantity-value').find('input').val(value);
 });

 $('.minus.operator').on('click', function () {
     var value = $(this).parents('.quantity-value').find('input').val();
     if(value>0){
      value--;
     $(this).parents('.quantity-value').find('input').val(value);
     }
     
 });
 
 
 //===========AutoDealer Tabing ================

 $('.tabcontent .mid ').hide();
 $('.tabcontent .mid:first').show(); 
 $('.auto-tab-list li a').click(function() {
	 $('.auto-tab-list li').removeClass('active');
	 $(this).parent().addClass('active'); 
	 
	 var blockList = $(this).attr('class');
	 //alert(blockList)
$('.tabcontent .mid').hide();
$('.' + blockList).css({'display':'block'});
return false;
}); 
	//=================Range Slider function ================
	 if ($('#slider-range').length) {
		$("#slider-range").slider({
			range : true,
			min : 75,
			max : 300,
			values : [75, 300],
			slide : function(event, ui) {
				$("#amount").text("min $" + ui.values[0]);
				$("#amount1").text("max $" + ui.values[1]);
			}
		});

		$("#amount").text("min $" + $("#slider-range").slider("values", 0));
		$("#amount1").text("max $" + $("#slider-range").slider("values", 1));


	}

	 if ($('#slider-meter').length) {
		$("#slider-meter").slider({
			range : true,
			min : 100,
			max : 10000000,
			values : [100, 100000000],
			slide : function(event, ui) {
				$("#amount").text("min $" + ui.values[0]);
				$("#amount1").text("max $" + ui.values[1]);
			}
		});

		 $("#amount").text("min $" + $("#slider-meter").slider("values", 0));
		
		$("#amount1").text("max $" + $("#slider-meter").slider("values", 1));


	}
	
	

	//Navigation function
	var hie = jQuery(window).height();

	jQuery(document).on('click','.navbar-header',function(e) {
		e.preventDefault();
		jQuery(this).toggleClass('active');
		if (jQuery('#header').hasClass('open')) {
			jQuery('#header').removeClass('open')

		} else {
			jQuery('#header').addClass('open');
			jQuery('#header').removeClass('open-nav');
		}
		setTimeout(function() {
			jQuery('#header').removeClass('open-nav')
		}, 500);
		jQuery('#header').addClass('open-nav');
	});

	//============
	jQuery(document).on('click', '.header .search,.header .header-search', function() {

		if (jQuery('.header-search-box').hasClass('open-field')) {

			jQuery('.header-search-box').removeClass('open-field');
		} else {
			jQuery('.header-search-box').addClass('open-field');

		}

	});
	//Small Header Function

	//Main Banner Function
	jQuery('.img-style,.img-h').height(hie);

	$(window).resize(function() {
		jQuery('.img-style').height(hie);
		if (jQuery('.gallery-info').length) {
		var $grid = $('.grid'), $sizer = $grid.find('.shuffle__sizer');
		$grid.shuffle({
			itemSelector : '.picture-item',
			sizer : $sizer
		});
	}
	});
	if (jQuery('.testimonial-slider').length) {
		jQuery('.testimonial-slider').flexslider({
			animation : "fade",
			controlNav : false,
			directionNav : false,
			start : function(slider) {
				jQuery('body').removeClass('loading');
			}
		});
	}
	if (jQuery('.offer-slider').length) {
		jQuery('.offer-slider').flexslider({
			animation : "slide",
			controlNav : false,
			directionNav : false,
			start : function(slider) {
				jQuery('body').removeClass('loading');
			}
		});
	}
	if (jQuery('.thumb-slider').length) {
		jQuery('.thumb-slider').flexslider({
			animation : 'slide',
			controlNav : true,
			animationLoop : false,
			slideshow : false,
			manualControls : ".thumbslider li ",
			directionNav : false,
		});
	}

	$('.panel-heading').on('click',function() {

		if (($(this).next('.panel-collapse').hasClass('in')) && ($(this).find('a').attr('aria-expanded', 'true'))) {
			$('.panel-heading').find('i.fa-long-arrow-up').removeClass('fa-long-arrow-up');
			$(this).find('i').addClass('fa-long-arrow-down');
		} else {
			$('.panel-heading').find('i.fa-long-arrow-up').addClass('fa-long-arrow-down').removeClass('fa-long-arrow-up');
			$(this).find('i').addClass('fa-long-arrow-up');
		}
	});
	// Count down
	if (jQuery('.anim-section').length) { 
	jQuery('.anim-section').appear(function() { 
			animSection();
	});
	}

	//Animation countTo
	if (jQuery('.count-value').length) {
		jQuery('.count-value').countTo();
		jQuery('.number-count').appear(function() {
			jQuery('.count-value').countTo();

		}, {
			accY : -100
		});

	}
	cthisleft = jQuery(".animateleft .animation-effect").children();
	cthis = jQuery(".animatedata .animation-effect").children();
	if (jQuery('.animateleft').length) {
		jQuery('.animateleft').appear(function() {
			jQuery(".animateleft h2").animate({
				opacity : 1,
				marginLeft : 0
			}, 800, function() {
				if (cthisleft.length > index) {
					//alert(22)
					animateLeft(cthisleft);
				}

			});

		}, {
			accY : -100
		});
	}
	if (jQuery('.animatedata').length) {
		jQuery('.animatedata').appear(function() {

			// Fade
			jQuery(".animatedata h2").animate({
				opacity : 1
			}, 800, function() {
				if (cthis.length > index) {
					fadeContent(cthis);

				}
			});

		}, {
			accY : -100

		});

	}
	
	//scroll top

	jQuery('.scroll-top').on('click',function() {
		jQuery('body,html').animate({
			scrollTop : 0
		}, 500);
	});
	// responsive menu toggle

	jQuery(document).on('click','.menu-wrap .nav>li>a',function() {
		if( jQuery(window).width() < 768)
		{
		jQuery(this).next('.menu-container').slideToggle(300);	
		}
		
	});

	
	if( jQuery(window).width() < 1025)
	{
		jQuery('.flyout-menu li a').on('click',function() {

		  jQuery(this).next('ul,.figure-menu,.link-section-wrapper').slideToggle(300);
		 	
	});
	
	}
	
	jQuery(document).on('mouseenter','.flyout-menu li a', function () {
   	jQuery(this).parent('li').addClass('active');
    jQuery(this).parent('li').siblings('li').removeClass('active');
});

	
	
	if (jQuery('.slider-section').length) {
	jQuery('.slider-section').flexslider({
		animation : "slide"

	});
}
	jQuery('.toggle-sec .panel').on('click',function() {
		jQuery(this).toggleClass('active-slide');
		jQuery(this).children('.panel-collapse').slideToggle(200);

		if (jQuery(this).hasClass('active-slide')) {
			jQuery(this).find('a').attr('aria-expanded', 'true');
			jQuery('.toggle-sec .panel').find('i.fa-long-arrow-up').removeClass('fa-long-arrow-up');
			jQuery(this).find('i').addClass('fa-long-arrow-down');

		} else {
			jQuery(this).find('a').attr('aria-expanded', 'false');
			jQuery('.toggle-sec .panel').find('a i.fa-long-arrow-up').addClass('fa-long-arrow-down').removeClass('fa-long-arrow-up');
			jQuery(this).find('a i').addClass('fa-long-arrow-up');
		}

	});
	//======================== Autodealr two ====================
	if (jQuery('#sync1').length) {
	var sync1 = $("#sync1");
  var sync2 = $("#sync2");

  sync1.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: true,
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
  });

  sync2.owlCarousel({
    items :5,
    itemsDesktop      : [1199,5],
    itemsDesktopSmall     : [979,5],
    itemsTablet       : [768,5],
    itemsMobile       : [479,5],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });
}
  function syncPosition(el){
    var current = this.currentItem;
    $("#sync2")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#sync2").data("owlCarousel") !== undefined){
      center(current)
    }
  }

  $("#sync2").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync1.trigger("owl.goTo",number);
  });

  function center(number){
    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync2visible){
      if(num === sync2visible[i]){
        var found = true;
      }
    }

    if(found===false){
      if(num>sync2visible[sync2visible.length-1]){
        sync2.trigger("owl.goTo", num - sync2visible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        sync2.trigger("owl.goTo", num);
      }
    } else if(num === sync2visible[sync2visible.length-1]){
      sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
      sync2.trigger("owl.goTo", num-1)
    }
    
  }
  

	
	// filtering
	$(function() { 
		// init Isotope
		if (jQuery('.homepage-3, .gallery-12').length) { 
		}
		else{
			
			if (jQuery('.grid').length) { 
			var $grid = jQuery('.grid').isotope({
				itemSelector : '.h-hover,.elements,.item',
				layoutMode : 'fitRows'
			});
		}
	}
		// filter functions
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50 : function() {
				var number = jQuery(this).find('.lifestyle').text();
				return parseInt(number, 10) > 50;
			},
			// show if name ends with -ium
			ium : function() {
				var name = jQuery(this).find('.name').text();
				return name.match(/ium$/);
			}
		};
		// bind filter button click
		jQuery('.filters-button-group').on('click', 'li', function() {
			var filterValue = jQuery(this).attr('data-filter');
			// use filterFn if matches value
			filterValue = filterFns[filterValue] || filterValue;
			$grid.isotope({
				filter : filterValue
			});
		});
		// change is-checked class on buttons
		jQuery('.button-group').each(function(i, buttonGroup) {
			var $buttonGroup = jQuery(buttonGroup);
			$buttonGroup.on('click', 'button', function() {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				jQuery(this).addClass('is-checked');
			});
		});

	});

	if (jQuery('#food-slider').length) {

		$("#food-slider").owlCarousel({
			items : 4,
			itemsDesktop : [1199, 4],
			itemsDesktopSmall : [979, 4],
			itemsTablet : [768, 2],
			navigation : true
		});
	}

	// Homepage 4 two
	$('.squares').on('click',function(e) {
		e.preventDefault();
		$('.food-list').addClass('food-grid');
		$('.menu-icon').removeClass('active');
		$(this).addClass('active');
	});

	$('.menu-icon').on('click',function(e) {
		e.preventDefault();
		$('.food-list').removeClass('food-grid');
		$('.squares').removeClass('active');
		$(this).addClass('active');


	});
	
	
	
	if($('.medical-table').length)
	{
		$('.filter-tab li').click(function()
		{   $('#main-med-table').addClass('clicked-med');
			$('#main-med-table td').removeClass('white_bg');
			
			var filter_Val = $(this).attr('data-filter');
			
			$('.'+ filter_Val).addClass('white_bg')
			
			if( filter_Val == "all")
			{   $('#main-med-table td').removeClass('white_bg');
				$('#main-med-table').removeClass('clicked-med');
			}
																	
		  
		})
		
		
	}
	


   if (jQuery('#custom-map-two').length) {

	var pos = new google.maps.LatLng(41.236859, -73.667425);

	var map = new google.maps.Map(document.getElementById('custom-map-two'), {
		zoom : 16,
		center : pos,
		scrollwheel: false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var pos1 = new google.maps.LatLng(41.238282, -73.668761);
	var pos2 = new google.maps.LatLng(41.238730, -73.668852);
	var pos3 = new google.maps.LatLng(41.239941, -73.671764);
	var pos4 = new google.maps.LatLng(41.238182, -73.668567);
	var pos5 = new google.maps.LatLng(41.237973, -73.668320);
	var pos6 = new google.maps.LatLng(41.238876, -73.675723);
	var pos7 = new google.maps.LatLng(41.238602, -73.675830);
	var pos8 = new google.maps.LatLng(41.238739, -73.676163);
	var marker1 = new google.maps.Marker({
		position : pos1,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-2.png'
	});

	var marker2 = new google.maps.Marker({
		position : pos2,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-2.png'

	});
	var marker3 = new google.maps.Marker({
		position : pos3,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-1.png'

	});

	var marker4 = new google.maps.Marker({
		position : pos4,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-2.png'

	});
	var marker5 = new google.maps.Marker({
		position : pos5,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-2.png'

	});

	var marker6 = new google.maps.Marker({
		position : pos6,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-1.png'

	});

	var marker7 = new google.maps.Marker({
		position : pos7,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-2.png'

	});
	var marker8 = new google.maps.Marker({
		position : pos8,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-2.png'

	});

}

if (jQuery('#map-7').length) {

	var pos = new google.maps.LatLng(42.118003, -88.246461);

	var map = new google.maps.Map(document.getElementById('map-7'), {
		zoom : 15,
		center : pos,
		scrollwheel: false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var pos_New = new google.maps.LatLng(42.120583, -88.251830);

	var marker1 = new google.maps.Marker({
		position : pos_New,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-3.png'
	});

}

if (jQuery('#map-9').length) {

	var pos = new google.maps.LatLng(42.118003, -88.246461);

	var map = new google.maps.Map(document.getElementById('map-9'), {
		zoom : 15,
		center : pos,
		scrollwheel: false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var pos_New1 = new google.maps.LatLng(42.118972, -88.246017);

	var marker1 = new google.maps.Marker({
		position : pos_New1,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-3.png'
	});

}

if (jQuery('#map-11').length) {

	var pos = new google.maps.LatLng(42.118003, -88.246461);

	var map = new google.maps.Map(document.getElementById('map-11'), {
		zoom : 15,
		center : pos,
		scrollwheel: false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var pos_New2 = new google.maps.LatLng(42.121403, -88.262494);

	var marker1 = new google.maps.Marker({
		position : pos_New2,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-4.jpg'
	});

}

if (jQuery('#map-8').length) {

	var pos = new google.maps.LatLng(42.118003, -88.246461);

	var map = new google.maps.Map(document.getElementById('map-8'), {
		zoom : 15,
		center : pos,
		scrollwheel: false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var pos_New2 = new google.maps.LatLng(42.121403, -88.262494);

	var marker1 = new google.maps.Marker({
		position : pos_New2,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-4.jpg'
	});

}

if (jQuery('#map-13').length) {

	var pos = new google.maps.LatLng(42.118003, -88.246461);

	var map = new google.maps.Map(document.getElementById('map-13'), {
		zoom : 15,
		center : pos,
		scrollwheel: false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var pos_New2 = new google.maps.LatLng(42.121403, -88.262494);

	var marker1 = new google.maps.Marker({
		position : pos_New2,
		map : map,
		draggable : false,
		icon : '../assets/img/map-icon-4.jpg'
	});

}

	if (jQuery('#search-map').length) {
	
	var pos = new google.maps.LatLng(54.855520, 55.968002);
	
	var map = new google.maps.Map(document.getElementById('search-map'), {
	zoom : 10,
	center : pos,
	scrollwheel: false,
	mapTypeId : google.maps.MapTypeId.ROADMAP,
	
	});
	
	var loc1 = new google.maps.LatLng(54.808977, 55.987915);
	var loc2 = new google.maps.LatLng(54.881724, 55.934356);
	var loc3 = new google.maps.LatLng(54.839831, 55.707077);
	var loc4 = new google.maps.LatLng(54.888043, 55.645965);
	var loc6 = new google.maps.LatLng(54.840857, 55.769560);
	var loc7 = new google.maps.LatLng(54.840857, 55.769564);
	var loc5 = new google.maps.LatLng(54.694056, 55.681671);
	var loc_6 = new google.maps.LatLng(54.740857, 55.769560);
	var loc8 = new google.maps.LatLng(54.781664, 55.896591);
	var loc9 = new google.maps.LatLng(54.759879, 56.104644);
	var loc_10 = new google.maps.LatLng(54.742442, 56.108077);
	var loc_11 = new google.maps.LatLng(54.844972, 56.130737);
	var loc_12 = new google.maps.LatLng(54.861178, 56.175369);
	var loc_13 = new google.maps.LatLng(54.888833, 56.223434);
	var loc_14 = new google.maps.LatLng(54.807394, 56.200775);
	var loc_15 = new google.maps.LatLng(54.823221, 56.062759);
	var loc_16 = new google.maps.LatLng(54.897916, 56.169876);
	var loc_17 = new google.maps.LatLng(54.719050, 56.370376);
	
	var markerLoc_1 = new google.maps.Marker({
	position : loc1,
	map : map,
	draggable : false,
	icon : '../assets/img/search-map-1.png'
	});
	var markerLoc_2 = new google.maps.Marker({
	position : loc2,
	map : map,
	draggable : false,
	icon : '../assets/img/search-map-2.png'
	});
	var markerLoc_3 = new google.maps.Marker({
	position : loc3,
	map : map,
	draggable : false,
	icon : '../assets/img/search-map-3.png'
	});
	
	var markerLoc_4 = new google.maps.Marker({
	position : loc4,
	map : map,
	draggable : false,
	icon : '../assets/img/search-map-4.png'
	});
	
	var markerLoc_6 = new google.maps.Marker({
	position : loc6,
	map : map,
	draggable : false,
	icon : '../assets/img/search-map-5.png'
	});
	
	var markerLoc_7 = new google.maps.Marker({
	position : loc7,
	map : map,
	draggable : false,
	icon : '../assets/img/search-map-6.png'
	});
	
	 var infowindow_1 = new google.maps.InfoWindow({
     content: '<span class="search-address"> 269 Main Street, London England </span>' + "(54.808977, 55.987915)"
     });
	
     var infowindow_2 = new google.maps.InfoWindow({
     content: '<span class="search-address"> 269 Main Street, London England </span>' + "(54.881724, 55.934356)"
     });
     
     var infowindow_3 = new google.maps.InfoWindow({
     content:'<span class="search-address"> 269 Main Street, London England </span>' + "(54.839831, 55.707077)"
     });
     
      var infowindow_4 = new google.maps.InfoWindow({
     content: '<span class="search-address"> 269 Main Street, London England </span>'+"(54.888043, 55.645965)"
     });
     
      var infowindow_6 = new google.maps.InfoWindow({
     content: '<span class="search-address"> 269 Main Street, London England </span>'+"(54.740857, 55.769560)"
     });
     
     var infowindow_7 = new google.maps.InfoWindow({
     content: '<span class="search-address"> 269 Main Street, London England </span>' +"(54.840857, 55.769564)"
     });     
	
	markerLoc_1.addListener('click', function() {
    infowindow_1.open(map, markerLoc_1);
    });
	
	markerLoc_2.addListener('click', function() {
    infowindow_2.open(map, markerLoc_2);
    });
	
	
	markerLoc_3.addListener('click', function() {
    infowindow_3.open(map, markerLoc_3);
    });
	
	
	markerLoc_4.addListener('click', function() {
    infowindow_4.open(map, markerLoc_4);
    });
	
	markerLoc_6.addListener('click', function() {
    infowindow_6.open(map, markerLoc_6);
    });
	
	markerLoc_7.addListener('click', function() {
    infowindow_7.open(map, markerLoc_7);
    });
	
	}
	
	
//=================Header Style function================
$(window).load(function() {
if ($('#header').hasClass('fixed')) {
		$('#header').next().addClass('top-m');
	}
if ($('#header').hasClass('intelligent')) {
		$('#header').next().addClass('top-m');
	};
});
	
	var class_pr = $('body').attr('class');
	var headerHeight = $('#header').outerHeight();
	var st = $(window).scrollTop();
	stickOnScroll = function() {
		
		if ($('#header').hasClass("intelligent")) {
			
			$('#header').removeClass('normal');
			$('.spacetop').addClass('top-m');
			var pos = $(window).scrollTop();

			if (pos > headerHeight) {
				if (pos > st) {
					$('#header').addClass('simple')
					$('#header.simple').removeClass('down');
					$('#header.simple').addClass('fixed up');

				} else {
					$('#header.simple').removeClass('up');
					$('#header.simple').addClass('fixed down');

				}
				st = pos;

			} else {
				$('#header.simple').removeClass('fixed down up simple');
			}
			if (pos == $(document).height() - $(window).height()) {
				$('#header.simple').removeClass('up');
				$('#header.simple').addClass('fixed down');
			}

		} else if ($('body').hasClass("fix")) {

			$('.spacetop').addClass('top-m');
			$('#header').addClass('simple fixed');
			$('#header').removeClass('down up');
			$('#wrapper').css({
				paddingTop : 0
			});
		} else {

			$('#header.simple').removeClass('fixed down up simple');
			$('#header').addClass('normal');
			//$('.spacetop').removeClass('top-m');
			$('#wrapper').css({
				paddingTop : 0
			});
		}
	};
	stickOnScroll();
	$(window).scroll(function() {
		stickOnScroll();
	});



	// end for sticky header
		
	});


jQuery(window).load(function() {
	if (jQuery('.normal').length) { 
		jQuery('#header.normal').next().addClass('none'); 
		
	 };
	//Custom Map
	if ($('#map-view').length) {
		
		var pos = new google.maps.LatLng(44.453436, -95.797182);

	var map = new google.maps.Map(document.getElementById('map-view'), {
		zoom : 15,
		center : pos,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var marker1 = new google.maps.Marker({
		position : pos,
		map : map,
		draggable : false,
		icon : '../assets/img/map-marker.png'
	});

	}

	//	Loader function js
	$('.loader-block').delay(1000).fadeOut();

	if (jQuery('.gallery-carousal').length) {
		var owl_o = jQuery(".gallery-carousal");
		owl_o.owlCarousel({
			items : 4, //10 items above 1000px browser width
			itemsDesktop : [1000, 4], //5 items between 1000px and 901px
			itemsDesktopSmall : [900, 3], // betweem 900px and 601px
			itemsTablet : [800, 2], //2 items between 600 and 0
			itemsMobile : [639, 1], // itemsMobile disabled - inherit from itemsTablet option
			navigation : true,
			navigationText : false,
			rewindNav : true,
			scrollPerPage : true,
			pagination : false,

		});
	}

	if (jQuery('.short-article-slider').length) {
		var owl_o = jQuery(".short-article-slider");
		owl_o.owlCarousel({
			items : 3, //10 items above 1000px browser width
			itemsDesktop : [1000, 3], //5 items between 1000px and 901px
			itemsDesktopSmall : [900, 2], // betweem 900px and 601px
			itemsTablet : [800, 2], //2 items between 600 and 0
			itemsMobile : [639, 1], // itemsMobile disabled - inherit from itemsTablet option
			navigation : true,
			navigationText : true,
			rewindNav : true,
			scrollPerPage : true,
			pagination : false,

		});
	}

	if (jQuery('.med-testimony-wrapper').length) {
		var owl_o = jQuery(".med-testimony-wrapper");
		owl_o.owlCarousel({
			items : 3, //10 items above 1000px browser width
			itemsDesktop : [1000, 3], //5 items between 1000px and 901px
			itemsDesktopSmall : [900, 2], // betweem 900px and 601px
			itemsTablet : [800, 2], //2 items between 600 and 0
			itemsMobile : [639, 1], // itemsMobile disabled - inherit from itemsTablet option
			navigation : true,
			navigationText : true,
			rewindNav : true,
			scrollPerPage : true,
			pagination : false,

		});
	};

	if (jQuery('.med-team-slider').length) {
		var owl_o = jQuery(".med-team-slider");
		owl_o.owlCarousel({
			items : 3, //10 items above 1000px browser width
			itemsDesktop : [1000, 3], //5 items between 1000px and 901px
			itemsDesktopSmall : [900, 2], // betweem 900px and 601px
			itemsTablet : [800, 2], //2 items between 600 and 0
			itemsMobile : [639, 1], // itemsMobile disabled - inherit from itemsTablet option
			navigation : true,
			navigationText : true,
			rewindNav : true,
			scrollPerPage : true,
			pagination : false,

		});
	};

	if (jQuery('.new-product-slider').length) {
		var owl_o = jQuery(".new-product-slider");
		owl_o.owlCarousel({
			center: true,
			loop:true,
			items : 4, //10 items above 1000px browser width
			itemsDesktop : [1024, 3], //5 items between 1000px and 901px
			itemsDesktopSmall : [900, 2], // betweem 900px and 601px
			itemsTablet : [800, 2], //2 items between 600 and 0
			itemsMobile : [767, 1], // itemsMobile disabled - inherit from itemsTablet option
			navigation : true,
			navigationText : true,
			rewindNav : true,
			scrollPerPage : true,
			pagination : false,

		});
	};

	if (jQuery('#defaultCountdown').length) {
		jQuery("#defaultCountdown").countdown({
			until : new Date(2020, 2, 14)
		});
	};

	if (jQuery('.gallery-info').length) {
		var $grid = $('.grid'), $sizer = $grid.find('.shuffle__sizer');
		$grid.shuffle({
			itemSelector : '.picture-item',
			sizer : $sizer
		});
	};

	if (jQuery('.gallery-block').length) {
		jQuery(".gallery-block").owlCarousel({
			navigation : true,
			paginationNumbers : true,
			slideSpeed : 300,
			paginationSpeed : 400,
			singleItem : true
		})
	};

	if (jQuery('#recent-crousel').length) {
		jQuery("#recent-crousel").owlCarousel({
			navigation : true,
			pagination : true,
			paginationNumbers : true,
			items : 2,
			itemsCustom : false,
			itemsDesktop : [1199, 2],
			itemsDesktopSmall : [979, 2],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	};

	if (jQuery('#music-update-wrapper').length) {
		jQuery("#music-update-wrapper").owlCarousel({
			navigation : true,
			pagination : false,
			paginationNumbers : false,
			items : 2,
			itemsCustom : false,
			itemsDesktop : [1199, 2],
			itemsDesktopSmall : [979, 2],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	};

	if (jQuery('#crousel-slider').length) {
		jQuery("#crousel-slider").owlCarousel({
			navigation : true,
			pagination : false,
			items : 6,
			itemsCustom : false,
			itemsDesktop : [1199, 4],
			itemsDesktopSmall : [979, 4],
			itemsTablet : [768, 3],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	};
	if (jQuery('#crousel-slider-two').length) {
		jQuery("#crousel-slider-two").owlCarousel({
			navigation : true,
			pagination : true,
			items : 3,
			itemsCustom : false,
			itemsDesktop : [1199, 3],
			itemsDesktopSmall : [979, 3],
			itemsTablet : [768, 3],
			itemsTabletSmall : false,
			itemsMobile : [767, 1],
		});
	};

	if (jQuery('.gallery-large').length) {
		jQuery('.gallery-large').owlCarousel({
			items : 4, //10 items above 1000px browser width
			itemsDesktop : [1900, 3], //5 items between 1000px and 901px
			itemsDesktopSmall : [900, 2], // betweem 900px and 601px
			itemsTablet : [600, 1], //2 items between 600 and 0
			itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
			navigation : false,
			navigationText : false,
			rewindNav : true,
			scrollPerPage : false,
			pagination : false,
			autoPlay : true,

		});
	};

	if (jQuery('.blog-banner').length) {
		jQuery('.blog-banner').owlCarousel({
			items : 3, //10 items above 1000px browser width
			itemsDesktop : [1900, 3], //5 items between 1000px and 901px
			itemsDesktopSmall : [900, 2], // betweem 900px and 601px
			itemsTablet : [600, 1], //2 items between 600 and 0
			itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
			navigation : true,
			navigationText : false,
			rewindNav : true,
			scrollPerPage : false,
			pagination : true,
			autoPlay : true,

		});
	};

	if (jQuery('.testimonial-slider').length) {
		jQuery('.testimonial-slider').flexslider({
			animation : "fade",
			controlNav : false,
			directionNav : false,
			start : function(slider) {
				jQuery('body').removeClass('loading');
			}
		});
	};

	if (jQuery('.page-blog-sec-slider').length) {
		jQuery('.page-blog-sec-slider').flexslider({
			animation : "slide",
			controlNav : false,
			directionNav : true,

		});
	};
	if (jQuery('.banner-slider').length) {
		jQuery('.banner-slider').flexslider({
			animation : "slide",
			controlNav : false,
			directionNav : true,
			start : function(slider) {
				jQuery('body').removeClass('loading');
			}
		});
	};
	if (jQuery('.offer-slider').length) {
		jQuery('.offer-slider').flexslider({
			animation : "slide",
			controlNav : false,
			directionNav : false,
			start : function(slider) {
				jQuery('body').removeClass('loading');
			}
		});
	};
	if (jQuery('.thumb-slider').length) {
		jQuery('.thumb-slider').flexslider({
			animation : 'slide',
			controlNav : true,
			animationLoop : false,
			slideshow : false,
			manualControls : ".thumbslider li ",
			directionNav : false,
		});
	};
	if (jQuery('.menus').length) {
		jQuery('.menus').flexslider({
			animation : "slide",
			directionNav : true,
			controlNav : false,
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});
	};

	if (jQuery('.about-map-info').length) {
		$('.about-map-info').flexslider({
			animation : "slide",
			directionNav : true,
			controlNav : false,
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});

	}

	if (jQuery('.testimonial-slides-wrap').length) {
		$('.testimonial-slides-wrap').flexslider({
			animation : "slide",
			directionNav : false,
			controlNav : true,
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});

	};

	if (jQuery('.schedule-info-wrapper').length) {
		$('.schedule-info-wrapper').flexslider({
			animation : "slide",
			directionNav : true,
			controlNav : true,
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});

	};

	if (jQuery('.sport-widget-wrap,.music-widget-wrap').length) {
		$('.sport-widget-wrap,.music-widget-wrap').flexslider({
			animation : "slide",
			directionNav : true,
			controlNav : false,
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});

	};
	
	if (jQuery('.big-slider').length) {
		jQuery('.thumb-small').flexslider({
			animation : "slide",
			directionNav : true,
			controlNav : false,
			itemWidth : 165,
			itemMargin : 8,
			asNavFor : '.big-slider'
		});

		jQuery('.big-slider').flexslider({
			animation : "slide",
			directionNav : false,
			controlNav : false,
			sync : ".thumb-small",
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});
	}
	

	if (jQuery('.landing-slider').length) {
		jQuery('.carousel').flexslider({
			animation : "slide",
			directionNav : true,
			controlNav : false,
			itemWidth : 95,
			asNavFor : '.landing-slider'
		});

		jQuery('.landing-slider').flexslider({
			animation : "slide",
			directionNav : false,
			controlNav : false,
			sync : ".carousel",
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});
	}
	
	

	if ($('.food-banner').length) {
		jQuery('.food-banner').flexslider({
			animation : "slide",
			directionNav : false,
			controlNav : true,
			manualControls : '#food-thumb-wrap li'

		});
	}

	if ($('.autodealer-slide').length) {
		jQuery('.autodealer-slide').flexslider({
			animation : "slide",
			directionNav : true,
			controlNav : false,

		});
	}

	if ($('.hotel-booking-form,.date-pick').length) {
		$("#datepicker-1,#datepicker-2,#datepicker-3,#datepicker-4,#datepicker-5,#datepicker-6").datepicker({
			showOn : "button",
			buttonImage : "../assets/img/icon-calender.png",
			buttonImageOnly : true,
			buttonText : "Select date"
		});

	};
	//Hotel page
	if (jQuery('.flexslide').length) {
		$(".flexslide").flexslider({
			animation : "slide",
			sync : "#home-carousel",
			start : function(slider) {
				$('body').removeClass('loading');
			}
		});
	};

	if (jQuery('#blog-crousel').length) {
		$("#blog-crousel").owlCarousel({
			navigation : true,
			pagination : true,
			paginationNumbers : true,
			items : 2,
			itemsCustom : false,
			itemsDesktop : [1199, 2],
			itemsDesktopSmall : [979, 2],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	};

	if (jQuery('#events-crousel').length) {
		$("#events-crousel").owlCarousel({
			navigation : false,
			pagination : false,
			items : 4,
			itemsCustom : false,
			itemsDesktop : [1199, 4],
			itemsDesktopSmall : [979, 3],
			itemsTablet : [768, 3],
			itemsTabletSmall : [768, 2],
			itemsMobile : [479, 1],
		});
	}

	if (jQuery('.homepage-8 #news-crousel').length) {
		$(".homepage-8 #news-crousel").owlCarousel({
			navigation : false,
			pagination : false,
			paginationNumbers : false,
			items : 2,
			itemsCustom : false,
			itemsDesktop : [1199, 2],
			itemsDesktopSmall : [979, 2],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	}

	if (jQuery('#news-crousel').length) {
		$("#news-crousel").owlCarousel({
			navigation : true,
			pagination : true,
			paginationNumbers : true,
			items : 2,
			itemsCustom : false,
			itemsDesktop : [1199, 2],
			itemsDesktopSmall : [979, 2],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	}

	// 	 HOMEPAGE-13

	if (jQuery('#news-crousel').length) {
		$("#news-crousel").owlCarousel({
			navigation : true,
			pagination : true,
			paginationNumbers : true,
			items : 2,
			itemsCustom : false,
			itemsDesktop : [1199, 2],
			itemsDesktopSmall : [979, 2],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	}

	if (jQuery('.beauty-blog-carousel').length) {
		$(".beauty-blog-carousel").owlCarousel({
			navigation : false,
			pagination : true,
			paginationNumbers : true,
			items : 4,
			itemsCustom : false,
			itemsDesktop : [1199, 4],
			itemsDesktopSmall : [979, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	}

	if (jQuery('#recent-car-list').length) {
		$("#recent-car-list").owlCarousel({
			navigation : true,
			pagination : false,
			paginationNumbers : false,
			items : 4,
			itemsCustom : false,
			itemsDesktop : [1199, 4],
			itemsDesktopSmall : [979, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	}

	if (jQuery('#video-blog-list').length) {
		$("#video-blog-list").owlCarousel({
			navigation : true,
			pagination : false,
			paginationNumbers : false,
			items : 3,
			itemsCustom : false,
			itemsDesktop : [1199, 3],
			itemsDesktopSmall : [979, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : false,
			itemsMobile : [479, 1],
		});
	}

	if (jQuery('#audio-bxslider').length) {
		$('#audio-bxslider').bxSlider({
			mode : 'vertical',
			minSlides : 3,
			maxSlides : 3,
			moveSlides : 1,
			slideMargin : 5
		});

	}
if (jQuery('#home-carousel').length) {
	jQuery('#home-carousel').flexslider({
		animation : "slide",
		directionNav : true,
		itemWidth : 175,
		itemMargin : 5,
		asNavFor : '#home-slider'
	});

	jQuery('#home-slider').flexslider({
		animation : "slide",
		sync : "#home-carousel",
		start : function(slider) {
			$('body').removeClass('loading');
		}
	});
}
	if (jQuery('.masonry-section').length) {
		var container = document.querySelector('.masonry-section');
		var msnry = new Masonry(container, {

		});
	}

	if (jQuery('#row').length) {
		var row = document.querySelector('#row');
		var msnry = new Masonry(row, {
			itemSelector : '.item',
		});
	}
	// ============     Circular Progress Bar ==========
	if (jQuery('.circular-chart').length) {

		jQuery('.pie_progress').asPieProgress({
			namespace : 'pie_progress'
		});

		jQuery('.pie_progress--slow').asPieProgress({
			namespace : 'pie_progress',
			goal : 1000,
			min : 0,
			max : 1000,
			speed : 200,
			easing : 'linear'
		});

		jQuery('.pie_progress--countdown').asPieProgress({
			namespace : 'pie_progress',
			easing : 'linear',
			first : 120,
			max : 120,
			goal : 0,
			speed : 1200,
			numberCallback : function(n) {
				var minutes = Math.floor(this.now / 60);
				var seconds = this.now % 60;
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				return minutes + ': ' + seconds;
			}
		});

		jQuery('.pie_progress').each(function(i) {

			var progress_val = parseInt(jQuery(this).children('.pie_progress__number').text(),10);

			$(this).asPieProgress('go', progress_val);
		})

		jQuery('.progress-stick').each(function(i) {

			var progress_val = parseInt(jQuery(this).children('i').text(),10);

			jQuery(this).children('.progress-length').width(progress_val + '%');
		})
	}
	//==============Scroll Animation
	if (jQuery('.anim-section').length) {
			animSection()
	};

})
//============
jQuery(window).scroll(function() {
	var top_scroll = jQuery(window).scrollTop();
	if (top_scroll > 150) {
		jQuery('#header').addClass('small-header');
	} else {
		jQuery('#header').removeClass('small-header');
	}

	// only desktop function
	if ((!isMobile)) {

		
		if (jQuery('.anim-section').length) {
			animSection()
			jQuery(window).scroll(function() {
				animSection()
			})
		}

		jQuery(window).load(function() {
			if (jQuery('.parallax').length) {
				jQuery('.parallax').each(function() {
					parallax(jQuery(this), 0.1);
				})
			}
		})
		jQuery(window).scroll(function() {
			if (jQuery('.parallax').length) {
				jQuery('.parallax').each(function() {
					parallax(jQuery(this), 0.1);
				})
			}
		})

		jQuery(window).scroll(function() {
			if (jQuery('.help-info.parallax').length) {
				jQuery('.help-info.parallax').each(function() {
					parallax(jQuery(this), 0);
				})
			}
		})
	}

});
//============

//===========
var parallax = function(id, val) {
	if (jQuery(window).scrollTop() > id.offset().top - jQuery(window).height() && jQuery(window).scrollTop() < id.offset().top + id.outerHeight()) {
		var px = parseInt(jQuery(window).scrollTop() - (id.offset().top - jQuery(window).height()),10)
		px *= -val;
		id.css({
			'background-position' : 'center ' + px + 'px'
		})
	}
}
function fadeContent(cthis) {
	
	cthis.eq(index).animate({
		opacity : 1
	}, 600).promise().done(function() {
		if (cthis.length > ++index) {
			fadeContent(cthis);
		}
	});

}
var animSection = function() { 
			jQuery('.anim-section').each(function() {
				if (jQuery(window).scrollTop() > (jQuery(this).offset().top - jQuery(window).height() / 1.15)) {
					jQuery(this).addClass('animate')
					
				}
				
			})
		}
// for animating left

function animateLeft(cthisleft) {
	cthisleft.eq(index).animate({
		opacity : 1,
		marginLeft : 0
	}, 600).promise().done(function() {
		if (cthisleft.length > ++index) {
			animateLeft(cthisleft);
		}
	});
}

// map Section

if (jQuery('#custom_map').length) {
	var initialize = function() {
		//function initialize() {
		var pos = new google.maps.LatLng(51.508742, -0.120850);
		var mapProp = {
			center : pos,
			zoom : 16,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var marker = new google.maps.Marker({
			position : pos,
			map : map,
			draggable : false,

		});

		var contentString = $('#legend').html();
		var infowindow = new google.maps.InfoWindow({
			content : contentString,

		});

		var map = new google.maps.Map(document.getElementById("custom_map"), mapProp);
		marker.setMap(map);
		infowindow.open(map, marker);

	}

	google.maps.event.addDomListener(window, 'load', initialize);

};


$(document).ready(function() {
	
	$('.image-link').on('click',function(e)
	{
		e.preventDefault();
	})


	
	
	if($('.fancybox-thumb').length){
	$(".fancybox-thumb").fancybox({
		prevEffect : 'none',
		nextEffect : 'none',
		helpers : {
			title : {
				type : 'outside'
			},
			thumbs : {
				width : 1140,
				height : 556
			}
		}
	});
}
});


$(window).load(function() {
if (jQuery('.anim-section').length) { 
			animSection()
	};
	if ($('#carousel').length) {

		// The slider being synced must be initialized first
		$('#carousel').flexslider({
			animation : "slide",
			controlNav : true,
			animationLoop : true,
			slideshow : false,
			itemWidth : 115,
			itemMargin : 5,
			asNavFor : '#slider'
		});

		$('#slider').flexslider({
			animation : "slide",
			controlNav : false,
			animationLoop : true,
			slideshow : false,
			sync : "#carousel"
		});
	}
	
	$('.row-box').on('click',function(){
	
	$('.product-gallery').addClass('gallery-items');
	$('.grid-box').removeClass('active');
	$(this).addClass('active');
})
$('.grid-box').on('click',function(){
	$('.product-gallery').removeClass('gallery-items');
	$('.row-box').removeClass('active');
	$(this).addClass('active');
})


$('.grid-box').on('click',function(){
	$('.church-wrap').addClass('gallery-items');
	$('.row-box').removeClass('active');
	$(this).addClass('active');
})

$('.row-box').on('click',function(){
	$('.church-wrap').removeClass('gallery-items');
	$('.grid-box').removeClass('active');
	$(this).addClass('active');
})

//=======================audio player function===================
	
	if ($('audio').length) {
 $( 'audio' ).audioPlayer(); 
 $('.audioplayer-playpause').on('click',function(){ 
 	if($(this).parents('.audioplayer').hasClass('audioplayer-playing')){
 		$(this).parents('.btns').find('.play-player').removeClass('active');
 		$(this).parents('.btns').find('.pause-player').addClass('active');
 	}
 	else{
 		$(this).parents('.btns').find('.pause-player').removeClass('active');
 		$(this).parents('.btns').find('.play-player').addClass('active');
 	}
 	//$('.btns').find('.active').removeClass('active');
 	
 	// ;
 	
 })
	}

$('.show-more').on('click',function(){
	$('.load-item').addClass('load-block');
	$(this).text('No More Items')
	return false;
})



$(document).on('mouseenter','.big-menu-wrap li a', function () {
   	var sv = jQuery(this).attr('data-background');
    	jQuery('.theme-overview img').attr('src',sv)
}).on('mouseleave','.big-menu-wrap li a',  function(){
   	var sv = jQuery(this).attr('data-background');
    	jQuery('.theme-overview img').attr('src',sv)
    });


jQuery('.play-btn').on('click',function(){
        video1 = '<iframe src="'+ jQuery('.video img').attr('data-video') +'"></iframe>';
        
        jQuery('.video img').after(video1);
     return false; 	
     
    });
	

});



 if ($('#map-box').length) {
				var markers = [{
					"lat" : '40.690428',
					"lng" : '-73.874188',		
					"icon" : 	'../assets/img/map-8-icon1.png'				
				}, 
				
				{
					"lat" : '40.669560',
					"lng" : '-73.862890',
					"icon" : 	'../assets/img/map-8-icon2.png'	
				}, 
				];
				
				
				
				window.onload = function() {
					var mapOptions = {
						center : new google.maps.LatLng(markers[0].lat, markers[0].lng),
						zoom : 10,
						scrollwheel: false,
						mapTypeId : google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(document.getElementById("map-box"), mapOptions);
					var infoWindow = new google.maps.InfoWindow();
					var lat_lng = new Array();
					var latlngbounds = new google.maps.LatLngBounds();
					for ( i = 0; i < markers.length; i++) {
						var data = markers[i]
						var myLatlng = new google.maps.LatLng(data.lat, data.lng);
						var iconMap  = new google.maps.MarkerImage(data.icon);
						lat_lng.push(myLatlng);
						var marker = new google.maps.Marker({
							position : myLatlng,
							map : map,
							title : data.title,
							icon  : iconMap
						});
						
						latlngbounds.extend(marker.position);
						
						
						
						

					}
					map.setCenter(latlngbounds.getCenter());
					map.fitBounds(latlngbounds);

					//***********ROUTING****************//

					//Intialize the Path Array
					var path = new google.maps.MVCArray();

					//Intialize the Direction Service
					var service = new google.maps.DirectionsService();

					//Set the Path Stroke Color
					var poly = new google.maps.Polyline({
						map : map,
						strokeColor : '#ff4214',
						strokeWeight: 6
						});

						

					//Loop and Draw Path Route between the Points on MAP
					for (var i = 0; i < lat_lng.length; i++) {
						if ((i + 1) < lat_lng.length) {
							var src = lat_lng[i];
							var des = lat_lng[i + 1];
							path.push(src);
							poly.setPath(path);
							service.route({
								origin : src,
								destination : des,
								travelMode : google.maps.DirectionsTravelMode.DRIVING
							}, function(result, status) {
								if (status == google.maps.DirectionsStatus.OK) {
									for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
										path.push(result.routes[0].overview_path[i]);
									}
								}
							});
						}
					}
				}
			}
})(jQuery);			