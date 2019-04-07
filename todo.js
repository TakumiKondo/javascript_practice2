/**
*	ToDo（グルーバル変数）
*/
var todos = [];

/**
*	ステータスの列挙型
*/
var Status = {
	all : 'all',
	working : 0,
	complete : 1,
};

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
	for(var i = 0; i < status.length; i++) {
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
	if (addTaskName.value !== '') {
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
	todos.map(function(value, index){
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
	let todoList = document.getElementById('todos');
	todoList.textContent = null;

	// すべて表示
	if (state === Status.all) {
		todos.map(el => todoList.appendChild(createTodoElements(el)));
	}

	// 作業中または完了の場合はステータスでフィルタして表示
	let parsedState = parseInt(state);
	if (parsedState === Status.working || parsedState === Status.complete) {
		todos.filter(el => el.state === parsedState)
			 .map(el2 => todoList.appendChild(createTodoElements(el2)));
	}
}

/**
*	表示するエレメントの生成
*/
function createTodoElements(todo){

	// TodoリストのTRタグ
	let tr = document.createElement('tr');

	// ToDo ID
	let td = document.createElement('td');
	td.appendChild(document.createTextNode(todo.id));
	tr.appendChild(td);

	// ToDo 名称
	td = document.createElement('td');
	td.appendChild(document.createTextNode(todo.name));
	tr.appendChild(td);

	// ステータスボタン
	var stateName = '';
	if (todo.state === 0) {
		stateName = '作業中';
	}else if (todo.state === 1) {
		stateName = '完了';
	}
	td = document.createElement('td');
	let button = document.createElement('button');
	button.setAttribute('data-todoid', todo.id);
	button.setAttribute('onclick', 'changeStateButtonClick(this);');
	button.appendChild(document.createTextNode(stateName));
	td.appendChild(button);
	tr.appendChild(td);

	// 削除ボタン
	td = document.createElement('td');
	button = document.createElement('button');
	button.setAttribute('data-todoid', todo.id);
	button.setAttribute('onclick', 'deleteTaskButtonClick(this);');
	button.appendChild(document.createTextNode('削除'));
	td.appendChild(button);
	tr.appendChild(td);

	return tr;
}

/**
*	タスクIDの設定
*	@param targetElement
*/
function setTaskId(){
	// 初期値は1
	if (todos.length === 0) { return 1 };

	// 追加する場合、IDの最大値に+1した値を設定
	let ids = todos.map(el => el.id);
	return Math.max.apply({}, ids) + 1;
}

/**
*	エレメントのValueを空値にする
*	@param targetElement
*/
function valueClear(targetElement){
	targetElement.value = '';
}
