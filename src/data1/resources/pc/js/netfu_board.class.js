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
				if(confirm("��젣�섏떆寃좎뒿�덇퉴?")) {
					var _len = $(el).closest("tr").find(".file").find(".file_item_").find("div.item_").length;
					if(_len<=1) {
						alert("1媛쒖씠�섎뒗 ��젣�� �� �놁뒿�덈떎.");
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
				case '0046': alert("�뚯썝留� 異붿쿇 媛��ν빀�덈떎."); break;
				case '0047': alert("媛믪씠 �쒕�濡� �섏뼱�ㅼ� �딆븯�듬땲��."); break;
				case '0048': alert("�대떦 寃뚯떆臾쇱뿉�쒕쭔 異붿쿇 �먮뒗 鍮꾩텛泥� �섏떎 �� �덉뒿�덈떎."); break;
				case '0049': alert("寃뚯떆�먯씠 議댁옱�섏� �딆뒿�덈떎."); break;
				case '0050': alert("�먯떊�� 湲��먮뒗 異붿쿇 �먮뒗 鍮꾩텛泥� �섏떎 �� �놁뒿�덈떎."); break;
				case '0051': alert("�� 寃뚯떆�먯� 異붿쿇 湲곕뒫�� �ъ슜�섏� �딆뒿�덈떎."); break;
				case '0052': alert("�� 寃뚯떆�먯� 鍮꾩텛泥� 湲곕뒫�� �ъ슜�섏� �딆뒿�덈떎."); break;
				default :
					alert(result);
					if(result.indexOf('�� 湲���')>=0) location.reload();
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
					alert('�댁슜�� �낅젰�섏떗�쒖삤.'); 
					ed_wr_content.returnFalse();
					return false;
				}
			}

			// : 寃뚯떆�� 湲��몃븣 �� �⑥닔媛� 瑗� �덉뼱�쇳븿.
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
						alert("�쒕ぉ�� 湲덉��⑥뼱('"+subject+"')媛� �ы븿�섏뼱�덉뒿�덈떎");
						f.wr_subject.focus();
						return false;
					}

					if (content) {
						alert("�댁슜�� 湲덉��⑥뼱('"+content+"')媛� �ы븿�섏뼱�덉뒿�덈떎");
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