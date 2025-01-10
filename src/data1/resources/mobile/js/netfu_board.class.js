var netfu_board = function() {

	this.del = function() {
	}


	this.board_read = function(el, bo_table, no) {
		$.post("/include/regist.php", "mode=board_read&bo_table="+bo_table+"&no="+no, function(data){
			data = $.parseJSON(data);
			if(data.msg) alert(data.msg);
			if(data.js) eval(data.js);
			if(data.move) location.href = data.move;
		});
	}


	this.board_btn_click = function(el, bo_table, no, code) {
		$.post("/include/regist.php", "mode=board_btn_click&code="+code+"&bo_table="+bo_table+"&no="+no, function(data) {
			data = $.parseJSON(data);
			if(data.msg) alert(data.msg);
			if(data.js) eval(data.js);
			if(data.move) location.href = data.move;
		});
	}


	this.board_add_file = function(el, code) {
		switch(code) {
			case "add":
				var _clone = $(el).closest("tr").find(".file").find(".file_item_").find("div.item_").eq(0).clone(true).wrapAll("<div/>").parent();
				$(el).closest("tr").find(".file").find(".file_item_").append(_clone.html());
				break;

			case "del":
				if(confirm("삭제하시겠습니까?")) {
					var _len = $(el).closest("tr").find(".file").find(".file_item_").find("div.item_").length;
					if(_len<=1) {
						alert("1개이하는 삭제할 수 없습니다.");
						return;
					}
					$(el).closest("tr").find(".file").find(".file_item_").find("div.item_").eq(_len-1).remove();
				}
				break;
		}
	}


	this.is_goods = function(el) {
		var board_code = $(el).attr("board_code");
		var code = $(el).attr("code");
		var bo_table = $(el).attr("bo_table");
		var no = $(el).attr("no");
		$.post(url+"/board/process/good.php", { ajax:'true', good:'good', board_code:board_code, code:code, bo_table:bo_table, wr_no:no }, function(result){
			switch(result){
				case '0046': alert("회원만 추천 가능합니다."); break;
				case '0047': alert("값이 제대로 넘어오지 않았습니다."); break;
				case '0048': alert("해당 게시물에서만 추천 또는 비추천 하실 수 있습니다."); break;
				case '0049': alert("게시판이 존재하지 않습니다."); break;
				case '0050': alert("자신의 글에는 추천 또는 비추천 하실 수 없습니다."); break;
				case '0051': alert("이 게시판은 추천 기능을 사용하지 않습니다."); break;
				case '0052': alert("이 게시판은 비추천 기능을 사용하지 않습니다."); break;
				default :
					alert(result);
					if(result.indexOf('이 글을')>=0) location.reload();
				break;
			}

		});
	}


	this.fwrite_submit = function() {

		var f = document.fwrite;
		var con = '';

		if(location.href.indexOf("/m/")==-1) {
			if (document.getElementById('tx_wr_content')) {
				if (!ed_wr_content.outputBodyText()) { 
					alert('내용을 입력하십시오.'); 
					ed_wr_content.returnFalse();
					return false;
				}
			}

			// : 게시판 글쓸때 이 함수가 꼭 있어야함.
			editor_check();

			document.getElementById('tx_wr_content').value = ed_wr_content.outputBodyHTML();
		}
		
		var subject = "";
		var content = "";

		if(validate(f)){

		
			if(_editor_use['wr_content']) con = _editor_use['wr_content'].outputBodyHTML();
			else con = f.wr_content.value;

			$.ajax({
				url: "/include/regist.php",
				type: "POST",
				data: {
					"mode":"board_filter",
					"bo_table" : f.bo_table.value,
					"subject": f.wr_subject.value,
					"content": con
				},
				dataType: "json",
				async: false,
				cache: false,
				success: function(data, textStatus) {
					subject = data.subject;
					content = data.content;

					if (subject) {
						alert("제목에 금지단어('"+subject+"')가 포함되어있습니다");
						f.wr_subject.focus();
						return false;
					}

					if (content) {
						alert("내용에 금지단어('"+content+"')가 포함되어있습니다");
						if (typeof(ed_wr_content) != "undefined") 
							ed_wr_content.returnFalse();
						else 
							f.wr_content.focus();
						return false;
					}

					f.action = '/board/process/regist.php';
					f.submit();
				}
			});
		}

		return false;
	}

}

var netfu_board = new netfu_board();