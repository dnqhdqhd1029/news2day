
$(document).ready(function (){

  $(".portal").click(function() {
		$(".portal_layer").slideToggle(500);
	});
  COMMON.init();
});

var COMMON = {
    init : function () {

        var self = this;
        self.eventBind();
    },
    eventBind : function(){
        var self = this ;


       $(".right_banner").scrollFollow({
         speed: 1000,    // 속도
         offset: 0     // 상단에서 부터의 거리
       });

       $(".left_banner").scrollFollow({
         speed: 1000,    // 속도
         offset: 0     // 상단에서 부터의 거리
       });

       $(".allMenu").find(".list_item").hover(function() {
					$(".allMenu").find(".sub_mn").css({"z-index": "499"});
					$(this).find(".sub_mn").css({"z-index": "500"});
				});

        $(".navbar_first").hover(function() {
						$(".navbar_first").removeClass("on");
						$(this).addClass("on");
					});



  },


};
