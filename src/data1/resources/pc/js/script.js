var mediaData = {
    mediaDomain : '',
    mediaCdn : ''
};

/*전체메뉴 드롭다운*/
$(function () {
	
    var pathName = location.pathname;
	
    //메인 페이지
    if (pathName == "/" || pathName == "main" || pathName == "/main") {
        MAIN.init();
    // 메트로in,서민금융,Job&에듀
    }else if(pathName.indexOf('section') >-1 || pathName.indexOf('list') > -1 ||
	pathName.indexOf('list') > -1 || pathName.indexOf('plan') > -1 || pathName.indexOf('local') > -1 || pathName.indexOf('newsList') > -1){
    //SECTION.init();
		LIST.init();
    //상세
    }else if(pathName.indexOf('article') > -1 || pathName.indexOf('newsView') > -1){
        VIEW.init();

    }else if(pathName.indexOf('search') > -1 ){
        SEARCH.init();

    }else if(pathName.indexOf('member') > -1 ){
        MEMBER.init();
    }else if(pathName.indexOf('event') > -1 ){
        EVENT.init();
    }else if(pathName.indexOf('photo') > -1 ){
        /*t*/
        PHOTO.init();
    }else if (/^\/company\/.*?/.test(pathName)) {
        COMPANY.init();
    }
    servicePopup.init();
    SRV.init();
});
//*전체메뉴 드롭다운*/

var offset = 0;
var page = 2;
//기본
var SRV = {
    init : function () {
        var self = this;
        console.log("SRV.INIT");
        self.eventBind();
        self.mediaData();
        self.boardPopup();
        //self.mainHeadLine();
        //self.statisticsInit();

    },
    eventBind : function(){
        var self = this ;

         $('.main-menu').on('click', function () {
            if (!($('body').hasClass('body-small'))) {
                $("body").toggleClass("menu-drop");
                // SmoothlyMenu();
            }
        });

        $(".top-search-ico").on('click',function () {
            $("#m_search_box_02").slideToggle("fast");
        });

        $(".top-menu-ico").on('click',function () {

            $('#side-menu').stop().animate({
                'marginLeft': ''
            }, 200);
        });

        $(".cancel-ico-01").on('click',function () {

            $('#side-menu').stop().animate({
                'marginLeft': '-100%'
            }, 200);
        });

        $(".btn_search_input,.m_btn_search_input").on("keyup", function () {
            var  txt = $(this).val();
			if (window.event.keyCode == 13) {
				SRV.goPage('/search?searchText='+encodeURI(txt));
			}
        });
        $("#btn_search_click").on("click", function(){
            SRV.goPage('/search?searchText='+encodeURI($(".btn_search_input").val()));
        });

        //제휴/광고 등록
        $("#btn_partner_click").on("click", function(){
            SRV.partner();
        });

        //기사제보 등록
        $("#btn_report_click").on("click", function(){
            //SRV.partner();
        });

        //제휴/광고 등록
        $("#btn_service_click").on("click", function(){
            //SRV.partner();
        });

    },

    mediaData : function(){
        $.ajax({
            url: "/rest/media",
            contentType: "application/json",
            type: "GET",
            dataType:"JSON",
            success: function(data){
                mediaData.mediaCdn = data.mediaCdn;
                mediaData.mediaDomain = data.mediaDomain;
            },
            error: function (error){
                //alert('다시 시도하세요');
            }
        });

    },

    boardPopup : function(obj){
		/*
        // 모바일
        if(ObjectUtils.deviceChk()){
        }else{
        // PC
        }
*/
    },
    partner : function(){
      alert('작업중입니다');

/*
      if($("input[name=agree_]").is(":checked")){
        alert('개인정보 수집에 동의하세요');
        return false;
      }

      if(Object.isEmpty($("input[name=name_val]").val() || Object.isEmpty($("input[name=mail_val]").val() || Object.isEmpty($("input[name=subject_val]").val() Object.isEmpty($("input[name=content_val]").val())){
        alert('필수항목을 입력하세요');
        return false;
      }

      $.ajax({

          url: "/rest/search",
          type: "GET",
          contentType: "application/json",
          dataType:"JSON",
          data: {
              searchText : $("#searchText").val(),
              searchType : 'all',
              from : $("#from").val(),
              to : $("#to").val(),
              page : pageNum,
              sort : sort
          },
          success: function(data){
          },
          error: function (error){
              console.log(error);
          }
        });

      var insertata = {'bannerSeq' : bannerSeq, 'url' : url, 'today' : today, 'left' : left , 'top' : top};
      */

    },
    report : function(){
      alert('작업중입니다');
    },
    serviceCenter : function(){
      alert('작업중입니다');
    },
	 banner : function(){
		$(".banner_render a").off().on('click',function (){
			var bannerSeq = $(this).attr('target').replace('banner_','');
			var url = window.location.href;
			var left = $(this).offset().left;
			var top = $(this).offset().top;
			var today = new Date();
			var obj = {'bannerSeq' : bannerSeq, 'url' : url, 'today' : today, 'left' : left , 'top' : top};
			$.ajax({
				url: "/rest/banner/count",
				type: "POST",
				dataType:"JSON",
				data: obj,
				success: function(data){

				},
				error: function (error){
					console.log(error);
				}
			});
		});

	},
    //이동
    goPage : function (url, target) {
        if (ObjectUtils.isNotEmpty(url)) {
            target = ObjectUtils.isEmpty(target) ? "_self" : target;
            window.open(url, target);
        }
    },

    eventKey : function(){
        //엔터
        if(event.keyCode == 13){
            SEARCH.goSearch();
        }

    },

    mainHeadLine : function(){

            window.artyom = new Artyom();
            if(artyom.speechSupported()){
                artyom.ArtyomVoicesIdentifiers["ko-KR"] = ["Google 한국의", "ko-KR", "ko_KR"];
                artyom.initialize({
                    lang:"ko-KR",
                    debug:false
                }).then(function(){
                }).catch(function(err){
                    console.log(err);
                });
            }else{
                //alert("지원하지 않는 브라우저입니다.");
                /* $("#contents").prop("disabled", "disabled");
                    $("#ttsBtn").hide();
                */

            }

            $(".speaker-listbox").on("click", function(){

                var agent = navigator.userAgent.toLowerCase();
                if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
                    alert("익스플로러에서는 제공되지 않는 기능입니다. \n 크롬에서 이용해주세요.");
                }else{

                    var flag = $(".speaker-listbox").hasClass('true') ;
                    var contents = $("#speaker").text();
                    var rightContents = $("#speaker_right").text();
                    if(flag) {
                      $(".speaker-listbox").removeClass('true');
                        artyom.shutUp();
                    }else{

                      $(".speaker-listbox").addClass('true');

                        artyom.say(contents,{
                            onEnd: function(){
                                artyom.say(rightContents,{
                                onEnd: function(){
                                    $(".speaker-listbox").removeClass('true');
                                    artyom.shutUp();
                                }

                                });
                            }

                        });
                    }
                }

            });

    }/*,

    statisticsInit : function(){
      if(!wcs_add) var wcs_add = {};
      wcs_add["wa"] = "73667ba2315ec4";
      if(window.wcs) {
        wcs_do();
      }
    },*/

};

//메인 페이지
var MAIN = {
    init : function () {
        console.log("MAIN INIT");
        var self = this;
        self.eventBind();
    },
    eventBind : function() {
        var self = this;

        $(".latest-news-arrow").on("click", function(){
           $("#dropdown_show").toggleClass('show');
        });

    }
};

var SECTION = {
    init : function (){
        var self = this;
        self.plan();
    },
    plan : function () {
        $(".plan_area").css({"display":"block"});
        $("#div_section").after($("#plan_series").html());
        $(".section_template").next().remove();
    }
};

var VIEW = {


     init : function () {
        var self = this;
        console.log("VIEW INIT");
        self.eventBind();
        //self.articleListen();
        //self.restCount();
		    self.menuActive();
        self.clickDelBtn();
		self.commentList();
        //self.contentMetro();
		//self.imgIcoAppend();
		//self.metroBylineRemove();
    },
    txtCount : function () {
        $("#lenthChk").html($("textarea[name=commentBody]").val().length);
    },
    txtCheck : function () {
        if(ObjectUtils.isEmpty($("input[name=userName]").val())){
            var result = confirm('로그인 한 후 이용 가능합니다.\n로그인 하시겠습니까?');
            if(result){
                SRV.goPage('/member/login', '_self');
            }
        }
    },
	menuActive : function () {


        // if (ObjectUtils.isNotEmpty(SE)) {
        //     for (var i=0; i<SE.length; i++) {
        //         if ("/00/01/CA/001" != SE[i].organizationalUnit) {
        //             section = self.sectionEnum[SE[i].organizationalUnit];
        //             break;
        //         }
        //     }
        // } else if (ObjectUtils.isNotEmpty(CA)) {
        //     for (var i=0; i<CA.length; i++) {
        //         if ("/00/01/CA/001" != CA[i].organizationalUnit) {
        //             section = self.sectionEnum[CA[i].organizationalUnit];
        //             break;
        //         }
        //     }
        // }

        /*if (ObjectUtils.isNotEmpty(CA)) {
            for (var i=0; i<CA.length; i++) {
                    section = self.sectionEnum[CA[i].organizationalUnit];
                    break;
            }
        }
        if (ObjectUtils.isNotEmpty(section)) {
            LIST.menuActive(LIST.menuEnum[section.menu]);
        }*/

    },
    eventBind : function() {
       var self = this;

       var mainTitle = $("input[class='siteViewTitlte']").val();
       var newsId = $("input[class='siteStoryId']").val();
	   var sizeCount=0;

       //글자크기 조절
       $(".txt-sizeup").on("click", function() {
		   //alert(sizeCount);
		    if(sizeCount < 4){
            var font_size = $(".view_con_wrap").css("fontSize");
						font_size =	font_size.replace('px','');
						font_size = Number(font_size) + 5;

$('.view_con, .view_con *').css('font-size', font_size+'px');
            $('.view_con_wrap').css('font-size', font_size+'px');
			sizeCount++;
			}

       });

        $(".txt-sizedown").on("click", function() {
			//alert(sizeCount);
			if(sizeCount > -2){
            var font_size = $(".view_con_wrap").css("fontSize");
						font_size =	font_size.replace('px','');
            font_size = Number(font_size) - 5;

$('.view_con, .view_con *').css('font-size', font_size+'px');
            $('.view_con_wrap').css('font-size', font_size+'px');
			sizeCount--;
			}

       });

        //카카오스토리공유
        $(".sns_kakaoStory").on("click", function(){
            var url = window.location.href+'?sns=ks';
            window.open('https://story.kakao.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(mainTitle),'',"scrollbars=yes,resizable=yes width=500,height=600");
        });
        //밴드공유
        $(".sns_band").on("click", function(){
          //var url = window.location.href+'?sns=bn';
          //  window.open('http://band.us/plugin/share?body=' + encodeURIComponent(mainTitle) + ' - ' + encodeURIComponent(url) + '&route=', "scrollbars=yes,resizable=yes width=500,height=600");

			var u = location.href;
			window.open('http://band.us/plugin/share?body=' + encodeURIComponent(mainTitle + "-" + u) + '&route=' + encodeURIComponent(""), 'share_band', 'width=410, height=540, resizable=no');
            return false;
        });
        //페이스북공유
        $(".sns_faceBook").on("click", function(){
          //var url = window.location.href+'?sns=fb';
          //  window.open('http://www.facebook.com/sharer.php?u='+'http://www.news2day.co.kr/article/'+newsId+'?sns=fb', 'mywin','left=50,top=50,width=600,height=350,toolbar=0');
 //var url = window.location.href+'?sns=fb';
   //         window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(url), '',"scrollbars=yes,resizable=yes width=500,height=600");

		    var u = location.href;
            //window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u),'sharer','toolbar=0,status=0,width=626,height=436');
            window.open('https://www.facebook.com/sharer/sharer.php?display=popup&u=' + encodeURIComponent(u), 'sharer', 'toolbar=0,status=0,width=626,height=436');

        });
        //트위터공유
        $(".sns_twitter").on("click", function(){
			/*
            var url = window.location.href+'?sns=tw';
            var href ="https://twitter.com/intent/tweet?url="+encodeURIComponent(url)+"&text="+encodeURIComponent(mainTitle);
            var a = window.open(href,'twitter','');

            if(a){
               a.focus();
            }
			*/
			var u = location.href;
			var url = "http://twitter.com/share?text=" + encodeURIComponent(mainTitle) + "&url=" + escape(u);
            window.open(url);
        });

        //글자크기
       $(".txt-sizebtn").on("click", function(){
           if($(".sns-share-layer").css("display") == 'block'){
                $(".sns-share-layer").slideToggle("fast");
            }
            $(".sns-txtsize-layer").slideToggle("fast");
        });

        //공유버튼
        $(".share-btn").on("click", function(){
            if($(".sns-txtsize-layer").css("display") == 'block'){
                $(".sns-txtsize-layer").slideToggle("fast");
            }
            $(".sns-share-layer").slideToggle("fast");
        });

         // 프린트 팝업
        $(".print-ico").on("click", function() {

            if(ObjectUtils.isNotEmpty(newsId)){
                window.open("/print/"+newsId, "print팝업", "width=820, height=800, menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, toolbar=no");
            }
        });

        // 기사 상세 이미지 클릭 시 팝업
        $('.left-container .article-txt-contents img').on('click', function(){

            var url = $(this).attr('src');

            if(url.indexOf('/.cache/512')> -1 || url.indexOf('/.cache/128') > -1){
                url  = url.substring(0,49)  +  url.substring(60) ;
            }


			window.open(url,"_blank","width=850,height=550,menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, toolbar=no");

        });

        $(".delIco").on('click', function(){
          $(this).closest('span').html();
      });

      $("#commentCre").on('click', function(){

        /*if(!$("input[name=userName]").prop("readonly")){
            if (grecaptcha.getResponse().length == 0) {
                alert('로봇을 체크하세요.');
                return;
            }
        }*/
			var offset = 0;	
			var page = $("#page").val();	
			
			if(page == ''){
				page = 2;
			}

          if(ObjectUtils.isEmpty($("textarea[name=commentBody]").val())){
              alert('내용을 입력하세요');
              return;
          }

          if(ObjectUtils.isEmpty($("input[name=userName]").val())){
              alert('로그인 후 이용하세요');
              return;
          }

          if(!$("input[name=userName]").prop("readonly")){
            if(ObjectUtils.isEmpty($("input[name=userPw]").val())){
                alert('비밀번호를 입력하세요');
                return;
            }
          }

        var data = {
          contentId : newsId,
          contentTitle : mainTitle,
          commentBody : $("textarea[name=commentBody]").val(),
          userId : $("input[name=userName]").val(),
          pw : ($("input[name=userName]").prop("readonly")) ? '' : $("input[name=userPw]").val(),
          writeName : $("#writeName").html(),
		  page : page,
		  offset : offset
        };

        $.ajax({
            url: "/rest/createComment",
            type: "POST",
            dataType:"JSON",
            data: data,
            success: function(data){
                if(data.message == 'SUCCESS'){
                    if(!$("input[name=userName]").prop("readonly")){
                        $("input[name=userName]").val('');
                        $("input[name=userPw]").val('');
                    }
                    $("#lenthChk").html('0');
                    $("textarea[name=commentBody]").val('');
                    self.drawCommentList(data);
                }
            },
            error: function (error){
                alert('다시 시도하세요');
            }
        });
      });

    },

    clickDelBtn : function () {
      var self = this;

        $(".reply_delete_custom").off().on('click', function() {
					
			var page = $("#page").val();	
			
			if(page == ''){
				page = 2;
			}
			
            var data = {
                contentId : $("input[class='siteStoryId']").val(),
                pw : '',
                commentSeq : $(this).next('.commentId').val(),
				page : page,
				offset : offset
              }
              self.deleteComment(data);
        });

        $(".reply_delete_ico").off().on('click', function(){
          $(this).prev('div.delete_input').css('display','block');
          $(this).css('display','none');
        });

        $(".password_cancel_btn").off().on('click', function(){
          var $selete= $(this).parents('div.delete_input');
          $selete.css('display','none');
          $selete.next('img.reply_delete_ico').css('display','block');
        });

        $(".password_del_btn").off().on('click', function(){		  

          if(ObjectUtils.isEmpty($(this).prev('input[name=delPassword]').val())){
            alert('비밀번호를 입력하세요');
            return;
          }else{
            var data = {
              contentId : $("input[class='siteStoryId']").val(),
              pw : $(this).prev('input[name=delPassword]').val(),
              commentSeq : $(this).next('.commentId').val(),
         	  page : page,
			  offset : offset
            }
            self.deleteComment(data);
          }
        });
		
		$(".replyMoreView").off().on('click', function(){		  			
			page++;
			$("#page").val(page);
            self.commentList(page);
        
        });
		
    },

    deleteComment : function (data) {
      var self = this;
      $.ajax({
          url: "/rest/deleteComment",
          type: "POST",
          dataType:"JSON",
          data: data,
          success: function(data){
            if(data.message == 'FAILPW'){
              alert('패스워드가 일치하지 않습니다');
            }else if(data.message == 'SUCCESS'){
              self.drawCommentList(data);
            }
          },
          error: function (error){
              alert('다시 시도하세요');
          }
      });
    },
	
	
	// 댓글 리스트
	commentList : function (page) {
	
		var self = this;
	
		var newsId = $("input[class='siteStoryId']").val();		
		
		if(typeof page == 'undefined'){
			page = 2;
		}
		
		var data = {
			contentId : newsId,
			page : page,
			offset : offset
		};
  
		$.ajax({
			url: "/rest/commentList",
			type: "GET",
			dataType:"JSON",
			data: data,
			success: function(data){
				
				self.drawCommentList(data);	
								
			},
			error: function (error){
				console.log('댓글을 불러올 수 없습니다');
			}
		});
	},

    drawCommentList : function (o){
      var self = this;
     $("#commentList").empty();
     let html = '';
	 var pageCount = 0;
	 var pageSize = o.comment.pageSize;
     var userName = $("input[name=userName]").val();
	 var contentsUrl = $("#contentsUrl").val(); 
     var contentsUrl2 = contentsUrl.replace("data2", "");
         $.each(o.comment.commentList, function (i, item){

             var agent = navigator.userAgent.toLowerCase();
               var frDate = item.updateDatettime;
               if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
                   //ie
                   frDate = frDate.split('.')[0];
               }else{

                   frDate = frDate;
               }

		   var date = new Date(frDate);
		   var year = date.getFullYear();
		   var month = ObjectUtils.pad(date.getMonth()+1,2);
		   var day = ObjectUtils.pad(date.getDate(),2);
		   var hh = ObjectUtils.pad(date.getHours(),2);
		   var mm = ObjectUtils.pad(date.getMinutes(),2);
		   var updateDate = year + '-' + month + '-' + day + ' ' + hh + ':' + mm;
			if(i<pageSize){				 
			   html += '<div class="reply_txt">';
			   html += '<div class="reply_title_set">';
			   html += '<span>'+item.updateId+'</span>';
			   html += '<span>'+updateDate+'</span>';
			   html += '</div>';
			   html += '<div class="reply_contents">';
			   html += '<p>'+item.commentBody+'</p>';
			   html += '</div>';
			   html += '<div class="reply_edit_area">';
			   html += '<div class="delete_input">';
			   html += '<div class="delete_wrap">';
			   html += '<input type="password" class="form-control w180" placeholder="비밀번호를 입력하세요" name="delPassword">';
			   html += '<button class="btn btn-type-blue password_del_btn">삭제</button>';
			   html += '<input class="commentId" style="display:none" value="'+item.commentSeq+'">';
			   html += '<button class="btn btn-type-gray password_cancel_btn">취소</button>';
			   html += '</div>';
			   html += '</div>';
			   if(ObjectUtils.isNotEmpty(item.customYn) && item.customYn == 'N'){
				 html += '<img src="'+contentsUrl2+'data1/resources/pc/images/ico/delete_ico.png" alt="삭제" class="reply_delete_ico"/>';
			   }
			   if(ObjectUtils.isNotEmpty(item.customYn) && (item.customYn == 'Y') && (userName == item.registId)){
				 html += '<img src="'+contentsUrl2+'data1/resources/pc/images/ico/delete_ico.png" alt="삭제" class="reply_delete_custom"/>';
				 html += '<input class="commentId" style="display:none" value="'+item.commentSeq+'">';
			   }
			   
			   html += '</div>';
			   html += '</div>';
			   
			   pageCount = i+1;
			}

       });
		
		var getPage = (page - 1) * 10;
		var commentCount = o.comment.count - pageCount;
		if(pageCount == getPage && getPage < o.comment.count){
			html += '<div class="repl_more replyMoreView">댓글 더보기</div>'; 
		}
		
       
      
       $(".commentCnt").html('댓글('+o.comment.count+')');
       $("#commentList").append(html);
       self.clickDelBtn();
        
    },



    restCount : function(){

        var url = window.location.pathname ;
		var referrer = document.referrer;
		referrer = referrer.split(".")[1]
        var newsId = url.substring(url.lastIndexOf('/')+1);
		console.log(referrer);
		if(!referrer){
			referrer = 'other';
		}
        var obj = {id : newsId,
				   referrer : referrer
		};
        $.ajax({
            url: "/rest/count",
            type: "POST",
            dataType:"JSON",
            data: obj,
            success: function(data){

            },
            error: function (error){
                console.log(error);
            }
        });


    },
    contentMetro : function(){

        if($(".article-txt-contents .col-12 p").length > 0){
            for(var i= 0 ; $(".article-txt-contents .col-12 p").length; i++){
                if( ($(".article-txt-contents .col-12 p").eq(i).html() != '&nbsp;') && ($(".article-txt-contents .col-12 p").eq(i).attr('class') != 'sub_news_title')
					&& ($(".article-txt-contents .col-12 p").eq(i).parent('blockquote').length < 1)){

                    var metro_ = "[메트로신문] "+$(".article-txt-contents .col-12 p").eq(i).html() ;
                    $(".article-txt-contents .col-12 p").eq(i).html(metro_);
                    break;
                }

            }



        }


    },
	imgIcoAppend : function(){
		var self = this;
		var $imags = $('.left-container .article-txt-contents img');
		$.each($imags, function (i, v) {
			if (v.complete && !v.naturalWidth && !v.naturalHeight) {
				$(v).attr('src', 'http://s3.ap-northeast-2.amazonaws.com/dev.metromedia/data1/resources/pc/images/etc/noImg_blank.png');
				$(v).attr('width', '100%');
			}
			else {
				var imgIcoUrl = "http://cdn.emetro.co.kr/data1/resources/pc/images/ico/img_zoom_ico_03.png";
				var imgTag = "<img src='"+imgIcoUrl+"'class='article_img_zoom' alt='원본이미지보기' title=''>" ;
				$(v).after(imgTag);
			}
		});
		self.imgIcoClick();
	},
	imgIcoClick : function(){
		$(".article_img_zoom").on("click",function(){
			var num = $(".article_img_zoom").index(this);
			$('.left-container .article-txt-contents img').not("img.article_img_zoom").eq(num).trigger('click');
		});



	},
	metroBylineRemove : function(){
		if($(".byline_replace").length > 1){
			if($(".byline_replace").html().indexOf('메트로신문 메트로신문') > -1 ){
				var byline_head = $(".byline_replace").eq(0).html();
				var byline_content = $(".byline_replace").eq(1).html();

				byline_head = byline_head.substring($(".byline_replace").eq(0).html().indexOf('메트로신문 메트로신문')+6);
				byline_content = byline_content.substring($(".byline_replace").eq(1).html().indexOf('메트로신문 메트로신문')+6);

				$(".byline_replace").eq(0).html(byline_head);
				$(".byline_replace").eq(1).html(byline_content);
			}
		}
	}

};


var SEARCH = {
    init : function () {
        var self = this;

        self.startSearch();
        //input을 datepicker로 선언
        $("#to").datepicker({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
            ,changeYear: true //콤보박스에서 년 선택 가능
            ,changeMonth: true //콤보박스에서 월 선택 가능
            ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
            ,minDate: "-10Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+10Y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        });

        $("#from").datepicker({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
            ,changeYear: true //콤보박스에서 년 선택 가능
            ,changeMonth: true //콤보박스에서 월 선택 가능
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
            ,minDate: "-10Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+10Y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        });



        $("#to").on("click", function() {
            $('#to').datepicker('setDate'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        });


        $("#from").on("click", function() {
            $('#from').datepicker('setDate'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        });





    },

    startSearch : function (){

        var searchText = ObjectUtils.getParameterByName('searchText');
        $("#searchText").val(searchText);
        if(!ObjectUtils.isEmpty(searchText)){SEARCH.goSearch();}else{
			var html ="";
			html += "<span>' '</span>";
            html += "<span>검색결과 ( 검색결과가 없습니다)</span>";
			html += "  <ul class='result_guideTxt'>";
            html += "<li>단어의 철자가 정확한지 확인해보세요</li>";
            html += "<li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해보세요</li>";
            html += "</ul>";

			$(".result-txt").html(html);
			$(".search-opt-container").css({"display":"none"});

		}
    },

    goSearch : function (pageNum,sort){


        if (typeof pageNum == "undefined" || pageNum == null || pageNum == "undefined" || pageNum == '' || pageNum < 2) {
            pageNum = 1;
        }
        if(sort=='_score'){
            $("#sort_new").removeClass('active');
            $("#sort_exact").addClass('active');
        }else{
            $("#sort_new").addClass('active');
            $("#sort_exact").removeClass('active');
        }

        var url = location.pathname;


        if(url.indexOf('list2') >-1){

          $.ajax({
              url: "/rest/search",
              type: "GET",
              contentType: "application/json",
              dataType:"JSON",
              async: false,
              data: {
                  searchType : 'all',
                  from : $("#searchDate").val(),
                  to : $("#searchDate").val(),
                  page : pageNum,
                  sort : sort
              },
              success: function(data){
                SEARCH.allArticle(data);
                SEARCH.renderPaging(data,sort);
              }
            });
        }else{

            if(ObjectUtils.isEmpty($("#searchText").val())){
                alert("검색내용을 입력하세요.");
                return false;
            }else{

                $.ajax({

                    url: "/rest/search",
                    type: "GET",
                    contentType: "application/json",
                    dataType:"JSON",
                    data: {
                        //searchText : "\"" + $("#searchText").val() + " \"",
						searchText : $("#searchText").val(),
                        searchType : 'all',
                        from : $("#from").val(),
                        to : $("#to").val(),
                        page : pageNum,
                        sort : sort
                    },
                    success: function(data){
    					var html = '<span id="result-search-text"></span> <span id="result-search-count"></span>';



    					$(".search-opt-container").css({"display":"block"});
    					$(".result-txt").children().remove();
    					$(".result-txt").html(html);
                        $("#result-search-text").html("'"+data.searchText+"'");
                        $("#result-search-count").html("검색결과 ( 전체기사 중 "+ObjectUtils.commaAdd(data.pages.totalElements)+"건의 기사가 검색되었습니다.)");
                        SEARCH.renderArticle(data);
                        SEARCH.renderPaging(data,sort);

                    },
                    error: function (error){
                        console.log(error);
                    }

                });
            }
          }
    },

    dateSetList : function (date) {

      let html= "";
      var self = this;
      let today, useDay;
      if(ObjectUtils.isEmpty(date)){
        today = new Date();
      }else{
        var dateArray = date.split('-');

        today = new Date(dateArray[0], dateArray[1]-1, dateArray[2],0,0,0,0);

        let yy = today.getFullYear();
        let mm = today.getMonth()+1;
        let dd = today.getDate();

        useDay = [yy, (mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('-');
      }


      if(ObjectUtils.isEmpty(useDay)){
        html += "<li class='setDateClick on'><a href='/list2/83'>전체보기</a></li>";
      }else{
        html += "<li class='setDateClick'><a href='/list2/83'>전체보기</a></li>";
      }

      var week = new Array('일','월','화','수','목','금','토');

      for(var i=0; i <= 6; i++){
        if(i != 0){
          today.setDate(today.getDate() -1);
        }

        let yy = today.getFullYear();
        let mm = today.getMonth()+1;
        let dd = today.getDate();

        var value = [yy, (mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('-');

        if(value == useDay){
          html += '<li class="setDateClick on" data-date-value ='+value+'><a href="javascript:void(0);" onclick="SEARCH.goSearch();return false;" >'+mm+'.'+dd+'('+week[today.getDay()]+')'+'</a></li>';
        }else{
          html += '<li class="setDateClick" data-date-value ='+value+'><a href="javascript:void(0);" onclick="SEARCH.goSearch();return false;" >'+mm+'.'+dd+'('+week[today.getDay()]+')'+'</a></li>';
        }
      }
        html +=  '<li class="sch_date"><a href="#" onclick="netfu_util.calendar_sels()"><img src="http://kr.object.ncloudstorage.com/dev-news2day/data1/resources/pc/images/icon/calendar_icon1.png" alt="날짜선택">날짜선택</a></li>';
        $("#setDateFnc").empty();
        $("#setDateFnc").append(html);

        if(ObjectUtils.isNotEmpty(date)){
          $("#searchDate").val(date);
          SEARCH.goSearch();
        }

        $(".setDateClick").on("click", function(){

          $(".setDateClick").removeClass('on');
          $(this).addClass('on');
          var vur = $(this).data('dateValue');


          if(ObjectUtils.isNotEmpty(vur)){
            $("#searchDate").val(vur);
            SEARCH.goSearch();
            self.dateSetList(vur);
          }
        });
    },

    allArticle : function (data){
      var html = "";
      var bannerArea = false;
      $("#article_list").empty();

      if (data.list && data.list.length > 0) {
html +="<ul class='art_list'>";
        $.each(data.list,function(idx, obj){

				var agent = navigator.userAgent.toLowerCase();
				var frDate = obj.firstReleaseDate;
				if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
					// ie일 경우
					frDate = frDate.split('.')[0];
				}else{
					// ie가 아닐 경우
					frDate = frDate;
				}
          var date = new Date(frDate);
          var year = date.getFullYear();
          var month = ObjectUtils.pad(date.getMonth()+1,2);
          var day = ObjectUtils.pad(date.getDate(),2);
          var hh = ObjectUtils.pad(date.getHours(),2);
          var relDate = year+'-'+month+'-'+day;
          var linkUrl = "/article/"+obj.id;
          var imgSrc = obj.imgSrc ;
		if(idx==5){
      bannerArea = true;
			html +="<li style='padding:20px 0 0 0;' id='left_list_ad_1'></li>";
		}

          html += "<li><div class='thumb'><a href="+linkUrl+">";

          if(!ObjectUtils.isEmpty(imgSrc)){
            if(imgSrc.indexOf('/0540/') > -1){
              imgSrc = data.contentsUrl + obj.imgSrc;
            }else if(imgSrc.indexOf('/exposure/') > -1){
              imgSrc = data.contentsUrl + obj.imgSrc;
            }else{
              imgSrc = data.contentsUrl + obj.imgSrc.substring(0,26) + ".cache/128/" + obj.imgSrc.substring(26);
            }

            html +='<div class="news_photo__  img_box" style="width:171px;height:96px;background:url('+imgSrc+') center 30% no-repeat; background-size:cover;" title="'+obj.title+'" onclick="SRV.goPage(\''+linkUrl+'\')"></div>';
						html +="</div>";
          }
          html += "</a></div><dl><dt><a href="+linkUrl+"><em></em><span>"+obj.title+"</span></a></dt><dd class='text'>"+obj.summary+"</dd>";
          html += "<dd class='catg_date'><a href="+linkUrl+"><ul class='catg'><li>"+obj.category[0].sectionPath+"</li></ul><span class='date'>"+relDate+"</span>";
          html += "</a></dd></dl></li>";
        });
        $("#article_list").html(html);

    if(bannerArea){
      $.ajax({
      type : "GET",
      url : "/wps/engine/rest/bannerGroup",
      dataType:"json",
      async: false,
      data:{
      "groupSeq" : '29',
      "mediaSeq" : '1'
      },
      success: function (data) {
        var bannerList = data.bannerList;
        $("#left_list_ad_1").empty();
        let bannerArea = "";
        bannerArea += "<div class='section_D banner_con'>";
          bannerArea += "<div id='S003E9277' style='width:875px; height:129px;' class='cycle-slideshow' data-cycle-fx='scrollVert' data-cycle-slides='> div' data-cycle-timeout='5000'>";
            $.each(bannerList, function (i, item) {

              bannerArea += "<div id='"+item.advertisingSeq+"'><div style='float:left;'>";
              bannerArea += "<a href='"+item.advertisingLinkUrl+"' target='_blank'>";

              if(item.appointHeight == '' || item.appointHeight == 'null'){
                bannerArea += "<img src='"+item.advertisingImgUrl+"' width='"+item.advertisingWidth+"' height='"+item.advertisingHeight+"'>";
              }else{
                bannerArea += "<img src='"+item.advertisingImgUrl+"' width='"+item.appointWidth+"' height='"+item.appointHeight+"'>";
              }
              bannerArea += "</a></div></div>";

   });

 bannerArea +="</div></div>";

        $("#left_list_ad_1").html(bannerArea);

        $("#S003E9277").cycle({
        fx:'scrollVert',
        timeout:5000
        });
      },error:function(error){console.log(error);}

      });
    }

		html +="</ul>";
    }

  },

    renderArticle : function (data){
        var html = "";
        var bannerArea = false;
        if (data.list && data.list.length > 0) {
			html +="<ul class='art_list'>";
            $.each(data.list,function(idx, obj){

				var agent = navigator.userAgent.toLowerCase();
				var frDate = obj.firstReleaseDate;
				if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
					// ie일 경우
					frDate = frDate.split('.')[0];
				}else{
					// ie가 아닐 경우
					frDate = frDate;
				}

                var date = new Date(frDate);
                var year = date.getFullYear();
                var month = ObjectUtils.pad(date.getMonth()+1,2);
                var day = ObjectUtils.pad(date.getDate(),2);
                var hh = ObjectUtils.pad(date.getHours(),2);
                var mm = ObjectUtils.pad(date.getMinutes(),2);
                var ss = ObjectUtils.pad(date.getSeconds(),2);
                var relDate = year+'-'+month+'-'+day+' '+hh+':'+mm+':'+ss;
                var linkUrl = "/article/"+obj.id;
                var subTitle = obj.subTitle ;
                var imgSrc = obj.imgSrc ;
				var writerName = "";
				if(ObjectUtils.isEmpty(obj.writerList)){
					writerName = obj.createdBy;
				}else{
					writerName = obj.writerList[0].WRITER_NAME;
				}

				if(idx==5){
          bannerArea = true;
					html +="<li style='padding:20px 0 0 0;' id='left_list_ad_1'></li>";
				}



                html +="<li>";
                //html +=   "<a href='"+linkUrl+"'>";
                //if(idx== 0){
                //    html +="<div class='media list-media-form pt20'>";
                //}else{
                //    html +="<div class='media list-media-form pt20 lineT'>";
                //}


                if(!ObjectUtils.isEmpty(obj.imgSrc)){
					if(imgSrc.indexOf('/0540/') > -1){
						imgSrc = data.contentsUrl + obj.imgSrc;
					}else if(imgSrc.indexOf('/exposure/') > -1){
						imgSrc = data.contentsUrl + obj.imgSrc;
					}else{
						imgSrc = data.contentsUrl + obj.imgSrc.substring(0,26) + ".cache/128/" + obj.imgSrc.substring(26);
					}

					if(!ObjectUtils.isEmpty(obj.highlightTitle)){
						html +="<div class='thumb'><a href='"+linkUrl+"'>";
						//html +=   '<div class="news_photo__  img_box" style="width:171px;height:96px;background:url('+imgSrc+') center 30% no-repeat; background-size:cover;" title="'+obj.highlightTitle+'" onclick="SRV.goPage(\''+linkUrl+'\')"></div>';
						html +=   '<div class="news_photo__  img_box" style="width:171px;height:96px;background:url('+imgSrc+') center 30% no-repeat; background-size:cover;" onclick="SRV.goPage(\''+linkUrl+'\')"></div>';						
						html +="</a></div>";
					}else{
						html +="<div class='thumb'><a href='"+linkUrl+"'>";
						html +=   '<div class="news_photo__  img_box" style="width:171px;height:96px;background:url('+imgSrc+') center 30% no-repeat; background-size:cover;" title="'+obj.title+'" onclick="SRV.goPage(\''+linkUrl+'\')"></div>';
						html +="</a></div>";
					}
                }

                html +="<dl>";
                //if(!ObjectUtils.isEmpty(obj.highlightTitle)){
                //    html += '<dt><a href="'+linkUrl+'"><em></em><span>'+obj.highlightTitle+'</span></a></dt>';
                //}else{
					html += '<dt><a href="'+linkUrl+'"><em></em>'+obj.title+'</a></dt>';
                //}
                //if(!ObjectUtils.isEmpty(obj.highlightSummary)){
                //    html += '<dd class="text">'+obj.highlightSummary+'</dd>';
                //}else{
					html += '<dd class="text">'+obj.summary+'</dd>';
                //}


                html += '<dd class="catg_date">';
        				html += '	<a href="'+linkUrl+'">';
        				html += '		<ul class="catg">';
        				html += '			<li>'+obj.category[0].sectionPath+' </li>';
        				html += '		</ul>';
        				html += '		<span class="date">'+ relDate+'</span>';
        				html += '	</a>';
        				html += '</dd>';

                html +="</dl></li>";

				/*
				html +="<div class='col-12'>";
                html +=   "<a href='"+linkUrl+"'>";
                if(idx== 0){
                    html +="<div class='media list-media-form pt20'>";
                }else{
                    html +="<div class='media list-media-form pt20 lineT'>";
                }


                if(!ObjectUtils.isEmpty(obj.imgSrc)){
					if(imgSrc.indexOf('/0540/') > -1){
						imgSrc = data.contentsUrl + obj.imgSrc;
					}else if(imgSrc.indexOf('/exposure/') > -1){
						imgSrc = data.contentsUrl + obj.imgSrc;
					}else{
						imgSrc = data.contentsUrl + obj.imgSrc.substring(0,26) + ".cache/128/" + obj.imgSrc.substring(26);
					}

                    html +="<div class='list-imgBox'>";
                    html +=   '<img src="'+imgSrc+'" onerror="this.src=\'http://s3.ap-northeast-2.amazonaws.com/dev.metromedia/data1/resources/pc/images/etc/noImg_list_blank.png\'" onclick="SRV.goPage(\''+linkUrl+'\')">';
                    html +="</div>";
                }

                html +="<div class='media-body ml15 media-form-set01'>";
                if(!ObjectUtils.isEmpty(obj.highlightTitle)){
                    html += '<h5 class="" onclick="SRV.goPage(\''+linkUrl+'\')">'+obj.highlightTitle+'</h5>';
                }else{
                    html += '<h5 class="" onclick="SRV.goPage(\''+linkUrl+'\')">'+obj.title+'</h5>';
                }
                if(!ObjectUtils.isEmpty(obj.highlightSummary)){
                    html += '<p onclick="SRV.goPage(\''+linkUrl+'\')">'+obj.highlightSummary+'</p>';
                }else{
                    html += '<p onclick="SRV.goPage(\''+linkUrl+'\')">'+obj.summary+'</p>';
                }
                html += '<span>'+writerName+ ' 기자</span><span>'+ relDate+'</sapn>';


                html +="</div></div></a></div>";
				*/
            });
			html +="</ul>";
        }
        $("#article_list").html(html);
    if(bannerArea){
$.ajax({
type : "GET",
url : "/wps/engine/rest/bannerArea",
dataType:"json",
async: false,
data:{
"groupSeq" : '29',
"mediaSeq" : '1'
},
success: function (data) {

let html = "";
html += "<div class='section_D banner_con'>";
  html += "<div id='S003E9277' style='width:875px; height:129px;' class='cycle-slideshow' data-cycle-fx='scrollVert' data-cycle-slides='> div' data-cycle-timeout='5000'>";
    $.each(data, function (i, item) {

      html += "<div id='"+item.advertisingSeq+"'><div style='float:left;'>";
      html += "<a href='"+item.advertisingLinkUrl+"' target='_blank'>";

      if(item.appointHeight == '' || item.appointHeight == 'null'){
        html += "<img src='"+item.advertisingImgUrl+"' width='"+item.advertisingWidth+"' height='"+item.advertisingHeight+"'>";
      }else{
        html += "<img src='"+item.advertisingImgUrl+"' width='"+item.appointWidth+"' height='"+item.appointHeight+"'>";
      }
      html += "</a></div></div>";

    });

  html +="</div></div>";

$("#left_list_ad_1").append(html);

$("#S003E9277").cycle({
  fx:'scrollVert',
  timeout:5000
  });
}
});
      // 배너call
	  /*
      $.ajax({
        type : "GET",
        url : "/wps/engine/rest/bannerArea",
        dataType:"text",
        async: false,
        data:{
        "bannerName" : '_50',
        "mediaSeq" : '1'
        },
        success: function (data) {
          $("#left_list_ad_1").empty();
        $("#left_list_ad_1").html(data);
        $(".cycle-slideshow").cycle({
          fx:'scrollVert',
          timeout:5000
          });
        },error:function(error){console.log(error);}

      });
	  */
    }

    },

    renderPaging : function (data,sort){
        var html = "";
        var currentPage = data.pages.number+1;
        var size = data.size;
        var totalCount = data.totalElements;
        var lastPage = data.pages.totalPages;
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var pagePerBlock = 10;

        //모바일 시 페이징 처리
		/*
        if(ObjectUtils.deviceChk()){
            pagePerBlock = 5 ;
        }*/
        var pageGroup = Math.ceil(currentPage/pagePerBlock);
        var last = pageGroup * pagePerBlock;
        var start = (pageGroup -1)*pagePerBlock+1;



        html += '<ul class="pagination-list">'
        if(currentPage > 1){
            if(pagePerBlock == 10){
                html += '<li class="arrow-list"> <a href="#" onclick=SEARCH.goSearch(1,\''+sort+'\');><img  src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/first_arrow_active.png" alt="처음으로"></a></li>';
            }

            html += '<li class="arrow-list mr10"> <a href="#" onclick=SEARCH.goSearch('+prePage+',\''+sort+'\');><img src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/prv_arrow_active.png" alt="이전으로"></a></li>';
        }else{
            if(pagePerBlock == 10){
                html += '<li class="arrow-list" style=""> <a href="#"><img src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/first_arrow.png" alt="처음으로"></a></li>';
            }
            html += '<li class="arrow-list mr10" style=""> <a href="#"><img src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/prv_arrow.png" alt="이전으로"></a></li>';
        }
        for(var i=start; i <= last; i++){
            if(i > lastPage) break;
            if(i == currentPage){
                html += '<li><a class="active" href="#">'+i+'</a></li>'
            }else{
                html += '<li><a href="#" onclick=SEARCH.goSearch('+i+',\''+sort+'\');>'+i+'</a></li>'
            }
        }

        if(currentPage < lastPage){
            html += '<li class="arrow-list ml10" style=""> <a href="#" onclick=SEARCH.goSearch('+nextPage+',\''+sort+'\');><img src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/next_arrow_active.png" alt="다음으로"></a></li>';
            if(pagePerBlock == 10){
                html += '<li class="arrow-list" style=""> <a href="#" onclick=SEARCH.goSearch('+lastPage+',\''+sort+'\');><img src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/end_arrow_active.png" alt="끝으로"></a></li>';
            }
        }else{
            html += '<li class="arrow-list ml10"> <a href="#"><img src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/next_arrow.png" alt="다음으로"></a></li>';
            if(pagePerBlock == 10){
                html += '<li class="arrow-list"> <a href="#"><img src="//cdn1.news2day.co.kr/data1/resources/pc/images/ico/end_arrow.png" alt="끝으로"></a></li>';
            }
        }
        html += '</ul>';
        $("#pagination").html(html);
    }

};


var MEMBER = {

    init : function (){
      var self = this;
      console.log("MEMBER");

      var pathName = location.pathname;
      if(pathName.indexOf('member/join') > -1){
          self.joinPage();
      }

    if(pathName.indexOf('member/login') > -1){
      self.saveIdLogin();
    }
      if(ObjectUtils.isNotEmpty($("#hiddenNumber").val())){
        self.numberSetting();
      }

      self.eventBind();

    },
    joinPage : function (){
  		var chkStatus = $("#chkStatus").val();
  		if(chkStatus == "FAIL"){
  			alert("회원가입동의후 가입이 가능합니다.");
  			location.href="/member/agree";
  		}

        var name = ObjectUtils.getParameterByName('name');
        var email = ObjectUtils.getParameterByName('email');

        $("input[name='memberName']").val(name);
        $("input[name='memberEmail']").val(email);
    },

    numberSetting : function () {
      var str = $("#hiddenNumber").val().split('-');
      $(".selPhone").val(str[0]).prop("selected", true);
      $("#numberOne").val(str[1]);
      $("#numberTwo").val(str[2]);
    },

    saveIdLogin : function () {
      var self = this;
        var userInputId = self.getCookieLogin("userInputId");//저장된 쿠기값 가져오기
        $("input[name='j_username']").val(userInputId);

        if($("input[name='j_username']").val() != ""){
            $("#idSaveCheck").attr("checked", true);
          }
    },

    setCookieLogin : function(cookieName, value, exdays){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
        document.cookie = cookieName + "=" + cookieValue;
    },

    deleteCookieLogin : function(cookieName){
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() - 1);
      document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
    },

    getCookieLogin : function(cookieName) {
      cookieName = cookieName + '=';
      var cookieData = document.cookie;
      var start = cookieData.indexOf(cookieName);
      var cookieValue = '';
      if(start != -1){
          start += cookieName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          cookieValue = cookieData.substring(start, end);
      }
      return unescape(cookieValue);
  },

    eventBind : function () {

var self = this;
      $("#idSaveCheck").on("change",function(){ // 체크박스에 변화가 발생시
              if($("#idSaveCheck").is(":checked")){ // ID 저장하기 체크했을 때,
                  var userInputId = $("input[name='j_username']").val();
                  self.setCookieLogin("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
              }else{ // ID 저장하기 체크 해제 시,
                  self.deleteCookieLogin("userInputId");
              }
          });

        $("input[name='j_username']").on("keyup",function(){ // ID 입력 칸에 ID를 입력할 때,
            if($("#idSaveCheck").is(":checked")){ // ID 저장하기를 체크한 상태라면,
              var userInputId = $("input[name='j_username']").val();
              self.setCookieLogin("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
        }
    });


        // id찾기
        $("#btn_findId").on("click", function(){

            if(ObjectUtils.isEmpty($("#id_prime_name").val()) || ObjectUtils.isEmpty($("#id_prime_email").val()) ){
                alert("아이디 또는 이메일을 입력하세요");
                return false;
            }else{

                //email validation
                var email = $("#id_prime_email").val();
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }else{
                    $.ajax({

                        url: "/rest/findId",
                        type: "GET",
                        contentType: "application/json",
                        dataType:"JSON",
                        data: {
                            memberName : $("#id_prime_name").val(),
                            memberEmail :$("#id_prime_email").val()
                        },
                        success: function(data){

                            if(data.message == "SUCCESS"){
                                alert("회원님의 ID는 "+data.id+" 입니다.");
                            }else{
                                alert("일치하는 회원 정보가 없습니다.");
                            }
                        },
                        error: function (error){
                            console.log(error);
                        }

                    });

                }
            }
        });

        // pw 찾기
        $("#btn_findPw").on("click", function(){
            if(ObjectUtils.isEmpty($("#pw_prime_id").val()) || ObjectUtils.isEmpty($("#pw_prime_name").val()) || ObjectUtils.isEmpty($("#pw_prime_email").val()) ){
                alert("회원 정보를 입력하세요.");
                return false;
            }else{
                //email validation
                var email = $("#pw_prime_email").val();
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }else{

                    var obj = {
                        memberId : $("#pw_prime_id").val(),
                        memberName : $("#pw_prime_name").val(),
                        memberEmail :$("#pw_prime_email").val()
                    };

                    $.ajax({

                        url: "/rest/findPassword",
                        type: "POST",
                        contentType: "application/json",
                        dataType:"JSON",
                        data: JSON.stringify(obj),
                        beforeSend:function(){
                            var html = "<div id='notify' style='margin-top:1px;'><span style='color:red; font-weight:bold;'>잠시만 기다려주세요.</span></div>";
                            $("#btn_findPw").before(html);
                        },
                        success: function(data){

                            $('#notify').remove();
                            if(data.message == "SUCCESS"){
                                alert("입력하신 이메일로 임시 비밀번호를 발송하였습니다.");
                            }else{
                                alert("일치하는 회원 정보가 없습니다.");
                            }

                        },
                        error: function (error){
                            console.log(error);
                        }

                    });
                }
            }

        });

        //회원가입 동의 페이지
        $("#user-create-apply").on("click", function(){

            var chk1 = document.getElementById("wr_agreement").checked;
			var chk2 = document.getElementById("wr_privacy").checked;

            if(!chk1){
                alert("이용약관에 동의해주시기 바랍니다.");
                $('#wr_agreement').focus();
                return false;
            }

            if(!chk2){
                alert("개인정보 수집 및 이용에 동의해주시기 바랍니다.");
                $('#wr_privacy').focus();
                return false;
            }

			/*
            if(ObjectUtils.isEmpty(name)){
                alert("이름을 입력하세요.");
                $('#name').focus();
                return false;
            }

            if(ObjectUtils.isEmpty(email)){
                alert("이메일을 입력하세요.");
                $('#email').focus();
                return false;
            }else{
                var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }
            }
*/
			var url = "/member/join";
			var form = document.createElement("form");
			form.setAttribute("action", url);
			form.setAttribute("method", "post");

			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "chk");
			field.setAttribute("value", chk1);
			form.appendChild(field);


			document.body.appendChild(form);
			form.submit();

        });



        //회원정보 변경
        $("#memberUpdate").on("click", function(){
            var obj = {};


            // Password Checked(자릿수)
            if ($('#passwd1').val().length < 4){
                alert("사용 규칙 안내:\n\n패스워드는 최소 4자리 이상  입력하세요.");   return false;
            }

            // Password Checked(입력형식)
            if ($('#passwd1').val().match(/(#|--|=|\')/) ){
                alert("패스워드 사용 규칙 안내:\n\n패스워드에 [#,--,=,']은 포함시킬수 없습니다.");   return false;
            }

            // Password Checked(비교)
            if ($('#passwd1').val() != $('#passwd2').val()){
                alert("패스워드 사용 규칙 안내:\n\n재입력 패스워드가 일치하지 않습니다. 다시 입력하세요.");   return false;
            }

            /*
            // NickName Checked
            if ($('#uniq_nicname').val() == "" || $('#uniq_nicname').val() != $("input[name='memberNickname']").val()){

                alert("사용 규칙 안내:\n\n닉네임 중복 검사를 먼저 하십시오.");   return false;
            }
            */

            // Email Checked
            if ($('#memberEmail').val() == "" || $('#memberEmail').val().match(/(@)/) == null){
                alert("사용하고 계시는 이메일 주소를 정확히 입력해 주십시오.");   return false;

            }
            //phoneNumber
            var phoneNumber = $(".phoneNumber");
            if(phoneNumber.length > 1){
                if(ObjectUtils.isEmpty($(".phoneNumber").eq(0).val()) || ObjectUtils.isEmpty($(".phoneNumber").eq(1).val())){
                    alert("휴대전화 번호를 입력하세요.");
                    return false;
                }else{
                    obj["memberNumber"] = $(".selPhone option:selected").val()+"-"+phoneNumber[0].value +"-"+ phoneNumber[1].value;
                }

            }

            var chk = document.getElementById("promotion_chk").checked;
            /*
            if(!chk){
                alert("약관에 동의 해주시기 바랍니다.");
                $('#promotion_chk').focus();
                return false;
            }
            */

            var arr = $("#form_memberUpdate").serializeArray();

            if(arr){
                obj = {};
                jQuery.each(arr, function() {

                    obj[this.name] = this.value;
                });
            }

            obj["receiveEmailYn"] = (chk? "Y":"N");
            obj["memberNumber"] = $(".selPhone option:selected").val()+"-"+phoneNumber[0].value +"-"+ phoneNumber[1].value;
            obj["memberEmail"] = $("#memberEmail").val();


            $.ajax({

                url: "/rest/updateUser",
                type: "POST",
                contentType: "application/json",
                dataType:"JSON",
                data: JSON.stringify(obj),
                success: function(data){

                    if(data.message == "SUCCESS"){
                        alert("회원정보가 변경 되었습니다. 다시 로그인해주세요.");
                        SRV.goPage('/j_spring_security_logout', '_self');
                        //location.href= "/member/login";
                    }else{
                        alert("다시 시도해주세요.");
                    }
                    //pw inputbox reset
                    $(".memberPassword").val('');
                },
                error: function (error){
                    console.log(error);
                }
            });

        });


        //idChk
        $(".idChk").on("click", function(){


            var memberId = $("input[name='memberId']").val();
            if(!(ObjectUtils.isEmpty(memberId))){


                var obj = {"memberId" : memberId};

                if (memberId.length < 4 || memberId.length > 10){
                    alert("사용 규칙 안내:\n\n회원 아이디란에 4자리 이상, 10자리 미만으로 입력해 주십시오.");
                    $("input[name='memberId']").focus();
                    return false;
                }

                if(!memberId.match(/^[a-zA-Z0-9]+$/)){
                    alert("사용 규칙 안내:\n\n영문자, 숫자 외에 다른 문자가 포함되었습니다.\n영문자, 숫자만 입력이 가능합니다.");
                    $("input[name='memberId']").focus();
                    return false;
                }


                $.ajax({

                    url: "/rest/idChk",
                    type: "POST",
                    contentType: "application/json",
                    dataType:"JSON",
                    data: JSON.stringify(obj),
                    success: function(data){

                        if(data == 0){

                            $("#notify_id").html("<font color='#0073AA'>사용가능하신 아이디입니다.</font>");
                            $("#uniq_id").val(memberId);

                        }else{

                            $("#notify_id").html("<font color='#B73535'>이미 사용중입니다 다시 입력하세요.</font>");
                            $("input[name='memberId']").val('');

                        }

                    },
                    error: function (error){
                        console.log(error);
                    }
                });

            }else{
                alert("아이디를 입력해주세요.");
                $("input[name='memberId']").focus();
                return false;
            }


        });

        //nickChk
        /*
        $("#nickChK").on("click", function(){



            var memberNickname = $("input[name='memberNickname']").val();
            var obj = {"memberNickname" : memberNickname};


            if(memberNickname == $("#uniq_nicname").val() ){
                $("#notify_nick").html("<font color='#0073AA'>기존 닉네임 사용 가능합니다.</font>");
                if(window.location.href.indexOf('sign') > -1){
                    $("#uniq_nicname").val(memberNickname);
                }

                return false;
            }


            if (memberNickname.length < 3 || memberNickname.length > 10){
                alert("사용 규칙 안내:\n\n회원 닉네임란에 3자리 이상, 10자리 미만으로 입력해 주십시오.");
                $("input[name='memberNickname']").focus();
                return false;
            }

            if (!memberNickname.match(/^[가-힣a-zA-Z0-9_-]+$/)){
                alert("사용 규칙 안내:\n\n한글, 영문자, 숫자, _, - 외에 다른 문자가 포함되었습니다.\n한글, 영문자, 숫자, _, - 만 입력이 가능합니다.");
                $("input[name='memberNickname']").focus();
                return false;
            }


            $.ajax({

                url: "/rest/nickChk",
                type: "POST",
                contentType: "application/json",
                dataType:"JSON",
                data: JSON.stringify(obj),
                success: function(data){

                    if(data == 0){
                        $("#notify_nick").html("<font color='#0073AA'>사용가능하신 닉네임입니다.</font>");
                        $("#uniq_nicname").val(memberNickname);

                    }else{

                        $("#notify_nick").html("<font color='#B73535'>이미 사용중입니다 다시 입력하세요.</font>");
                        $("input[name='memberNickname']").val('');
                    }


                },
                error: function (error){
                    console.log(error);
                }
            });

        });
        */

        //회원가입
        $("#memberSign").on("click", function(){
             var obj = {};
            // Id Checked
            if ($('#uniq_id').val() == "" || $('#uniq_id').val() != $("input[name='memberId']").val()){
                alert("사용 규칙 안내:\n\n회원아이디 중복 검사를 먼저 하십시오.");   return false;
            }


            // Password Checked(자릿수)
            if ($('#passwd1').val().length < 4){
                alert("사용 규칙 안내:\n\n패스워드는 최소 4자리 이상  입력하세요.");   return false;
            }

            // Password Checked(입력형식)
            if ($('#passwd1').val().match(/(#|--|=|\')/) ){
                alert("패스워드 사용 규칙 안내:\n\n패스워드에 [#,--,=,']은 포함시킬수 없습니다.");   return false;
            }

            // Password Checked(비교)
            if ($('#passwd1').val() != $('#passwd2').val()){
                alert("패스워드 사용 규칙 안내:\n\n재입력 패스워드가 일치하지 않습니다. 다시 입력하세요.");   return false;
            }

            // NickName Checked
            /*
            if ($('#uniq_nicname').val() == "" || $('#uniq_nicname').val() != $("input[name='memberNickname']").val()){
                alert("사용 규칙 안내:\n\n닉네임 중복 검사를 먼저 하십시오.");   return false;
            }
            */

            if(ObjectUtils.isEmpty($("input[name='memberName']").val())){
                $("input[name='memberName']").focus();
                alert("회원 이름을 입력하세요.");   return false;

            }

            // Email Checked
            if ($('#memberEmail').val() == "" || $('#memberEmail').val().match(/(@)/) == null){
                alert("사용하고 계시는 이메일 주소를 정확히 입력해 주십시오.");   return false;

            }

            //phoneNumber
            var phoneNumber = $(".phoneNumber");
            if(phoneNumber.length > 1){
                if(ObjectUtils.isEmpty($(".phoneNumber").eq(0).val()) || ObjectUtils.isEmpty($(".phoneNumber").eq(1).val())){
                    alert("휴대전화 번호를 입력하세요.");
                    return false;
                }

            }

            var chk = document.getElementById("promotion_chk").checked;
            /*
            if(!chk){
                alert("약관에 동의 해주시기 바랍니다.");
                $('#promotion_chk').focus();
                return false;
            }
            */

            var arr = $("#form_memberSign").serializeArray();

            if(arr){
                obj = {};

                jQuery.each(arr, function(index,item) {
                  obj[this.name] = this.value;
                });
            }
            obj["receiveEmailYn"] = (chk? "Y":"N");
            obj["memberNumber"] = $(".selPhone option:selected").val()+"-"+phoneNumber[0].value +"-"+ phoneNumber[1].value;

            $.ajax({

                url: "/rest/createUser",
                type: "POST",
                contentType: "application/json",
                dataType:"JSON",
                data: JSON.stringify(obj),
                success: function(data){

                    if(data.message == "SUCCESS"){
                        alert("회원가입이 완료 되었습니다.");
                        location.href ="/member/login";
                    }else{
                        alert("다시 시도해주세요.");
                        location.href ="/signup";
                    }

                },
                error: function (error){
                    console.log(error);
                }
            });
        });


        //회원탈퇴
        $("#memberLeave").on("click", function(){

            var flag = confirm("정말 탈퇴하시겠습니까?");
            if(flag){

                var obj ={};

                $.ajax({

                    url: "/rest/deleteUser",
                    type: "PUT",
                    contentType: "application/json",
                    dataType:"JSON",
                    data:JSON.stringify(obj),
                    success: function(data){

                        if(data == 1 ){
                            alert("회원탈퇴가 완료되었습니다.");
                            location.href="/" ;
                        }else{
                            alert("다시 시도해주세요.");
                        }
                    },
                    error: function (error){
                        console.log(error);
                    }
                });

            }

        });

    }


};


var EVENT = {
  init : function(){
    var self = this ;
    self.eventBind();
  },
  eventBind : function(){
    var self = this ;
    $(".forum-tab-container ul li").click(function(){
        $(".forum-tab-container ul li").removeClass('active');
        $(this).addClass('active');
        var tabId = $(this).data('tab');
        $("div[id^=tab]").css({"display":"none"});
        $("#"+tabId).css({"display":"block"});

    });

    $("#relSelect").on("change",function(){
        var seq = Number($("#relSelect :selected").val());
        //관련지난칼럼 제외
        if(seq > 0 ){
            SRV.goPage("/eventDetail?seq="+seq,'_self');
        }

    });

    $("#event_regist").click(function(){
          var seq = ObjectUtils.getParameterByName('seq');
          console.log("seq :::"+  seq);
          if((ObjectUtils.isEmpty(seq))){
              alert("잘못된 접근입니다.");
              return false;
          }else{
              $("input[name='seq']").val(seq);
              console.log($("input[name='seq']").val());
          }
          var depart = $("input[name='txt_depart']").val();
          var position = $("input[name='txt_position']").val();
          var name = $("input[name='txt_name']").val();
          var phone = $("input[name='txt_phone']").val();
          var email = $("input[name='txt_email']").val();

          if((ObjectUtils.isEmpty(depart))){
              alert("회사(학교)명 을 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(position))){
              alert("직책을 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(name))){
              alert("직책을 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(phone))){
              alert("연락처를 입력하세요.");
              return false;
          }
          if((ObjectUtils.isEmpty(email))){
              alert("이메일을 입력하세요.");
              return false;
          }else{
              var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                if (!regExp.test(email)) {
                    alert("이메일 형식이 맞지 않습니다.");
                    return false;
                }
          }




          var obj = {};
          var arr = $("#event_member_regist").serializeArray();
          console.log(obj);
            if(arr){
                obj = {};
                jQuery.each(arr, function(index,item) {
                    obj[this.name] = this.value;
                });
            }
          $.ajax({
                    url: "/rest/eventRegist",
                    type: "POST",
                    contentType: "application/json",
                    dataType:"JSON",
                    data: JSON.stringify(obj),
                    success: function(data){
                        console.log(data);
                        if(data.message == 'SUCCESS' ){
                            alert("사전등록 되었습니다.");
                            //location.href="/" ;
                        }else{
                            alert("다시 시도해주세요.");
                            location.href="/" ;
                        }
                    },
                    error: function (error){
                        console.log(error);
                    }
                });
    });


  }
};

var PHOTO = {

    init: function () {
        var self = this;
        self.active();
        self.eventBind();

    },
    active : function(){

      var self = this ;
      var type = ObjectUtils.getParameterByName('type');

      $(".photo-tab-container .photo_tab").removeClass('active');
      if(ObjectUtils.isEmpty(type)){
            $(".photo-tab-container .all").addClass('active');
      }else{
          $(".photo-tab-container ."+type).addClass('active');
      }

    },
    eventBind : function(){
        // pho
        var self = this;
        var type = ObjectUtils.getParameterByName('type');

        var page = 2;
        $("#more_photo").click(function(){
            $.ajax({
                    url: "/rest/photo",
                    type: "GET",
                    contentType: "application/json",
                    dataType:"JSON",
                    data:{
                        "type" : type,
                        "page" : page,
                        "size":"20"
                     },
                    success: function(data){
                        var row = 0 ;
                        console.log(data);
                        page++;


                        if(data.length > 0 ){
                            var html ="";
                            for(var i=0; i < data.length; i++ ){
                                if(((i%4) == 0)){
                                    html += "<div class='row mb25'>" ;
                                }
                                html +="<div class='col-lg-3 col-6'>" ;
                                html +=  "<a href='/article/"+data[i].id+"'>";
                                html +=    "<div class='photo_news_imgBox'>" ;
                                if(!ObjectUtils.isEmpty(data[i].imgSrc)){
                                    html +=      "<img src='"+data[i].contentsUrl+data[i].imgSrc+"' alt='포토뉴스 이미지'>" ;
                                }
                                    html +=          "<div class='photonews_title_bar'>";
                                if(!ObjectUtils.isEmpty(data[i].viewTitle)){
                                    html +=             "<p>"+data[i].viewTitle+"</p>";
                                }else{
                                    html +=             "<p>"+data[i].title+"</p>";
                                }

                                html +=            "</div>";
                                html +=     "</div>";
                                html +=  "</a>";
                                html +="</div>";
                                if( (i == (data.length-1)) || i ==((row * 4)+3) ){
                                        row++;
                                        console.log("row ::"+ row);
                                        html +="</div>";
                                }
                            }
                            if(!(ObjectUtils.isEmpty(html))){
                                $("#photoList_area").append(html);
                            }

                        }else{
                            alert("더 이상 기사가 없습니다.");
                        }

                    },
                    error: function (error){
                        console.log(error);
                    }
          });
        });
    }

};


var servicePopup = {

     /*코드성 데이터 */
    limitEnum: {
        D : {name: "하루동안"},
        W : {name: "일주일동안"},
        N : {name: "다시"}
    },

    init: function () {
        var self = this;

        var pageSeq = $('body').data("pageSeq");
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();

        var today = year + "-" + month + "-" + day;

        self.selectLimitPopupList(today, pageSeq,self);

    },


    popupClose : function (name, cookieValue, day) {
        var self = this;

        self.setCookie(name, cookieValue, day);

    },

    layerPopupClose : function (id) {
        $('#'+id).attr("style", "display:none;");

    },

    setCookie : function (name,value,day) { // 쿠키이름, 쿠키값, 쿠키삭제되는 날짜 (쿠키가 없으면 팝업
        // 보여주고, 있으면 안보여주고) value가 false일때도 안보여줌

      /*  var today = new Date();
        today.setDate(today.getDate() + day);
        var expireDate = today.toGMTString();

var aa = name+'='+escape(value)+';expires=' + expireDate + ';';
console.log(aa);
        document.cookie=name+'='+escape(value)+';expires=' + expireDate + ';'; */
        var date = new Date();
        date.setTime(date.getTime() + (day*24*60*60*1000));
        document.cookie=escape(name)+'='+escape(value)+';expires=' + date.toUTCString() + ';';
    },

    getCookie : function (name) {

        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        var result =  value? value[2] : null;

        return result;

    },

    deleteCookie : function (name) {

        var date = new Date();
        date.setDate(date.getDate() -1);
        var expiresDate = date.toUTCString();

        document.cookie=name+'=true; expires='+expiresDate+';';

    },

    selectLimitPopupList : function (today, pageSeq,self) {

        var self = this;
        var searchData = {
            nowDate : today,
            pageSeq : pageSeq
        };

        $.ajax({
            type : "GET",
            data : searchData,
            url : "/rest/popup",
            success: function (data) {
                console.log(data);
                self.popupOpen(data);
            }
        });
    },

    popupOpen : function (data) {

        var self = this;


        $.each(data, function (i, item) {
            var target ='';

            var expireDate = 0;
            var setValue = true;
            var cookieName = 'cookieName'+item.popupSeq;
            var cookieStatus = servicePopup.getCookie(cookieName);

            (item.popupLinkOption == 'N'? target = '_blank':'');

            if(item.popupLimitSetting == 'N'){
                setValue = false;
                expireDate = 10000;
            }else if(item.popupLimitSetting == 'W'){
                expireDate = 7;
            }else if(item.popupLimitSetting == 'D'){
                expireDate = 1;
            }

            if(ObjectUtils.isNotEmpty(cookieStatus)){
                if(cookieStatus == 'false'){
                    //다시보지않는 팝업
                }
            }else{
            	var winWidth = document.body.clientWidth;	// 현재창의 너비

                // 팝업 위치지정
                var popupX = (window.screen.width / 2) - (200 / 2);
                var popupY = (window.screen.height / 2) - 300;

                /*
                var containerEl = $(".contents01");
                var containerX = containerEl.offset().left;
                var containerY = containerEl.offset().top;

                var topNewsContainerEl = $(".hd_container");
                var topNewsContainerX = topNewsContainerEl.offset().left;
                var topNewsContainerY = topNewsContainerEl.offset().top;


                if(item.popupLocation == 'L'){     // 왼쪽
                    if(winWidth >= 768){
                        popupX = 0 + containerX - item.popupWidth - 5;
                    }else{
                        popupX = topNewsContainerX;
                        popupY = topNewsContainerY + 60;
                    }
                }else if(item.popupLocation == 'R'){// 오른쪽
                    popupX=winWidth - (item.popupWidth+20);
                }
                */
                if(item.popupLocation == 'L'){     // 왼쪽
                    popupX=0;
                }else if(item.popupLocation == 'R'){// 오른쪽
                    popupX=winWidth;
                }
                // 2020.03.16 myahn
                // 팝업 타입 추가(레이어 팝업:L, 윈도우팝업:W)
                if(item.popupType == "L") {

                	var layerId = "layerPopup_" + item.popupSeq;
                    var layerDiv = document.createElement("div");
                    var layerInnerHTML = "";

                    document.body.appendChild(layerDiv);

                    layerDiv.id = layerId;
                    layerDiv.setAttribute("class","modal-content");
                    layerDiv.style.position = "absolute";
                    layerDiv.style.display = "none";
                    layerDiv.style.top = popupY + 'px';
                    layerDiv.style.left = popupX + 'px';
                    layerDiv.style.width = item.popupWidth+20 + 'px';
                    layerDiv.style.height = "auto";
                    layerDiv.style.backgroundColor = "#fff";
                    layerDiv.style.zIndex = 1000;

                    /* 2020.03.20 myahn
                     * 헤더 부분 삭제
                    layerInnerHTML += ' <div class="modal-header pop_header_style">';
                    layerInnerHTML += ' 	<h5 class="modal-title bol" id="exampleModalScrollableTitle">' + item.popupName + '</h5>';
                    layerInnerHTML += ' 	<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="servicePopup.layerPopupClose(\''+layerId+'\');">';
                    layerInnerHTML += '     	<span aria-hidden="true">×</span>';
                    layerInnerHTML += ' 	</button>';
                    layerInnerHTML += ' </div>';
                    */

                    layerInnerHTML += '	<div class="modal-body" style="padding:0px;">';
                    layerInnerHTML += '		<div class="pop-container">';

                    if(item.popupKinds == 'I') {

                        layerInnerHTML += '			<div class="pop-ad-container" style="padding:10px;">';
                        if(ObjectUtils.isNotEmpty(item.popupLinkUrl)){
                        	layerInnerHTML += '			<a href="'+item.popupLinkUrl+'" target="'+target+'"><img src="http:'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'"></a>';
                        }else{
                        	layerInnerHTML += '			<img src="http:'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'">';
                        }
                        layerInnerHTML += '			</div>';
                    }
                    else {
                        layerInnerHTML += '			<div class="pop-ad-container" style="padding:10px;height:' + (item.popupHeight-100) + ';">';
                    	layerInnerHTML +=          		item.popupBody;
                        layerInnerHTML += '			</div>';
                    }
                    layerInnerHTML += '			<div class="ad-under-opt" style="height:35px;border-top:1px #d7d7d7 solid;">';
                    layerInnerHTML += '				<div class="form-check-inline pl15" style="margin-top:5px;margin-botton:5px;">';
                    layerInnerHTML += '					<input onclick="servicePopup.popupClose(\''+cookieName+'\',\''+setValue+'\',\''+expireDate+'\'); servicePopup.layerPopupClose(\''+layerId+'\');" name="'+item.popupSeq+'popup_limit_value"  type="checkbox" class="form-check-input">';
                    layerInnerHTML += '         		<label type="checkbox"class="form-check-label">'+self.limitEnum[item.popupLimitSetting].name+' 보지 않기</label>';
                    layerInnerHTML += '     		</div>';
                    layerInnerHTML += '     		<button type="button" class="btn btn-info" onclick="servicePopup.layerPopupClose(\'' + layerId + '\');">닫기</button>';
                    layerInnerHTML += '			</div>';
                    layerInnerHTML += '		</div>';
                    layerInnerHTML += '	</div>';

                    layerDiv.innerHTML = layerInnerHTML;
                    layerDiv.style.display  = "block";

                    $('#'+layerId).draggable({'cancel':'.ad-under-opt'});
                }
                else {
                    var option = "width="+ (item.popupWidth) + ", height="+ (item.popupHeight+60) + ", left="+ popupX + ",  top="+ popupY + "";
                	var w = window.open("", "popupName"+item.popupSeq, option);
                    var $h = $(w.document.head);
                    var $w = $(w.document.body);
                    let windowPopup = "";
                    let windowHead = "";

                	windowHead += '<meta charset="utf-8">';
                    windowHead += '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">';

                    if(item.popupKinds == 'I'){

                        windowPopup += '<div class="pop-container">';
                        windowPopup += '    <div class="pop-ad-container">';

                        if(ObjectUtils.isNotEmpty(item.popupLinkUrl)){
                          windowPopup += '        <a href="'+item.popupLinkUrl+'" target="'+target+'"><img src="http://'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'"></a>';
                        }else{
                          windowPopup += '            <img src="http:'+item.popupImgUrl+'" style="width : '+item.popupWidth+'; height: '+item.popupHeight+'">';
                        }

                        windowPopup += '    </div>';
                        windowPopup += '    <div class="ad-under-opt">';
                        windowPopup += '        <div class="form-check-inline pl15" style="margin-top:20px;">';
                        windowPopup += '            <input onclick="opener.servicePopup.popupClose(\''+cookieName+'\',\''+setValue+'\',\''+expireDate+'\'); window.close();" id="values" name="'+item.popupSeq+'popup_limit_value" type="checkbox" class="form-check-input">';
                        windowPopup += '            <label type="checkbox"class="form-check-label">'+self.limitEnum[item.popupLimitSetting].name+' 보지 않기</label>';
                        windowPopup += '        </div>';
                        windowPopup += '    </div>';
                        windowPopup += '</div>';

                    }else{
                        windowPopup += '<div class="pop-container">';
                        windowPopup += '    <div class="pop-ad-container">';
                        windowPopup +=          item.popupBody;
                        windowPopup += '    </div>';
                        windowPopup += '    <div class="ad-under-opt">';
                        windowPopup += '        <div class="form-check-inline pl15" style="margin-top:20px;">';
                        windowPopup += '             <input onclick="opener.servicePopup.popupClose(\''+cookieName+'\',\''+setValue+'\',\''+expireDate+'\'); window.close();" name="'+item.popupSeq+'popup_limit_value"  type="checkbox" class="form-check-input">';
                        windowPopup += '             <label type="checkbox"class="form-check-label">'+self.limitEnum[item.popupLimitSetting].name+' 보지 않기</label>';
                        windowPopup += '        </div>';
                        windowPopup += '     </div>';
                        windowPopup += '</div>';
                    }

                    $h.html(windowHead);
                    $w.html(windowPopup);
                }
            }
        });

    },
};




//고객센터
var COMPANY = {
    init : function () {
        var self = this;
        self.menuActive();
    },
    //메뉴 ACTIVE
    menuActive : function () {
        var self = this;
        var pathName = location.pathname;
        var arr = /^\/company\/(.*?)$/.exec(pathName);
        $(".li_" + arr[1]).addClass("active");
    }
};

var ObjectUtils = {
    // 값의 유무 체크
    isEmpty : function(val) {
        var self = this;
        if (val === undefined) return true;
        if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
            return false;
        if (typeof (val) == 'object') {
            var flag = true;
            for (var f in val) {
                flag = false;
            }
            return flag;
        }
        if (null == val || null === val || "" == val || val == undefined || typeof(val) == undefined || "undefined" == val || "NaN" == val || "null" == val) {
            return true;
        } else {
            return false;
        }
    },

    // 값의 유무 체크
    isNotEmpty: function (val) {
        var self = this;
        return !this.isEmpty(val);
    },

    //숫자 인지 체크
    isNumeric : function(val) {
        var self = this;
        if (!/^[0-9]+$/.test(val)) {
            return false;
        } else {
            return true;
        }
    },

    //숫자가 포함 되어 있는지 체크
    isContainNumber : function(val) {
        var self = this;
        if(/[0-9]/.test(val)){
            return true;
        } else {
            return false;
        }
    },

    // URL or IP 형식 체크
    isDomain : function (val) {
        //TODO 체크 형식 나중에 풀어랏
        // var self = this;
        // if (/^((\*)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((\*\.)?([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/.test(val)) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    },

    //////////////////////// CONVERTER ///////////////////////

    //날짜를 문자로 변환
    dateToStr : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            console.error("date 값이 없습니다.");
            return "";
        }
        return moment.utc(date).format(config.datetimeFormat);
    },

    //날짜를 문자로 변환 (YYYY-MM-DD)
    dateToStrFormat : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            //console.error("date 값이 없습니다.");
            return "";
        }
        return moment.utc(date).format(config.dateFormat);
    },

    htmlEscape : function (str) {
        var self = this;
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        if (self.isEmpty(str)) {
            return str;
        }
        return String(str).replace(/[&<>"'`=\/]/g,
            function (s) { return entityMap[s]; });
    },

    //해당 문자열 모두 치환
    replaceAll : function (content, before, after) {
        return content.split(before).join(after);
    },
    //자리수 pad 0
    pad : function (n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },

    getParameterByName : function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    deviceChk : function (){
		/*
        var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
        for (var info in mobileKeyWords) {
            if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
                return true;

            }
        }*/
        return false;

    }

};

//리스트 페이지
var LIST = {
  menuEnum : {
    16 : {SA : 'JOB', DEPTH : 1}
    , 24 : {SA : '취준생' , PA : 'JOB', DEPTH : 2}
    , 279 : {SA : '신중년' , PA : 'JOB', DEPTH : 2}
    , 25 : {SA : '직장인' , PA : 'JOB', DEPTH : 2}
    , 26 : {SA : '창직/창업' , PA : 'JOB', DEPTH : 2}
    , 27 : {SA : '미래일자리' , PA : 'JOB', DEPTH : 2}
    , 28 : {SA : '일자리정책' , PA : 'JOB', DEPTH : 2}
    , 106 : {SA : '취준생(JOB속보)' , PA : 'JOB', DEPTH : 2}
	
    , 240 : {SA : 'ESG', DEPTH : 1}
    , 241 : {SA : '환경' , PA : 'ESG', DEPTH : 2}
    , 242 : {SA : '사회' , PA : 'ESG', DEPTH : 2}
    , 243 : {SA : '지배구조' , PA : 'ESG', DEPTH : 2}
    , 244 : {SA : '종합' , PA : 'ESG', DEPTH : 2}	
	
    , 17 : {SA : '금융·증권', DEPTH : 1}
    , 29 : {SA : '경제정책' , PA : '금융·증권', DEPTH : 2}
    , 30 : {SA : '금융' , PA : '금융·증권', DEPTH : 2}
    , 274 : {SA : '증권' , PA : '금융·증권', DEPTH : 2}
    , 31 : {SA : '글로벌경제' , PA : '금융·증권', DEPTH : 2}
    , 32 : {SA : '거꾸로 읽는 경제' , PA : '금융·증권', DEPTH : 2}
    , 33 : {SA : '기획' , PA : '금융·증권', DEPTH : 2}
    , 34 : {SA : '종합' , PA : '금융·증권', DEPTH : 2}
    , 107 : {SA : '금융/증권(버핏이라면)' , PA : '금융·증권', DEPTH : 2}
	
    , 18 : {SA : '비즈', DEPTH : 1}
    , 35 : {SA : '산업', PA : '비즈', DEPTH : 2}
    , 36 : {SA : '재계', PA : '비즈', DEPTH : 2}
    , 39 : {SA : '부동산', PA : '비즈', DEPTH : 2}
    , 40 : {SA : '기획', PA : '비즈', DEPTH : 2}
    , 41 : {SA : '종합', PA : '비즈', DEPTH : 2}

    , 262 : {SA : '과학/IT', DEPTH : 1}
    , 254 : {SA : 'IT' , PA : '과학/IT', DEPTH : 2}
    , 255 : {SA : '게임' , PA : '과학/IT', DEPTH : 2}
    , 256 : {SA : '모바일' , PA : '과학/IT', DEPTH : 2}
    , 257 : {SA : '통신/미디어' , PA : '과학/IT', DEPTH : 2}
    , 258 : {SA : '보안' , PA : '과학/IT', DEPTH : 2}
    , 259 : {SA : '컴퓨터' , PA : '과학/IT', DEPTH : 2}
    , 260 : {SA : '과학일반' , PA : '과학/IT', DEPTH : 2}
	
    , 42 : {SA : '생활·경제', DEPTH : 1}
    , 43 : {SA : '헬스/과학' , PA : '생활·경제', DEPTH : 2}
    , 44 : {SA : '패션/뷰티' , PA : '생활·경제', DEPTH : 2}
    , 45 : {SA : '여행/레저' , PA : '생활·경제', DEPTH : 2}
    , 46 : {SA : '음식/요리' , PA : '생활·경제', DEPTH : 2}
    , 37 : {SA : '식음료·유통' , PA : '생활·경제', DEPTH : 2}
    , 47 : {SA : '기획' , PA : '생활·경제', DEPTH : 2}
    , 48 : {SA : '종합' , PA : '생활·경제', DEPTH : 2}
	
    , 261 : {SA : '정치', DEPTH : 1}
    , 249 : {SA : '대통령실' , PA : '정치', DEPTH : 2}
    , 250 : {SA : '국회/정당' , PA : '정치', DEPTH : 2}
    , 251 : {SA : '북한' , PA : '정치', DEPTH : 2}
    , 263 : {SA : '행정' , PA : '정치', DEPTH : 2}
    , 252 : {SA : '국방/외교' , PA : '정치', DEPTH : 2}
    , 253 : {SA : '정치일반' , PA : '정치', DEPTH : 2}
	
    , 19 : {SA : '스페셜기획', DEPTH : 1}
    , 49 : {SA : '국내 직장분석' , PA : '스페셜기획', DEPTH : 2}
//    , 76 : {SA : 'ESG포럼' , PA : '스페셜기획', DEPTH : 2}
//    , 50 : {SA : '굿잡코리아포럼' , PA : '스페셜기획', DEPTH : 2}
    , 51 : {SA : '직업혁명' , PA : '스페셜기획', DEPTH : 2}
    , 53 : {SA : '글로벌기획' , PA : '스페셜기획', DEPTH : 2}
    , 278 : {SA : '민병두의 K-Sapience' , PA : '스페셜기획', DEPTH : 2}
    , 72 : {SA : '이태희의 JOB채' , PA : '스페셜기획', DEPTH : 2}
    , 73 : {SA : '민경철의 검사수첩' , PA : '스페셜기획', DEPTH : 2}
    , 74 : {SA : '올해의 10대 뉴스' , PA : '스페셜기획', DEPTH : 2}
    , 75 : {SA : '심층기획' , PA : '스페셜기획', DEPTH : 2}
	, 236 : {SA : '창간기획' , PA : '스페셜기획', DEPTH : 2}
	
    , 20 : {SA : '사람들', DEPTH : 1}
    , 54 : {SA : 'JOB인터뷰' , PA : '사람들', DEPTH : 2}
	, 237 : {SA : 'CEO인터뷰' , PA : '사람들', DEPTH : 2}
    , 55 : {SA : 'CEO리포트' , PA : '사람들', DEPTH : 2}
    , 56 : {SA : '인물탐구' , PA : '사람들', DEPTH : 2}
    , 57 : {SA : '뉴스 속 직업' , PA : '사람들', DEPTH : 2}
    , 58 : {SA : '인스타 스타' , PA : '사람들', DEPTH : 2}
    , 59 : {SA : '지난기획' , PA : '사람들', DEPTH : 2}
    , 60 : {SA : '인생 2막의 창업자들' , PA : '사람들', DEPTH : 2}
    , 61 : {SA : '인사/부고' , PA : '사람들', DEPTH : 2}
	
    , 21 : {SA : '이야기쉼터', DEPTH : 1}
    , 62 : {SA : '칼럼' , PA : '이야기쉼터', DEPTH : 2}
    , 63 : {SA : '기자의 눈' , PA : '이야기쉼터', DEPTH : 2}
	
    , 22 : {SA : '전국', DEPTH : 1}
	, 276 : {SA : '서울' , PA : '전국', DEPTH : 2}
    , 64 : {SA : '경기' , PA : '전국', DEPTH : 2}
    , 287 : {SA : '대구경북' , PA : '전국', DEPTH : 2}
	, 277 : {SA : '부울경' , PA : '전국', DEPTH : 2}
    , 65 : {SA : '대전' , PA : '전국', DEPTH : 2}
    , 66 : {SA : '세종' , PA : '전국', DEPTH : 2}
    , 238 : {SA : '공기업' , PA : '전국', DEPTH : 2}
	
    , 23 : {SA : '시큐리티팩트', DEPTH : 1}
    , 68 : {SA : '방위산업' , PA : '시큐리티팩트', DEPTH : 2}
    , 69 : {SA : '사이버안보' , PA : '시큐리티팩트', DEPTH : 2}
    , 275 : {SA : '해외안보' , PA : '시큐리티팩트', DEPTH : 2}
    , 70 : {SA : '소통시대' , PA : '시큐리티팩트', DEPTH : 2}
    , 71 : {SA : '종합' , PA : '시큐리티팩트', DEPTH : 2}
	
    , 78 : {SA : '뚝딱뉴스', DEPTH : 1}
	
    , 82 : {SA : '보도뉴스', DEPTH : 1}

    , 280: {SA : '인터뷰', PA : '신중년', QA : 'JOB', DEPTH : 3}
    , 281: {SA : '정부지원정책', PA : '신중년', QA : 'JOB', DEPTH : 3}
    , 282: {SA : '혁신일자리', PA : '신중년', QA : 'JOB', DEPTH : 3}
    , 283: {SA : '재취업일자리', PA : '신중년', QA : 'JOB', DEPTH : 3}
    , 284: {SA : '비정규직일자리', PA : '신중년', QA : 'JOB', DEPTH : 3}
    , 285: {SA : '공공일자리', PA : '신중년', QA : 'JOB', DEPTH : 3}    

    , 149: {SA : 'JOB속보', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 157: {SA : '취업도우미', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 148: {SA : 'Budget analysis', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 156: {SA : '청년', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 155: {SA : '중장년', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 152: {SA : '대기업족', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 150: {SA : '공시족', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 153: {SA : '일본을 뚫어라', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 151: {SA : '글로벌JOB', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 154: {SA : '종합', PA : '취준생', QA : 'JOB', DEPTH : 3}
	, 170: {SA : '박용인의 JOB카툰', PA : '취준생', QA : 'JOB', DEPTH : 3}
	, 169: {SA : '박시영의 뉴 잡툰', PA : '취준생', QA : 'JOB', DEPTH : 3}
    , 141: {SA : '직업이야기', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 134: {SA : 'JOB談', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 137: {SA : '대기업', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 140: {SA : '중소기업', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 135: {SA : '공기업', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 136: {SA : '금융업', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 138: {SA : '식품·유통', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 133: {SA : 'IT/게임', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 139: {SA : '종합', PA : '직장인', QA : 'JOB', DEPTH : 3}
    , 143: {SA : '스타트업', PA : '창직/창업', QA : 'JOB', DEPTH : 3}
    , 146: {SA : '창업도우미', PA : '창직/창업', QA : 'JOB', DEPTH : 3}
    , 147: {SA : '프렌차이즈', PA : '창직/창업', QA : 'JOB', DEPTH : 3}
    , 144: {SA : '자영업', PA : '창직/창업', QA : 'JOB', DEPTH : 3}
    , 142: {SA : '1인창업', PA : '창직/창업', QA : 'JOB', DEPTH : 3}
    , 145: {SA : '종합', PA : '창직/창업', QA : 'JOB', DEPTH : 3}
    , 124: {SA : '직업의 미래', PA : '미래일자리', QA : 'JOB', DEPTH : 3}
    , 123: {SA : 'CEO북클럽', PA : '미래일자리', QA : 'JOB', DEPTH : 3}
    , 130: {SA : '정부', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 127: {SA : '국회', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 129: {SA : '사회', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 132: {SA : '지자체', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 125: {SA : '軍', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 126: {SA : '교육', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 128: {SA : '미디어', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 131: {SA : '종합', PA : '일자리정책', QA : 'JOB', DEPTH : 3}
    , 120: {SA : '금융', PA : '금융증권', QA : '경제', DEPTH : 3}
    , 122: {SA : '증권', PA : '금융증권', QA : '경제', DEPTH : 3}
    , 121: {SA : '버핏이라면', PA : '금융증권', QA : '경제', DEPTH : 3}
    , 119: {SA : '가상화폐', PA : '금융증권', QA : '경제', DEPTH : 3}
    , 168: {SA : '자동차', PA : '산업', QA : '비즈', DEPTH : 3}
    , 167: {SA : '업계소식', PA : '산업', QA : '비즈', DEPTH : 3}
    , 166: {SA : '생활경제', PA : '산업', QA : '비즈', DEPTH : 3}
    , 165: {SA : '헬스클리닉', PA : '헬스/과학', QA : '생활·경제', DEPTH : 3}
    , 163: {SA : '스타일보고서', PA : '패션/뷰티', QA : '생활·경제', DEPTH : 3}
    , 164: {SA : '직장인 뷰티', PA : '패션/뷰티', QA : '생활·경제', DEPTH : 3}
    , 162: {SA : '캐리의 음식&도예', PA : '음식/요리', QA : '생활·경제', DEPTH : 3}
    , 161: {SA : '직장인 쿡', PA : '음식/요리', QA : '생활·경제', DEPTH : 3}
    , 160: {SA : '심층기획', PA : '기획', QA : '생활·경제', DEPTH : 3}
    , 159: {SA : '나는 솔로다', PA : '기획', QA : '생활·경제', DEPTH : 3}
    , 158: {SA : 'D씨의 정직한 체험담', PA : '기획', QA : '생활·경제', DEPTH : 3}
    , 173: {SA : '직장 돋보기 분석', PA : '국내 직장분석', QA : '스페셜기획', DEPTH : 3}
    , 172: {SA : '라이벌 직장분석', PA : '국내 직장분석', QA : '스페셜기획', DEPTH : 3}
    , 171: {SA : '기업별입사전략', PA : '국내 직장분석', QA : '스페셜기획', DEPTH : 3}
    , 177: {SA : '2016년', PA : '올해의 10대 뉴스', QA : '스페셜기획', DEPTH : 3}
    , 178: {SA : '2017년', PA : '올해의 10대 뉴스', QA : '스페셜기획', DEPTH : 3}
    , 179: {SA : '2018년', PA : '올해의 10대 뉴스', QA : '스페셜기획', DEPTH : 3}
    , 180: {SA : '2019년', PA : '올해의 10대 뉴스', QA : '스페셜기획', DEPTH : 3}
    , 174: {SA : '내부고발자', PA : '심층기획', QA : '스페셜기획', DEPTH : 3}
    , 175: {SA : '재계 뉴 리더2019년', PA : '심층기획', QA : '스페셜기획', DEPTH : 3}
    , 176: {SA : '청년이 살아야 나라가 산다', PA : '심층기획', QA : '스페셜기획', DEPTH : 3}
    , 196: {SA : '김희철의 직업군인이야기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 229: {SA : '최환종 나의 공군 이야기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 197: {SA : '데스크칼럼', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 224: {SA : '전문가 칼럼', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 223: {SA : '이태희의 심호흡', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 209: {SA : '신재훈의 광고썰전', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 219: {SA : '이상호의 고공비행', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 225: {SA : '차병희의 사장의조건2', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 213: {SA : '윤재은 공간철학', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 190: {SA : '개봉작 프리뷰 - 볼까? 말까?', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 203: {SA : '송대욱의 건강 쓰리잘', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 206: {SA : '수필가 윤혜영의 문화산책', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 210: {SA : '엄주원의 이유있는 디자인', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 221: {SA : '이윤희의 RUN 114', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 226: {SA : '청년 칼럼', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 195: {SA : '김희철 칼럼', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 231: {SA : '프리마돈나 최주희', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 230: {SA : '최환종의 스쿠버 다이빙', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 201: {SA : '석하스님의 카이스트 수행기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 227: {SA : '초현실주의 그림읽기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 211: {SA : '우사라의 마음으로 그림읽기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 217: {SA : '이나영의 Charm한 스토리', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 192: {SA : '고창신의 맞춤형 헬스', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 193: {SA : '권부원의 세상만사', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 204: {SA : '송진선 토탈 뷰티', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 199: {SA : '백연주의 영화 속 패션', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 202: {SA : '송대욱 체질개선', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 215: {SA : '이기명 뷰티일러스트', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 200: {SA : '서동순과 함께하는 종이접기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 207: {SA : '쉐프 민상호의 감성요리', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 220: {SA : '이승재의 정경풍경', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 208: {SA : '신민형 생활문화시론', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 198: {SA : '도시농부 김대식의 실패 않는 귀농·귀촌', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 189: {SA : '강소슬 20-30 톡톡', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 228: {SA : '최동군의 나도 문화해설사', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 216: {SA : '이기수의 소비자트렌드', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 205: {SA : '송하식의 세상보기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 194: {SA : '김나령 예술의 재발견', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 232: {SA : '헬레나 에그아트', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 212: {SA : '유준곤 덴탈EQ', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 218: {SA : '이미경 명작의 비밀', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 191: {SA : '건축과 시', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 222: {SA : '이종은 한옥이야기', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 214: {SA : '윤주의 스토리텔링', PA : '칼럼', QA : '이야기쉼터', DEPTH : 3}
    , 182: {SA : '김희철 칼럼', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
    , 184: {SA : '송승종 칼럼', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
    , 187: {SA : '장원준 칼럼', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
    , 183: {SA : '류제승 칼럼', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
    , 185: {SA : '원태재의 Old & New', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
    , 181: {SA : '김한경 칼럼', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
    , 188: {SA : '최기일 칼럼', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
    , 186: {SA : '임방순 칼럼', PA : '소통시대', QA : '시큐리티팩트', DEPTH : 3}
	, 239 : {SA : '미네르바의 눈', DEPTH : 1}
	
    , 268 : {SA : 'MICE', DEPTH : 1}
    , 269 : {SA : '굿잡포럼' , PA : 'MICE', DEPTH : 2}
    , 270 : {SA : 'ESG포럼' , PA : 'MICE', DEPTH : 2}
    , 271 : {SA : '방산혁신포럼' , PA : 'MICE', DEPTH : 2}
    , 272 : {SA : '지속가능경영소통대상' , PA : 'MICE', DEPTH : 2}

	, 267 : {SA : 'ENGLISH', DEPTH : 1}
   },
    init : function () {
        var self = this;
			self.menuActive();
		},
    //메뉴 ACTIVE
    menuActive : function (menu) {
        var self = this;

       var url = location.pathname;
       var paName, sName, pathName;

       if(url.indexOf('list2') > -1){
          SEARCH.dateSetList();
          SEARCH.goSearch();
       }else{
         url = url.split('/');

         var num = url[url.length - 1];
         var menu = self.menuEnum[num];
         console.log(self.menuEnum[num]);

         if(ObjectUtils.isNotEmpty(menu.DEPTH) && menu.DEPTH == 1){
           paName = menu.SA;
           pathName = ' > ' + menu.SA;
         }else if(ObjectUtils.isNotEmpty(menu.DEPTH) && menu.DEPTH == 2){
           paName = menu.PA;
           pathName = ' > ' +menu.PA + ' > ' +menu.SA;
         }else if(ObjectUtils.isNotEmpty(menu.DEPTH) && menu.DEPTH == 3){
           paName = menu.QA;
           pathName = ' > ' +menu.QA + ' > ' +menu.PA;
         }

         /*if (ObjectUtils.isNotEmpty(menu.PA)) {
           paName = menu.PA;
           pathName = ' > ' +menu.PA + ' > ' +menu.SA;
         }else{
          paName = menu.SA;
          pathName = ' > ' + menu.SA;
        }*/

         sName = menu.SA;
         $("#homeSectionName").html("Home" + pathName);
         $(".parentSection").val(paName);
         $("#sectionNameVal").html(sName);
       }
    }
};

/*ie 썸네일*/
$(document).ready(function (){

  if(typeof IE_TYPE != "undefined" && IE_TYPE){
    return ;
  }

var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent;
ieReg = /msie|Trident.*rv[ :]*11\./gi;
ie = ieReg.test(userAgent);

if (ie) {
    $(".list-imgBox").each(function () {
        var $container = $(this),
            imgUrl = $container.find("img").prop("src");
        if (imgUrl) {
            $container.css({"backgroundImage": 'url(' + imgUrl + ')',
                            "background-size": "cover",
                            "height": "91px",
                            "width": "135px",
                            "max-width": "100%",
                            "background-position": "0 29%"});
     }
    });
  }

});


$(document).ready(function (){

  if(typeof IE_TYPE != "undefined" && IE_TYPE){
    return ;
  }

var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent;
ieReg = /msie|Trident.*rv[ :]*11\./gi;
ie = ieReg.test(userAgent);

if (ie) {
    $(".article-card-img").each(function () {
        var $container = $(this),
            imgUrl = $container.find("img").prop("src");
        if (imgUrl) {
            $container.css({"backgroundImage": 'url(' + imgUrl + ')',
                            "background-size": "cover",
                            "height": "161px",
                            "width": "260.5px",
                            "max-width": "100%",
                            "background-position": "0 29%"});
     }
    });
  }

});



$(document).ready(function (){

  if(typeof IE_TYPE != "undefined" && IE_TYPE){
    return ;
  }

var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent;
ieReg = /msie|Trident.*rv[ :]*11\./gi;
ie = ieReg.test(userAgent);

if (ie) {
    $(".series-img-box").each(function () {
        var $container = $(this),
            imgUrl = $container.find("img").prop("src");
        if (imgUrl) {
            $container.css({"backgroundImage": 'url(' + imgUrl + ')',
                            "background-size": "cover",
                            "height": "81px",
                            "width": "124px",
                            "max-width": "100%",
                            "background-position": "0 29%"});
		}
    });
  }

});

function translateDevice() {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + 1 );
	document.cookie = "pcT=" + escape("Y") + "; path=/; expires=" + todayDate.toGMTString() + ";";

	window.location.href='/main';
};

function translateDeviceGetCookie(cookieName){
	var search = cookieName + "=";
	var cookie = document.cookie;
	if( cookie.length > 0 ){
		startIndex = cookie.indexOf( cookieName );

		if( startIndex != -1 ){
			startIndex += cookieName.length;
			endIndex = cookie.indexOf( ";", startIndex );

			if( endIndex == -1) endIndex = cookie.length;

			return unescape( cookie.substring( startIndex + 1, endIndex ) );
		} else {
			return false;
		}

	} else {
		return false;
	}
}
