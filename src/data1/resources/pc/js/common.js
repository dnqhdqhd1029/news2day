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
// �ъ빱��   -------------------------------------------------------------------*/
function bluring(){  
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();  
}  
document.onfocusin=bluring;
// �명뭼 鍮꾪솢�깊솕 諛곌꼍   -------------------------------------------------------------------*/
isDisabled = function (){
        for (var i=0; i<this.length; i++){
          if(this.item(i).disabled) this.item(i).style.backgroundColor="#e5e5e5";
        }
      }
      window.onload = function (){
        var input = document.getElementsByTagName("INPUT");
        //isDisabled.apply(input);  
      }
// �뚮옒�� 異쒕젰   -------------------------------------------------------------------*/	
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
// �뚮옒�� �쒖꽦��   -------------------------------------------------------------------*/
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
            // (\r\n�� 1byte 泥섎━) 
            if (escape(str) == '%0A') { 
            } else { 
                str_count++; 
                max_length--; 
            } 
        } 

        if (max_count < str_count) { 
            alert("湲��먯닔媛� "+ max_count +" byte �댁긽�� �ъ슜遺덇��� �⑸땲��"); 
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
//�띿뒪�몄뿉�대━�� 鍮꾩슦湲�
function OnEnter( field ) { if( field.value == field.defaultValue ) { field.value = ""; } } 
var selAll = function(){	// �꾩껜�좏깮
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
// �대떖 留덉�留됰궇吏�
var LastDayOfMonth = function(Year, Month) {
    return(new Date((new Date(Year, Month+1,1))-1)).getDate();
}
// 湲곕낯 �앹뾽李�
var win_open = function(a, b, c, k) {
    c = window.open(a, b, "width=" + c + ", height=" + k + ", scrollbars=no, resizable=no, status=no,top=" + (screen.height - 550) / 2 + ",left=" + (screen.width - 640) / 2);
    c.focus()	
}
// input field �쒓�/�レ옄/�곷Ц (onkeyup event)
var field_types = function( sel, type ){

	switch(type){
		case 'english':
			sel.value = sel.value.replace(/^a-zA-z]/g,'');
		break;
		case 'hangle':
			sel.value = sel.value.replace(/[^��-�롪�-��]/g,'');
		break;
		case 'number':
			sel.value = sel.value.replace(/[^0-9]/g,'');
		break;
	}

}
var file_download = function(link, file) {	// �뚯씪 �ㅼ슫濡쒕뱶
    document.location.href = link;
}
var isValidBlank = function(value) {
	var pattern = /[\s]/g;	///^\s+|\s+$/g;(/\s/g
	return (pattern.test(value)) ? true : false;
}
var CountChar = function( message, limit ){	 // 臾몄옄 bytes 怨꾩궛 msg_bytes id 媛믩쭔 �� 泥댄겕�섎㈃ ��
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
	if (nbytes*1 > limit*1) { // 諛붿씠�몃� 珥덇낵�덉쓣寃쎌슦
		alert("[" + availMsg + "] 源뚯� 諛쒖넚�⑸땲��.");
		//message.value = availMsg;
		$('#msg_bytes').html(limit*1);
		//message.focus();
		return;
	}
}
var CountCharText = function( message, limit, msg_bytes ){	 // text �꾨뱶 寃���
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
	if (nbytes*1 > limit*1) { // 諛붿씠�몃� 珥덇낵�덉쓣寃쎌슦
		//alert("[" + availMsg + "] 源뚯� �낅젰 媛��ν빀�덈떎.");
		$('#'+msg_bytes).html(limit*1);
		return;
	}
}
jQuery.fn.center = function () {	// 媛��대뜲 �뺣젹
	this.css("position","absolute");
	//this.css("top", ((jQuery(window).height() - this.outerHeight()) / 2) + jQuery(window).scrollTop() + "px");
	this.css("left", ((jQuery(window).width() - this.outerWidth()) / 2) + jQuery(window).scrollLeft() + "px");
	return this;
}
$(function(){
	// �レ옄留� �낅젰 諛쏄린
	$('.tnum').keypress(function(event){
	  //alert(event.which);
	  if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)) {
	  } else {
		event.preventDefault();
	  }
	});

	// �몃뱶�� 踰덊샇留� �낅젰 諛쏄린 ('-' �덉슜)
	$('.phone').keypress(function(event){
	  //alert(event.which);
	  if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == 45)) {
	  } else {
		event.preventDefault();
	  }
	});

	// 湲곕낯 由ъ뒪�� �꾩껜 泥댄겕 ( Check Box )
	$("input[name='check_all']").click(function(){
		var sel = $(this).attr('checked');
		if(sel=='checked') $('.check_all').attr('checked',true);
		else $('.check_all').attr('checked',false);	
	});
	$('#start_day').datepicker({dateFormat: 'yy-mm-dd'});
	$('#end_day').datepicker({dateFormat: 'yy-mm-dd'});

	/* �좎쭨 �좏깮�� �곕Ⅸ Value Sets */
	$('.set_day').click(function(){
		var sel_date = $(this).attr('date');
		var todate = new Date();

		switch(sel_date){
			case 'all': $('#start_day, #end_day').val(''); break;
			case 'today': $('#start_day, #end_day').datepicker('setDate', 'd'); break;
			case 'week':	// �대쾲二�
				startDate = new Date(todate.getFullYear(), todate.getMonth(), todate.getDate() - todate.getDay());
				endDate = new Date(todate.getFullYear(), todate.getMonth(), todate.getDate() - todate.getDay() + 6);
				$('#start_day').datepicker('setDate', startDate);
				$('#end_day').datepicker('setDate', endDate); 
			break;
			case 'month':	 // �대쾲��
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
		if(event.keyCode==13){	 // �뷀꽣�� �대깽��
			member_login();
		}
	});
});
var member_login = function(){	// �뚯썝 濡쒓렇��
	$('#MemberLoginFrm').submit();
}
var member_logout = function( mb_id ){	// �뚯썝 濡쒓렇 �꾩썐
	if(confirm('濡쒓렇�꾩썐 �섏떆寃좎뒿�덇퉴?')){
		$.post("/include/regist.php", { mode:'logout_process'}, function(result){
			result = $.parseJSON(result);
			if(result.msg) alert(result.msg);
			if(result.move) location.href = result.move;
		});
	}
}
var is_members = function( url ){
	if( confirm('�뚯썝留� �묎렐 媛��ν빀�덈떎.\n\n濡쒓렇�� �섏떆寃좎뒿�덇퉴?') ){
		location.href = "/member/login.php?url=" + url;
		return false;
	}
}
var bookmarks = function(){	// 利먭꺼李얘린

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
			alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D �ㅻ� �뚮윭 利먭꺼李얘린�� �깅줉�섏떎 �� �덉뒿�덈떎.');
		}

		return triggerDefault;

	// });
}

function trim(str){
   //�뺢퇋 �쒗쁽�앹쓣 �ъ슜�섏뿬 �붿씠�몄뒪�섏씠�ㅻ� 鍮덈Ц�먮줈 �꾪솚
   str = str.replace(/^\s*/,'').replace(/\s*$/, ''); 
   return str; //蹂��섑븳 �ㅽ듃留곸쓣 由ы꽩.
}

// 荑좏궎 �낅젰
function set_cookies(name, value, expirehours, domain) {
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*expirehours));
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}

// 荑좏궎 �살쓬
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

// 荑좏궎 吏���
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
    var fontSize = parseInt(get_cookies("ck_fontsize")); // �고듃�ш린 議곗젅
    if (isNaN(fontSize)) { fontSize = 14; }
    return fontSize;
}
var scroll_up = function(){// �섏씠吏� �곷떒�쇰줈 �대룞
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

// ��젣 寃��� �뺤씤
function del(href){
    if(confirm("�쒕쾲 ��젣�� �먮즺�� 蹂듦뎄�� 諛⑸쾿�� �놁뒿�덈떎.\n\n�뺣쭚 ��젣�섏떆寃좎뒿�덇퉴?")) {
        var iev = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                iev = parseFloat(RegExp.$1);
        }

        // IE6 �댄븯�먯꽌 �쒓�源⑥쭚 諛⑹�
        if (iev != -1 && iev < 7) {
            document.location.href = encodeURI(href);
        } else {
            document.location.href = href;
        }
    }
}

var ObjectUtils = {
    // 媛믪쓽 �좊Т 泥댄겕
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

    // 媛믪쓽 �좊Т 泥댄겕
    isNotEmpty: function (val) {
        var self = this;
        return !this.isEmpty(val);
    },

    //�レ옄 �몄� 泥댄겕
    isNumeric : function(val) {
        var self = this;
        if (!/^[0-9]+$/.test(val)) {
            return false;
        } else {
            return true;
        }
    },

    //�レ옄媛� �ы븿 �섏뼱 �덈뒗吏� 泥댄겕
    isContainNumber : function(val) {
        var self = this;
        if(/[0-9]/.test(val)){
            return true;
        } else {
            return false;
        }
    },

    // URL or IP �뺤떇 泥댄겕
    isDomain : function (val) {
        //TODO 泥댄겕 �뺤떇 �섏쨷�� ���대옃
        // var self = this;
        // if (/^((\*)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((\*\.)?([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,63}?))$/.test(val)) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    },

    //////////////////////// CONVERTER ///////////////////////

    //�좎쭨瑜� 臾몄옄濡� 蹂���
    dateToStr : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            console.error("date 媛믪씠 �놁뒿�덈떎.");
            return "";
        }
        return moment.utc(date).format(config.datetimeFormat);
    },

    //�좎쭨瑜� 臾몄옄濡� 蹂��� (YYYY-MM-DD)
    dateToStrFormat : function (date) {
        var self = this;
        if (self.isEmpty(date)) {
            //console.error("date 媛믪씠 �놁뒿�덈떎.");
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

    //�대떦 臾몄옄�� 紐⑤몢 移섑솚
    replaceAll : function (content, before, after) {
        return content.split(before).join(after);
    },
    //�먮━�� pad 0
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
	/*
    deviceChk : function (){
        var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
        for (var info in mobileKeyWords) {
            if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
                return true;

            }
        }
        return false;

    },
	*/
	 commaAdd : function(str){
    	/*泥ル떒�� 援щ텇湲고샇 異붽�*/
    	    str = String(str);    	 
    	    str = str.replace(/[^\d]+/g, '');
    	    str = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

    	    return str;

	 }


};
