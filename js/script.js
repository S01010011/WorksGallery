
(function(){

// loading...
$('#preloader').stop(true).fadeOut(1000);

$(window).on('load',function(){

	// owlCarousel
	$('#owl-box').owlCarousel({
		loop: true,
		autoPlay: true,
		navigation: false,
		pagination: true,
		slideSpeed: 1200,
		items: 4,
		itemsDesktop: [1199, 4],
		itemsDesktopSmall: [979, 3],
		itemsTablet: [768, 2],
		itemsMobile: [480, 1]
	});

	// Waterfall
	function Waterfall(){
		this.$wrapBox = $('#waterfall');
		this.$variableBox = this.$wrapBox.parent();
		this.$contents = this.$wrapBox.children('.ef-content');
		this.$conWidth = this.$contents.eq(0).outerWidth(true);
		this.hArr = [];

		this.setPos();
	}
	Waterfall.prototype.setPos = function(){
		// 计算列数
		var cols = Math.floor(this.$variableBox.outerWidth()/this.$conWidth);
		
		// 设置wrapBox宽度并居中
		this.$wrapBox.css({
			width:cols * this.$conWidth,
			margin:'0 auto',
			position:'relative'
		});

		// 定位
		this.hArr = [];
		var self = this;
		this.$contents.each(function(index,elem){
			// 清除原来的样式
			$(this).attr('style','');

			if(index<cols){
				self.hArr.push($(this).outerHeight(true));
			}
			else{
				// 获取最矮的高度及其索引
				var minH = Math.min.apply(null, self.hArr),
					minIndex = $.inArray(minH, self.hArr);

				// 设置高度
				$(this).css({
					position:'absolute',
					top:minH,
					left:minIndex * self.$conWidth
				});

				// 更新高度数组
				self.hArr[minIndex] += $(this).outerHeight(true);
			}
		});
	}

	var wf = new Waterfall;

	$(window).resize(function(){
		wf.setPos();
	})

	// tipToggle
	var $toggle = $('#header .toggle'),
		$info = $toggle.siblings('p'),
		state = 'showed';

	$toggle.on('click',function(){
		if(state === 'showed') {
			$info[0].className = "animated bounceOutRight";
			state = 'hidden';
			$(this).find('span').text(' 打开提示');
			$(this).find('.fa').css('transform','rotate(180deg)');
		}
		else if(state === 'hidden'){
			$info[0].className = "animated bounceInRight";
			state = 'showed';
			$(this).find('span').text(' 收起提示');
			$(this).find('.fa').css('transform','');
		}
	})

});

})();