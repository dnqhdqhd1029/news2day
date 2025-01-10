var netfu_util = function() {
    
    this.page_check = location.href.indexOf("/m/") >= 0 ? 'mobile' : 'pc';
    
    this.all_check = function(el, c) {
        if (el.type == 'checkbox') {
            is = el.checked;
        } else {
            is = $(".all_chk")[0].checked;
            is = is ? false : true;
        }
        
        $(".all_chk").prop("checked", is);
        
        $(c).prop("checked", is);
    }
    
    this.agree_chk = function(fname, name_arr) {
        var form = document.forms[fname];
        var len = name_arr.length;
        if (len > 0) {
            for(var i = 0; i < len; i++) {
                var chk = $(form).find("[name='" + name_arr[i] + "']:checked").length;
                if (chk <= 0) return name_arr[i];
            }
        }
        return false;
    }
    
    this.put_text = function(el, obj) {
        obj.val(el.value);
    };
    
    this.email_select = function(el, name) {
        $(el).closest("td").find("[name='" + name + "']").eq(1).val(el.value);
    }
    
    
    this.login_submit = function(form) {
        netfu_util.ajax_submit(form);
        return true;
    }
    
    
    this.ajax_cate = function(el, type, key, read_type) {
        var obj = $(el.form).find("[name='" + el.name + "']");
        var _put = $(el).attr("put");
        var put_obj = _put ? $("#" + _put) : obj.eq(key);
        var val = $(el).attr("val");
        var _this = $(el).attr("this");
        var _no = read_type != 'auto' ? el.value : (el.value ? el.value : _this);
        
        var _html = '<option value="">' + put_obj.find("option").eq(0).html() + '</option>';
        
        if (!el.value && !read_type) {
            put_obj.html(_html);
        } else {
            if (_no) {
                $.post("/include/regist.php", "mode=get_cate_array&type=" + type + "&no=" + _no, function(data) {
                    data = $.parseJSON(data);
                    var len = data.cate.length;
                    if ($(put_obj).closest(".third_section")[0]) {
                        var _display = len > 0 ? 'inline' : 'none';
                        $(".third_section").css("display", _display);
                    }
                    put_obj.html('');
                    for(var i = 0; i < len; i++) {
                        var selected = val == data.cate[i]['wr_code'] && val ? 'selected' : '';
                        _html += '<option value="' + data.cate[i]['wr_code'] + '" ' + selected + '>' + data.cate[i]['wr_name'] + '</option>';
                    }
                    put_obj.html(_html);
                });
            }
        }
    }
    
    
    this.ajax_submit = function(el, noneObj) {
        var form = el;
        if (validate(form)) {
            $(form).ajaxSubmit({
                //보내기전 validation check가 필요할경우
                beforeSubmit: function(data, frm, opt) {
                    //alert("전송전!!");
                    return true;
                },
                //submit이후의 처리
                success: function(data, statusText) {
                    //alert(data);
                    data = $.parseJSON(data);
                    if (data.msg) alert(data.msg);
                    if (data.js) eval(data.js);
                    if (data.move) location.href = data.move;
                    if (noneObj) noneObj.css('display', 'none');
                    return false;
                },
                //ajax error
                error: function(data, status, error) {
                    alert("에러발생!!");
                    return false;
                }
            });
        }
        return false;
    }
    
    
    this.calendar_sels = function() {
        $('#calendar_sel').datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: '+0d',
            onSelect: function(dateText, inst) {
                var date = $(this).val();
                location.href = "./all.php?date=" + date;
                /*
                var time = $('#time').val();
                alert('on select triggered');
                $("#start").val(date + time.toString(' HH:mm').toString());
                */
            }
        });
    }
    
    this.scaleFont = function(val, c) {
        var fontSize = getFontSize();
        var fontSizeSave = fontSize;
        if (val > 0) {
            if (fontSize <= 30) {
                fontSize = fontSize + val;
            }
        } else {
            if (fontSize > 14) {
                fontSize = fontSize + val;
            }
        }
        fontSize = fontSize + "px";
        $(c).css({'font-size': fontSize});
        
        //$(c).css('fontSize',fontSize);
        set_cookies("ck_fontsize", fontSize, 30, domain);
    }
    
    
    this.password_reset_form = function(el, c) {
        var form = $(el).closest("form")[0];
        $(c).css({"display": "none"});
        form.reset();
    }
    
    this.password_click = function(el, bo_table, no, code, c) {
        var form = document.forms['fpassword'];
        form.no.value = no;
        form.code.value = code;
        form.bo_table.value = bo_table;
        
        $.post("/include/regist.php", "mode=get_token", function(data) {
            data = $.parseJSON(data);
            form.token.value = data.token;
            
            $(el).closest(c).css('position', 'relative');
            $(".password_div__").css({"display": "block"});
            $(".password_div__").parent().appendTo($(el).closest(c));
            
            if (c == '.btn_board1_') $(".password_div__").css({"top": "40px", "left": "0px", "right": "auto"});
            if (location.href.indexOf("/m/") >= 0) $(".password_div__").css({"top": "50px"});
            if (c == '.reply_con_list_') {
                if (location.href.indexOf("/m/") >= 0) $(".password_div__").css({"top": "95px", "left": "5px"});
                else $(".password_div__").css({"top": "50px", "right": "5px"});
            }
            if (c == '.info_tag_') $(".password_div__").css({"top": "5px", "left": "30px"});
            
            $(".password_div__").addClass("on");
            form.password.focus();
        });
    }
    
    this.password_click_confirm = function(el) {
        
        if (validate(el)) {
            var _para = $(el).serialize();
            $.post("/include/regist.php", _para + "&mode=password_confirm", function(data) {
                data = $.parseJSON(data);
                if (data.msg) alert(data.msg);
                if (data.js) eval(data.js);
                if (data.move) location.href = data.move;
            });
        }
        
        return false;
    }
    
    
    this.search_page_rows = function(el, fname) {
        var form = document.forms[fname];
        
        form.submit();
    }
    
    
    this.mb_id_checking = function(fname) {
        var form = document.forms[fname];
        var mb_id = form.mb_id.value;
        if (mb_id.trim()) {
            $('#duplicate_id_check').val(1);
            $.post('/member/process/regist.php', {mode: 'mb_id_check', ajax: 1, mb_id: mb_id}, function(result) {
                if (result == '0007') {
                    $('#is_duplicate_id').val(1);
                    alert("이미 존재하는 아이디 입니다!");
                    form.mb_id.value = "";
                } else if (result == '0003') {
                    $('#is_duplicate_id').val(0);
                    alert("사용 가능한 아이디 입니다.");
                }
            });
        } else {
            $('#duplicate_id_check').val(0);
            $('#is_duplicate_id').val(1);
            alert("아이디를 입력해 주세요.");
            form.mb_id.focus();
            return false;
        }
    }
    
    this.mb_nick_checking = function(fname) {
        var form = document.forms[fname];
        var mb_nick = form.mb_nick.value;
        if (mb_nick.trim()) {
            $('#duplicate_nick_check').val(1);
            $.post('/member/process/regist.php', {mode: 'mb_nick_check', ajax: 1, mb_nick: mb_nick}, function(result) {
                if (result == '0010') {
                    $('#is_duplicate_nick').val(1);
                    $('#duplicate_nick_check').val(0);
                    alert("닉네임에 공백이 존재합니다.\n\n공백없이 입력해 주세요.");
                } else if (result == '0011') {
                    $('#is_duplicate_nick').val(1);
                    alert("이미 존재하는 닉네임 입니다!");
                    if (location.href.indexOf('mypage/update_form.php') == -1) form.mb_nick.value = "";
                } else if (result == '0004') {
                    $('#is_duplicate_nick').val(0);
                    alert("사용 가능한 닉네임 입니다.");
                }
            });
        } else {
            $('#duplicate_nick_check').val(0);
            $('#is_duplicate_nick').val(1);
            alert("닉네임을 입력해 주세요.");
            form.mb_nick.focus();
            return false;
        }
    }
    
    
    this.find_id = function() {	// 아이디 찾기
        var form = document.forms['f_findid'];
        if ($('#find_id_use').length) {
            var use_sel = $('#find_id_use').val();
        } else {
            var use_sel = $("input[name='find_id_use']:checked").val();
        }
        if (validate(form)) {
            var find_name = $('#find_id_name').val(), find_email = $('#find_id_email').val();
            $.post('/member/process/regist.php', {mode: 'find_id', find_type: use_sel, find_name: find_name, find_email: find_email}, function(result) {
                if (result == '0026') {
                    alert("가입된 회원정보를 찾을 수 없습니다.");
                } else {
                    alert("문의하신 아이디가 [" + find_email + "] 로 전송되었습니다.");
                    form.reset();
                }
            });
        }
    }
    this.find_pass = function() {	// 비밀번호 찾기
        var form = document.forms['f_findpw'];
        if ($('#find_pass_use').length) {
            var use_sel = $('#find_pass_use').val();
        } else {
            var use_sel = $("input[name='find_pass_use']:checked").val();
        }
        if (validate(form)) {
            var find_name = $('#find_pass_name').val(), find_id = $('#find_pass_id').val(), find_email = $('#find_pass_email').val();
            $.post('/member/process/regist.php', {mode: 'find_pass', find_type: use_sel, find_name: find_name, find_id: find_id, find_email: find_email}, function(result) {
                if (result == '0026') {
                    alert("가입된 회원정보를 찾을 수 없습니다.");
                } else {
                    alert("문의하신 비밀번호가 [" + find_email + "] 로 전송되었습니다.");
                    form.reset();
                }
            });
        }
    }
    
    
    this.date_calc = function(date, sel_date) {
        var ch_date = new Date(date);
        var sel_date_arr = sel_date.split(" ");
        switch(sel_date_arr[1]) {
            case "day":
                ch_date.setDate(ch_date.getDate() - sel_date[0]);
                break;
            
            case "month":
                ch_date.setDate(ch_date.getMonth() - sel_date[0]);
                break;
            
            case "year":
                ch_date.setDate(ch_date.getFullYear() - sel_date[0]);
                break;
        }
        return ch_date.getFullYear() + '-' + ('0' + (ch_date.getMonth() + 1)).slice(-2) + '-' + ('0' + ch_date.getDate()).slice(-2);
    }
    
    
    this.put_date = function(el) {
        var sel_date = $(el).attr('date');
        var d_start = $(el).attr("d_start");
        var d_end = $(el).attr("d_end");
        
        var todate = new Date();
        var day_txt = todate.getFullYear() + '-' + ('0' + (todate.getMonth() + 1)).slice(-2) + '-' + ('0' + todate.getDate()).slice(-2);
        
        switch(sel_date) {
            case 'today':
                $('#' + d_start).val(day_txt);
                $('#' + d_end).val(day_txt);
                break;
            
            default:
                var ch_date = netfu_util.date_calc(day_txt, sel_date);
                $('#' + d_start).datepicker('setDate', '-' + sel_date);
                $('#' + d_end).val(day_txt);
                break;
        }
    }
    
    
    this.editor_start = function() {
        $("textarea").each(function() {
            var _type = $(this).attr("type");
            if (_type == 'editor') {
                var _name = $(this).attr("name");
                var _width = $(this).css("width");
                var _height = $(this).css("height");
                if (!$(this).attr("id")) $(this).attr("id", "tx_" + _name);
                try {
                    _editor_use[_name] = new cheditor('ed_' + _name);
                    _editor_use[_name].config.editorHeight = _height ? _height : '250px';
                    _editor_use[_name].config.editorWidth = _width ? _width : '100%';
                    _editor_use[_name].inputForm = 'tx_' + _name;
                    _editor_use[_name].run();
                } catch(e) {
                    alert(e.message);
                }
            }
        });
    }
    
    
    this.tr_open = function(el, k) {
        var display = $(el).closest("tbody").find("tr").eq(k).css("display");
        display = display == 'none' ? 'table-row' : 'none';
        $(el).closest("tbody").find("tr").eq(k).css({"display": display});
    }
    
    
    this.view_photo = function(el) {
    }
    
    
    this.share_sns = function(el, code) {
        
        var _subject = $(el).attr("txt_");
        var _link = location.href;
        
        switch(code) {
            case "kakao_story":
                Kakao.Story.share({
                    url: _link
                });
                break;
            
            
            case "facebook":
                window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(_link), 'sharer', 'toolbar=0,status=0,width=626,height=436');
                break;
            
            
            case "twitter":
                var url = "http://twitter.com/share?text=" + encodeURIComponent(_subject) + "&url=" + escape(_link);
                window.open(url);
                break;
            
            
            case "google":
                var url = "https://www.google.co.kr/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=&url=https://plus.google.com/share?url=" + _link;
                window.open(url);
                break;
            
            
            case "naver_band":
                window.open('http://band.us/plugin/share?body=' + encodeURIComponent(_subject + " - " + _link) + '&route=' + encodeURIComponent(url), 'share_band', 'width=410, height=540, resizable=no');
                break;
        }
    }
    
    
    this.share_btn_gp_click = function() {
        var display = $(".share_btn_gp").css("display") == 'none' ? 'block' : 'none';
        $(".share_btn_gp").css("display", display);
    }
    
    
    this.get_date = function(val) {
        
        var val_arr = val.split(" ");
        val_arr[0] = parseInt(val_arr[0]);
        if (val_arr[1] == 'week') {
            val_arr[0] = val_arr[0] * 7;
            val_arr[1] = 'day';
        }
        
        // : 오늘날짜
        var today = new Date();
        var today_dd = (today.getDate() + 1 < 10) ? '0' + (today.getDate() + 1) : today.getDate() + 1;
        var today_mm = (today.getMonth() + 1 < 10) ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        
        var yy = today.getFullYear();
        var mm = today.getMonth();
        var dd = today.getDate();
        if (val_arr[1] == 'year') yy = yy - val_arr[0];
        if (val_arr[1] == 'month') mm = mm - val_arr[0];
        if (val_arr[1] == 'day') dd = dd - val_arr[0];
        
        // : 클릭날짜
        var prev_day = new Date(yy, mm, dd);
        var prev_mm = (prev_day.getMonth() + 1 < 10) ? '0' + (prev_day.getMonth() + 1) : prev_day.getMonth() + 1;
        var prev_dd = (prev_day.getDate() < 10) ? '0' + (prev_day.getDate() + 1) : prev_day.getDate() + 1;
        
        // : 결과
        var day1 = prev_day.getFullYear() + '-' + (prev_mm) + '-' + prev_dd;
        var day2 = today.getFullYear() + '-' + (today_mm) + '-' + today_dd;
        
        return [day1, day2];
    }
    
    
    /*############## 설문조사 ###############*/
    this.poll_result = function(el) {
        $.post("/include/regist.php", "mode=poll_result", function(data) {
            data = $.parseJSON(data);
            if (data.js) eval(data.js);
        });
    }
    
    this.poll_position = function(el) {
        var _offset = $(el).closest(".poll_select_").offset();
        var _width = $(".poll_result_view").width();
        $(".poll_result_view").css({'top': _offset.top, 'left': (_offset.left - _width - 30) + 'px'});
    }
    
    this.poll_insert = function(el, no) {
        var poll_answer = $("input[name='wr_answer']:checked").val();
        if (!poll_answer) {
            alert("설문조사를 선택해주시기 바랍니다.");
        } else {
            $.post('/include/process/poll.php', {mode: 'poll_insert', no: no, answer: poll_answer}, function(result) {
                switch(result) {
                    case '0085':	// 회원만 투표 가능합니다.
                        alert("회원만 투표 가능합니다.");
                        location.href = "/member/login.php?url=" + location.href;
                        return false;
                        break;
                    case '0086':	// 이미 투표하셨습니다.
                        alert("이미 투표하셨습니다.");
                        return false;
                        break;
                    default:
                        if (confirm("투표가 완료 되었습니다.\n결과를 확인하시겠습니까?")) {
                            netfu_util.poll_result(el);
                        }
                        return false;
                        break;
                }
                $('#poll_quest_info').show();
            });
        }
    }
    
    this.poll_questionAnswer = function(answer, mode, no, sels) {	 // 질의 응답에 따른 처리
        if (answer == 'yes') {
            switch(mode) {
                // 비회원일때 로그인 페이지로 이동
                case 'member_login':
                    location.href = document.domain + "/member/login.php?url=" + location.href;
                    break;
                // 투표 결과 확인
                case 'poll_view':
                    $.unblockUI();
                    $('#poll_info').load('/include/process/poll.php', {mode: 'poll_view', no: no}, function(result) {
                        $('#poll_info').show();
                    });
                    break;
            }
        } else {
            $.unblockUI();
        }
    }
    /*############## 설문조사 ###############*/
}


var netfu_util = new netfu_util();


var date_val = new Date();
var datepicker_json = {
    dateFormat: "yy-mm-dd", /* 날짜 포맷 */
    prevText: '이전달',
    nextText: '다음달',
    showButtonPanel: true, /* 버튼 패널 사용 */
    changeMonth: true, /* 월 선택박스 사용 */
    changeYear: true, /* 년 선택박스 사용 */
    showOtherMonths: false, /* 이전/다음 달 일수 보이기 */
    selectOtherMonths: true, /* 이전/다음 달 일 선택하기 */
    yearSuffix: '년',
    closeText: '닫기',
    currentText: '오늘',
    showMonthAfterYear: true, /* 년과 달의 위치 바꾸기 */
    /* 한글화 */
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    weekHeader: 'Wk',
    yearRange: "-100:+0",
    firstDay: 0,
    isRTL: false,
    showAnim: 'slideDown',
    onSelect: function(dateText, inst) {
    }
};


var _editor_use = {};

$(window).ready(function() {
    if (location.href.indexOf("/m/page/view.php") >= 0) {
        
        $(".news_body").find("iframe").css({"max-width": ($(window).width() - 30) + "px"});
        $(".news_body").find("img").css({"max-width": ($(window).width() - 30) + "px"});
        
    }
    
    netfu_util.editor_start();
    
    // : 날짜
    $(".datepicker_inp").datepicker(datepicker_json).keyup(function(e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });
    
    
    $('.set_day').click(function() {
        $(this).closest("ol").find("button").removeClass("on");
        $(this).parent().addClass("on");
        netfu_util.put_date($(this)[0]);
    });
    
    
    $("[data-news-tab]").each(function(i) {
        $(this).hover(function() {
            var tab = $(this).data('news-tab') || '';
            $("[data-tab]").css({"display": "none"});
            $('[data-tab="' + tab + '"]').css({"display": "block"});
            console.error('zz', tab, $(this).text());
        }, function() {
        });
    });
});