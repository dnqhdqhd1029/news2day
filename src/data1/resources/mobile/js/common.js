var charset = 'UTF-8';
var domain = document.domain;
var is_http = /\s(?:http|https):\/\/\S*(?:\s|$)/g;

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01 
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);} 
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'':(v='hide')?'none':v; }
    obj.display=v; }
}

function showhide() { //v3.0
  var i,p,v,obj,args=showhide.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}
// TAB  -------------------------------------------------------------------*/
function Chtab(layername,xid,len){

	try{
		for(i=1;i <= len; i++){
			if (i==xid)	document.getElementById(layername+i).style.display="block";
			else	document.getElementById(layername+i).style.display="none";
		}
	} catch (e)	{}
}

function Ch_Class(layername,xid,len,class_name){

	try{
		for(i=1;i <= len; i++){
			if (i==xid)	document.getElementById(layername+i).className=class_name;
			else	document.getElementById(layername+i).className="";
		}
	} catch (e)	{}
}
// 포커싱   -------------------------------------------------------------------*/
function bluring(){  
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();  
}  
document.onfocusin=bluring;
// 인풋 비활성화 배경   -------------------------------------------------------------------*/
isDisabled = function (){
        for (var i=0; i<this.length; i++){
          if(this.item(i).disabled) this.item(i).style.backgroundColor="#e5e5e5";
        }
      }
      window.onload = function (){
        var input = document.getElementsByTagName("INPUT");
        //isDisabled.apply(input);  
      }
// 플래시 출력   -------------------------------------------------------------------*/	
function get_embed(src,query,width,height,vars)
{
	src += '?' + query;
	var codebase = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
	var pluginspage = "http://www.macromedia.com/go/getflashplayer";

	if (document.location.protocol == "https:") {
		codebase = codebase.replace(/http:/, "https:");
		pluginspage = pluginspage.replace(/http:/, "https:");
	}

	var widthAttr = (width > 0 ? 'width="'+width+'"' : '');
	var heightAttr = (height > 0 ? 'height="'+height+'"' : '');
	var tag = '';
	tag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+codebase+'" '+widthAttr+' '+heightAttr+'>';
	tag += '<param name="movie" value="'+src+'"/>';
	tag += '<param name="quality" value="high"/>';
	tag += '<param name="wmode" value="transparent"/>';
	tag += '<param name="bgcolor" value="#FFFFFF"/>';
	tag += '<param name="flashvars" value="' + vars + '"/>';
	tag += '<embed src="'+src+'" quality="high" wmode="transparent" bgcolor="#FFFFFF" '+widthAttr+' '+heightAttr+' type="application/x-shockwave-flash" pluginspage="'+pluginspage+'" flashvars="' + vars + '"></embed>';
	tag += '</object>';
	return tag;
}		
function embed(src,query,width,height,vars)
{
	var tag = get_embed(src,query,width,height,vars);
	document.write(tag);
}			
// 플래시 활성화   -------------------------------------------------------------------*/
function insertFlash( id, flashUri, vWidth, vHeight, winMode ) {
	var _obj_ = "";

	_obj_ = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8.0.35.0" width="' + vWidth + '" height="' + vHeight + '" id="' + id + '" align="middle">';
	_obj_ += '<param name="allowScriptAccess" value="always" />';
	_obj_ += '<param name="movie" value="' + flashUri + '" />';
	_obj_ += '<param name="quality" value="high" />';
	_obj_ += '<param name="wmode" value="' + winMode + '" />    ';
	_obj_ += '<param name="bgcolor" value="#ffffff" />        ';
	_obj_ += '<param name="scale" value="exactfit" />        ';	
	_obj_ += '<embed src="' + flashUri + '" quality="high" wmode="' + winMode + '" bgcolor="#ffffff" width="' + vWidth +'" height="' + vHeight + '" id="' + id + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>    ';
	_obj_ += '</object>';
	document.writeln( _obj_ );
}
var addslashes = function(str) {
	str=str.replace(/\\/g,'\\\\');
	str=str.replace(/\'/g,'\\\'');
	str=str.replace(/\"/g,'\\"');
	str=str.replace(/\0/g,'\\0');
	return str;
}
var stripslashes = function (str) {
	str=str.replace(/\\'/g,'\'');
	str=str.replace(/\\"/g,'"');
	str=str.replace(/\\0/g,'\0');
	str=str.replace(/\\\\/g,'\\');
	return str;
}
var nl2br = function(str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function length_count(num,filed, max_count) { 
    var str; 
    var str_count = 0; 
    var cut_count = 0; 
    var max_length = max_count; 
    var str_length = filed.value.length; 

	//alert( str_length+"@"+max_length );

    for (k=0;k<str_length;k++) { 
        str = filed.value.charAt(k); 
        if (escape(str).length > 4) { 
            str_count += 2; 
            max_length -= 2; 
        } else { 
            // (\r\n은 1byte 처리) 
            if (escape(str) == '%0A') { 
            } else { 
                str_count++; 
                max_length--; 
            } 
        } 

        if (max_count < str_count) { 
            alert("글자수가 "+ max_count +" byte 이상은 사용불가능 합니다"); 
            if (escape(str).length > 4) { 
                str_count -= 2; 
                max_length += 2; 
            } else { 
                str_count--; 
                max_length++; 
            } 
            filed.value = filed.value.substring(0,k); 
            break; 
        } 
    }
	max_length=max_count-max_length;
	 eval("this.span_byte"+num+".innerText = max_length;"); 
} 
//텍스트에어리어 비우기
function OnEnter( field ) { if( field.value == field.defaultValue ) { field.value = ""; } } 
var selAll = function(){	// 전체선택
	$('.check_all').each(function(){
		var sel = $(this).attr('checked');
		if(sel=='checked') {
			$('.check_all').attr('checked',false);
			$("input[name='check_all']").attr('checked',false);
			return false;
		} else {
			$('.check_all').attr('checked',true);
			$("input[name='check_all']").attr('checked',true);
			return false;
		}
	});
}
// 이달 마지막날짜
var LastDayOfMonth = function(Year, Month) {
    return(new Date((new Date(Year, Month+1,1))-1)).getDate();
}
// 기본 팝업창
var win_open = function(a, b, c, k) {
    c = window.open(a, b, "width=" + c + ", height=" + k + ", scrollbars=no, resizable=no, status=no,top=" + (screen.height - 550) / 2 + ",left=" + (screen.width - 640) / 2);
    c.focus()	
}
// input field 한글/숫자/영문 (onkeyup event)
var field_types = function( sel, type ){

	switch(type){
		case 'english':
			sel.value = sel.value.replace(/^a-zA-z]/g,'');
		break;
		case 'hangle':
			sel.value = sel.value.replace(/[^ㄱ-ㅎ가-횧]/g,'');
		break;
		case 'number':
			sel.value = sel.value.replace(/[^0-9]/g,'');
		break;
	}

}
var file_download = function(link, file) {	// 파일 다운로드
    document.location.href = link;
}
var isValidBlank = function(value) {
	var pattern = /[\s]/g;	///^\s+|\s+$/g;(/\s/g
	return (pattern.test(value)) ? true : false;
}
var CountChar = function( message, limit ){	 // 문자 bytes 계산 msg_bytes id 값만 잘 체크하면 됨
	var nbytes = 0;
	var availMsg = "";
	var chk=0;
	for (var i=0; i <message.value.length; i++){
		ch = message.value.charAt(i);
		if(escape(ch).length > 4) {
			nbytes += 2;
		} else if (ch == '\n') {
			if (message.value.charAt(i-1) != '\r') {
				nbytes += 1;
			}
		} else {
			nbytes += 1;
		}
		if (limit*1 >= nbytes*1) {
			availMsg += message.value.charAt(i);
		}
		$('#msg_bytes').html(nbytes*1);
	}
	if (nbytes*1 > limit*1) { // 바이트를 초과했을경우
		alert("[" + availMsg + "] 까지 발송됩니다.");
		//message.value = availMsg;
		$('#msg_bytes').html(limit*1);
		//message.focus();
		return;
	}
}
var CountCharText = function( message, limit, msg_bytes ){	 // text 필드 검사
	var nbytes = 0;
	var availMsg = "";
	var chk=0;
	for (var i=0; i <message.value.length; i++){
		ch = message.value.charAt(i);
		if(escape(ch).length > 4) {
			nbytes += 1;
		} else if (ch == '\n') {
			if (message.value.charAt(i-1) != '\r') {
				nbytes += 1;
			}
		} else {
			nbytes += 1;
		}
		if (limit*1 >= nbytes*1) {
			availMsg += message.value.charAt(i);
		}
		$('#'+msg_bytes).html(nbytes*1);
	}
	if (nbytes*1 > limit*1) { // 바이트를 초과했을경우
		//alert("[" + availMsg + "] 까지 입력 가능합니다.");
		$('#'+msg_bytes).html(limit*1);
		return;
	}
}
jQuery.fn.center = function () {	// 가운데 정렬
	this.css("position","absolute");
	//this.css("top", ((jQuery(window).height() - this.outerHeight()) / 2) + jQuery(window).scrollTop() + "px");
	this.css("left", ((jQuery(window).width() - this.outerWidth()) / 2) + jQuery(window).scrollLeft() + "px");
	return this;
}
$(function(){
	// 숫자만 입력 받기
	$('.tnum').keypress(function(event){
	  //alert(event.which);
	  if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)) {
	  } else {
		event.preventDefault();
	  }
	});

	// 핸드폰 번호만 입력 받기 ('-' 허용)
	$('.phone').keypress(function(event){
	  //alert(event.which);
	  if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == 45)) {
	  } else {
		event.preventDefault();
	  }
	});

	// 기본 리스트 전체 체크 ( Check Box )
	$("input[name='check_all']").click(function(){
		var sel = $(this).attr('checked');
		if(sel=='checked') $('.check_all').attr('checked',true);
		else $('.check_all').attr('checked',false);	
	});
	$('#start_day').datepicker({dateFormat: 'yy-mm-dd'});
	$('#end_day').datepicker({dateFormat: 'yy-mm-dd'});

	/* 날짜 선택에 따른 Value Sets */
	$('.set_day').click(function(){
		var sel_date = $(this).attr('date');
		var todate = new Date();

		switch(sel_date){
			case 'all': $('#start_day, #end_day').val(''); break;
			case 'today': $('#start_day, #end_day').datepicker('setDate', 'd'); break;
			case 'week':	// 이번주
				startDate = new Date(todate.getFullYear(), todate.getMonth(), todate.getDate() - todate.getDay());
				endDate = new Date(todate.getFullYear(), todate.getMonth(), todate.getDate() - todate.getDay() + 6);
				$('#start_day').datepicker('setDate', startDate);
				$('#end_day').datepicker('setDate', endDate); 
			break;
			case 'month':	 // 이번달
				startDate = new Date(todate.getFullYear(), todate.getMonth());
				endDate = new Date(todate.getFullYear(), todate.getMonth(), LastDayOfMonth(todate.getFullYear(), todate.getMonth()));
				$('#start_day').datepicker('setDate', startDate);
				$('#end_day').datepicker('setDate', endDate); 
			break;
			case 'yesterday': 
				$('#start_day').datepicker('setDate', '-1d');
				$('#end_day').datepicker('setDate', '-1d'); 
			break;
			case '3day': 
				$('#start_day').datepicker('setDate', '-3d'); 
				$('#end_day').datepicker('setDate', 'd'); 
			break;
			case '7day': 
				$('#start_day').datepicker('setDate', '-7d'); 
				$('#end_day').datepicker('setDate', 'd'); 
			break;
			case '15day': 
				$('#start_day').datepicker('setDate', '-15d'); 
				$('#end_day').datepicker('setDate', 'd'); 
			break;
			case '30day': 
				$('#start_day').datepicker('setDate', '-30d'); 
				$('#end_day').datepicker('setDate', 'd'); 
			break;
			case '60day': 
				$('#start_day').datepicker('setDate', '-60d'); 
				$('#end_day').datepicker('setDate', 'd'); 
			break;
			case '90day': 
				$('#start_day').datepicker('setDate', '-90d'); 
				$('#end_day').datepicker('setDate', 'd'); 
			break;
			case '120day': 
				$('#start_day').datepicker('setDate', '-120d'); 
				$('#end_day').datepicker('setDate', 'd'); 
			break;
		}
	});
});
$(function(){
	$('#login_passwd').keydown(function(event){
		if(event.keyCode==13){	 // 엔터키 이벤트
			member_login();
		}
	});
});
var member_login = function(){	// 회원 로그인
	$('#MemberLoginFrm').submit();
}
var member_logout = function( mb_id ){	// 회원 로그 아웃
	if(confirm('로그아웃 하시겠습니까?')){
		$.post("/include/regist.php", { mode:'logout_process'}, function(result){
			result = $.parseJSON(result);
			if(result.msg) alert(result.msg);
			if(result.move) location.href = result.move;
		});
	}
}
var is_members = function( url ){
	if( confirm('회원만 접근 가능합니다.\n\n로그인 하시겠습니까?') ){
		location.href = "/member/login.php?url=" + url;
		return false;
	}
}
var bookmarks = function(){	// 즐겨찾기

	// $('#favorite').on('click', function(e) {
		var bookmarkURL = window.location.href;
		var bookmarkTitle = document.title;
		var triggerDefault = false;

		if (window.sidebar && window.sidebar.addPanel) {
			// Firefox version < 23
			window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
		} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
			// Firefox version >= 23 and Opera Hotlist
			var $this = $(this);
			$this.attr('href', bookmarkURL);
			$this.attr('title', bookmarkTitle);
			$this.attr('rel', 'sidebar');
			$this.off(e);
			triggerDefault = true;
		} else if (window.external && ('AddFavorite' in window.external)) {
			// IE Favorite
			window.external.AddFavorite(bookmarkURL, bookmarkTitle);
		} else {
			// WebKit - Safari/Chrome
			alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
		}

		return triggerDefault;

	// });
}

function trim(str){
   //정규 표현식을 사용하여 화이트스페이스를 빈문자로 전환
   str = str.replace(/^\s*/,'').replace(/\s*$/, ''); 
   return str; //변환한 스트링을 리턴.
}

// 쿠키 입력
function set_cookies(name, value, expirehours, domain) {
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*expirehours));
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}

// 쿠키 얻음
function get_cookies(name) {
	var find_sw = false;
	var start, end;
	var i = 0;
	for (i=0; i<= document.cookie.length; i++){
		start = i;
		end = start + name.length;
		if(document.cookie.substring(start, end) == name) {
			find_sw = true
			break
		}
	}

	if (find_sw == true) {
		start = end + 1;
		end = document.cookie.indexOf(";", start);

		if(end < start)
			end = document.cookie.length;

		return document.cookie.substring(start, end);
	}
	return "";
}

// 쿠키 지움
function delete_cookies(name) {
	var today = new Date();

	today.setTime(today.getTime() - 1);
	var value = get_cookie(name);
	if(value != "")
		document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}
var font_size = 14;
var font_array = {12:14, 13:16, 14:18, 15:20};
var last_font;
var getFontSize = function () {
    var fontSize = parseInt(get_cookies("ck_fontsize")); // 폰트크기 조절
    if (isNaN(fontSize)) { fontSize = 14; }
    return fontSize;
}
var scroll_up = function(){// 페이지 상단으로 이동
	$('html, body').animate({scrollTop:0}, 800);
}
var leadingZeros = function (n, digits) {
	var zero = '';
	n = n.toString();
	if (n.length < digits) {
	for (i = 0; i < digits - n.length; i++)
	  zero += '0';
	}
	return zero + n;
}

// 삭제 검사 확인
function del(href){
    if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
        var iev = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                iev = parseFloat(RegExp.$1);
        }

        // IE6 이하에서 한글깨짐 방지
        if (iev != -1 && iev < 7) {
            document.location.href = encodeURI(href);
        } else {
            document.location.href = href;
        }
    }
}
