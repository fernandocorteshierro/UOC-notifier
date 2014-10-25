$(document).ready(function(){

	populate_options();
	populate_classrooms();

	$('#save_btn').on('click',function(){
		save_options();
		return false;
	});

	$(".alert").hide();
});

function populate_classrooms(){
	var classrooms = Classes.get_all();
	var content = "";
	for(var a in classrooms){
		content += populate_classroom(classrooms[a]);
	}
	$("#tclassrooms").html(content);
	$(".notify_classroom").on('click',function(){
		var classroom_code = $(this).attr('classroom');
		var notify = $(this).prop('checked');
		save_notify_classroom(classroom_code, notify);
	});
}

function populate_classroom(classroom){
	var checked = classroom.notify ? "checked" : "";
	return '<tr> \
				<td><input class="notify_classroom" type="checkbox" classroom="'+classroom.code+'" '+checked+'/></td>  \
				<td>'+classroom.title+'</td> \
			</tr>';
}

function populate_options(){
	var user_save = get_user();
	var uni = get_uni();
	var interval = get_interval();
	var critical = get_critical();
	var notitication = get_notification();
	$('#username').val(user_save.username);
	$('#pwd').val(user_save.password);
	$('#uni').val(uni);
	$('#check_interval').val(interval);
	$('#critical').val(critical);
	if(notification){
		$('#notification').attr('checked','checked');
	}
}

function save_options(){
	save_user($("#username").val(), $("#pwd").val());
	save_uni($("#uni").val());
	save_interval($("#check_interval").val());
	save_critical($("#critical").val());
	var notitication = $("#notification").is(':checked');
	save_notification(notitication);

	reset_session();
	check_messages(true);
	setup_alarm();

	$("#status").text("Options saved");
	$(".alert").show();
}