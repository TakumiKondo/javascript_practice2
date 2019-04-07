/**
*	ToDo（グルーバル変数）
*/
var todos = [];

/**
*	画面初期表示時の処理
*/
window.onload = function(){
	init();

	// イベント登録（ステータス変更によるToDoリスト表示切替）
	const status = document.getElementById('status');
	status.addEventListener('click', showByStatus, false);
}

/**
*	初期化処理
*/
function init(){
	document.getElementById('todos').innerHTML = '';
}

/**
*	表示ステータスによる表示処理
*/
function showByStatus(){
	var status = document.selectStatus.todo;
	for(var i=0; i<status.length; i++) {
		if (status[i].checked) {
			showTodos(status[i].value);
		}
	}
}

/**
*	タスク追加ボタン押下イベント
*/
function addTaskButtonClick(){
	var addTaskName = document.getElementById('add_task_name');
	if (addTaskName.value !== "") {
		addTask();
		valueClear(addTaskName);
	}
	showByStatus();
}

/**
*	タスク追加処理
*/
function addTask(){
	var addTaskName = document.getElementById('add_task_name').value;
	todos.push( {id:setTaskId(), name:addTaskName, state:0} );
}

/**
*	削除ボタン押下イベント処理
*/
function deleteTaskButtonClick(obj){
	todos = deleteTask(obj);
	showByStatus();
}

/**
*	タスク削除処理
*/
function deleteTask(obj){
	return todos.filter(ele => ele.id != obj.dataset.todoid);
}

/**
*	作業中ボタン押下イベント
*/
function changeStateButtonClick(obj){
	changeTask(obj);
	showByStatus();
}

/**
*	ステータス変更処理
*/
function changeTask(obj){
	todos.map(function(value, index, array){
		if (value.id === parseInt(obj.dataset.todoid) && value.state === 0) {
			value.state = 1;
		}
		return value;
	});
}

/**
*	タスクの表示処理
*	@param state String
*/
function showTodos(state){
	var todoList = '';
	for (var i=0; i<todos.length;i++){
		// all : all
		// 0 : working
		// 1 : complete 
		if (state === 'all') {
			todoList += createTodoElements(todos[i]);
		}
		if (todos[i].state === parseInt(state)) {
			todoList += createTodoElements(todos[i]);
		}
	}
	document.getElementById('todos').innerHTML = todoList;
}

/**
*	表示するエレメントの生成
*/
function createTodoElements(todo){
	var todos = '';

	// Element作成
	todos += '<tr>';
	todos += '<td>' + todo.id + '</td>';
	todos += '<td>' + todo.name + '</td>';
	var stateName = '';
	if (todo.state === 0) {
		stateName = '作業中';
	}else if (todo.state === 1) {
		stateName = '完了';
	}
	todos += '<td><button data-todoid=' + todo.id + 
				' onclick="changeStateButtonClick(this);">' + stateName + '</button></td>';
	todos += '<td><button data-todoid=' + todo.id +
				' onclick="deleteTaskButtonClick(this);">削除</button></td>';
	todos += '</tr>';

	return todos;
}

/**
*	タスクIDの設定
*	@param targetElement
*/
function setTaskId(){
	// 初期値は1
	if (todos.length === 0) { return 1 };

	// 追加する場合、IDの最大値に+1した値を設定
	var ids = new Array();
	for (var i=0; i<todos.length; i++) {
		ids.push(todos[i].id);
	}
	return Math.max.apply({}, ids) + 1;
}

/**
*	エレメントのValueを空値にする
*	@param targetElement
*/
function valueClear(targetElement){
	targetElement.value = "";
}
