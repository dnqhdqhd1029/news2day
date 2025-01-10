var netfu_news = function() {

	this.page_code = '';

	this.all_menu = function(code) {

		//if(_display=='none') $(".side_menu2").fadeOut();
		//else $(".side_menu2").fadeIn('slow');

		var _class = $(".allMenu").attr("class");
		switch(code) {
			case "open":
				$(".allMenu").fadeIn('slow');
				//$(".allMenu").removeClass("none_");
				break;
			case "close":
				$(".allMenu").fadeOut();
				//$(".allMenu").addClass("none_");
				break;
			default:
				if(_class.indexOf("none_")>=0) $(".allMenu").fadeIn('slow');
				else $(".allMenu").fadeOut();

				//if(_class.indexOf("none_")>=0) $(".allMenu").removeClass("none_");
				//else $(".allMenu").addClass("none_");
				break;
		}
	}


	this.login_tab = function(el, code) {
		$(".login_form_").css({"display":"none"});
		$(".login_tab").find(".tab").removeClass("on");
		$(el).addClass("on");
		switch(code) {
			case 'login':
				$(".login_form_.login_form").css({"display":"block"});
				break;

			case 'sns':
				$(".login_form_.sns_login").css({"display":"block"});
				break;
		}
	}


	this.search = function(el) {
		var form = $(el).closest("form");
		form.submit();
	}


	this.news_scrap = function(no) {
		$.post('/include/regist.php', { mode:'news_scrap', ajax:1, no:no }, function(result){
			if( result=='0012') {
				alert("회원만 스크랩 가능합니다.\n\n회원이시라면 로그인해 주세요.");
				if(netfu_util.page_check=='mobile') location.href = "/m/page/login.php?url="+encodeURIComponent(location.href);
				else location.href = "/member/login.php?url="+encodeURIComponent(location.href);
			} else {
				if( result == '0013' ){
					alert("기사 스크랩중 오류가 발생했습니다.");
				} else if( result == '0014' ){
					alert("이미 스크랩한 기사 입니다.");
				} else {
					alert("뉴스 기사를 스크랩 하였습니다.");
				}
			}
		});
	}


	this.mail_send = function(){
		var send_mail = $('#send_mail').val();
		if( !send_mail || send_mail == '' ){
			alert("보내는분 이메일 주소를 입력해 주세요.");
			$('#send_mail').focus();
			return;
		}
		var receive_mail = $('#receive_mail').val();
		if( !receive_mail || receive_mail == '' ){
			alert("받는분 이메일 주소를 입력해 주세요.");
			$('#receive_mail').focus();
			return;
		}
		var mail_options = {
			beforeSubmit: function(formData, jqForm, form_options){
				var queryString = $.param(formData);
				return true;
			},
			success : function(responseText, statusText, xhr, $form){
				alert("기사 내용이 메일로 발송 되었습니다.");
				mail_layer_close();
			}
		};
		$('#mailLayerFrm').ajaxSubmit(mail_options);
		//$('#mailLayerFrm').submit();
	}


	this.comment_box = function(el, no, code) {

		var form = document.forms['fcomment'];

		switch(code) {
			case 'comment_insert':
			case 'comment_update':
				var obj = $(el).closest('.reply_con');
				$(".reply_list_start").find(".reply_con_write__").css({"display":"none"});
				var form_is = obj.find(".reply_con_write__");
				if(!form_is[0]) {
					var _clone = $(".reply_con_write__").eq(0).clone();
					_clone.find("[name='comment_id']").val(no);
					_clone.find("form").attr("name", "freply_"+no);
					_clone.removeClass("mt0");

					if(location.href.indexOf("/m/")>=0) {
						obj.find(".comment01.comment_con").append(_clone);
					} else
						obj.append(_clone);

				} else {
					obj.find(".reply_con_write__").css({"display":"block"});
				}
				if(code=='comment_update') obj.find("textarea").val(obj.find(".reply_text").find("p").html());
				obj.find("[name='mode']").val(code);
				break;

			case 'comment_delete':
				if( is_member ) {
					if( confirm("댓글을 삭제하시겠습니까?")){
						var actions = form.action.indexOf("/board/")>=0 ? '/board/process/delete_comment.php' : form.action;
						$.post(actions,{ mode:'comment_delete', ajax:1, comment_id:no, bo_table:form.bo_table.value, token:form.token.value }, function(result){
							if(result) alert(result);
							else location.reload();
						});
					}
				} else {
					netfu_util.password_click(el, form.bo_table.value, no, code, '.reply_con_list_');
				}
				break;

			case 'comment_report':
				if( confirm("기사의 해당 댓글을 신고하시겠습니까?")){
					$.post('/include/regist.php',{ mode:'comment_report', ajax:1, comment_id:no }, function(result){
						switch(result){
							case '0011':
								alert("등록된 코멘트가 없거나 코멘트 글이 아닙니다.");
							break;
							case '0020':
								alert("이미 신고하신 글 입니다.");
							break;
							default:
								alert("해당 댓글을 신고 하였습니다.");
							break;
						}
					});
				}
				break;
		}
	}

	this.is_goods = function( el, wr_id, is_good ){
		var form = document.forms['fcomment'];
		var _para = $(form).serialize();
		$.post('/include/regist.php', _para+"&mode=comment_is_goods&ajax=1&wr_id="+wr_id+"&is_good="+is_good, function(result){
			result = $.parseJSON(result);

			if(result.comment_is) {
				if(location.href.indexOf("/m/")>=0) {
					var _count = parseInt($(el).find("span").text());
					alert(_count);
					$(el).find("span").text((_count+1));
				} else {
					var _count = parseInt($(el).find("em").text());
					$(el).find("em").text((_count+1));
				}
			}

			if(result.msg) {
				alert(result.msg);
			}
			else {
				if( is_good == 'good' ){
					$('#good_'+wr_id).html(result);
				} else {
					$('#nogood_'+wr_id).html(result);
				}
			}
		});
	}



	// : 이메일
	this.send_email = function(el, no) {

		if(el) {
			var _offset = $(el).offset();
			var _width = $(".mail_box").width();
			$(".mail_box").css({"top":(_offset.top+37)+'px', "left":(_offset.left-_width+60)+'px'});
		}

		var _class = $(".mail_box").attr("class");
		if(_class.indexOf("none_")>=0) $(".mail_box").removeClass("none_");
		else $(".mail_box").addClass("none_");
	}

	this.send_mail_process = function() {
		var form = document.forms['mailLayerFrm'];

		if( !form.send_mail.value ){
			alert("보내는분 이메일 주소를 입력해 주세요.");
			form.send_mail.focus();
			return;
		}
		if( !form.receive_mail.value ){
			alert("받는분 이메일 주소를 입력해 주세요.");
			form.send_mail.focus();
			return;
		}

		var mail_options = {
			beforeSubmit: function(){
			}, 
			success : function(){
				alert("기사 내용이 메일로 발송 되었습니다.");
				netfu_news.send_email();
			}
		};

		$(form).ajaxSubmit(mail_options);

	}


	this.support_price_click = function(el, k) {
		var form = document.forms['fsupport'];
		var _para = $(form).serialize();
		$.post("/include/regist.php", _para+"&mode=support_price_click&k="+k, function(data){
			data = $.parseJSON(data);
			if(data.js) eval(data.js);
			$(el).closest(".tab").find("li").removeClass("on");
			$(el).addClass("on");
		});
	}


	this.add_price = function(price) {
		var form = document.forms['fsupport'];
		var _para = $(form).serialize();
		$.post("/include/regist.php", _para+"&mode=support_price_add&price="+price, function(data){
			data = $.parseJSON(data);
			if(data.msg) alert(data.msg);
			if(data.js) eval(data.js);
			if(data.move) location.href = data.move;
		});
	}



	this.more_page = {};
	this.more_view = function(type, limit, p_limit) {
		var _para = $(document.forms['base_form']).serialize();
		if(!netfu_news.more_page[type+'_use']) netfu_news.more_page[type+'_use'] = 'Y';
		if(netfu_news.more_page[type+'_use']=='Y') {
			if(!netfu_news.more_page[type]) netfu_news.more_page[type] = 1;
			p_limit = p_limit ? p_limit : '';
			$.post("/m/include/regist.php", _para+"&mode=more_view&type="+type+"&start="+limit+"&p_limit="+p_limit+"&page="+netfu_news.more_page[type]+"&page_code="+netfu_news.page_code, function(data){
				//alert(data);
				data = $.parseJSON(data);
				if(data.js) eval(data.js);
				$("."+type+"_news").find(".data_paste").append(data.html);
				netfu_news.more_page[type]++;
			});
		}
	}


	this.ajax_cate_change = function(el) {
		if(el.value=='photo' || el.value=='movie') {
			netfu_util.ajax_cate(el, el.value, 1)
		} else {
			netfu_util.ajax_cate(el, 'section', 1);
		}
	}




	// : 설문조사


	// : 설문조사
}

var netfu_news = new netfu_news();