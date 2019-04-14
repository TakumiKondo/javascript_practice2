/**
*	ToDo（グルーバル変数）
*/
let todos = [];

/**
*	ステータスの列挙型
*/
const STATUS = {
	ALL : 'all',
	WORKING : 'working',
	COMPLETE : 'complete',
};

/**
*	画面初期表示時の処理
*/
window.onload = function(){
	init();

	// イベント登録（ステータス変更によるToDoリスト表示切替）
	const status = 
		document.getElementById('status').addEventListener('click', showByStatus, false);

	// イベント登録（追加ボタン）
	const addTaskButton = 
		document.getElementById('addTaskButton').addEventListener('click', addTaskButtonClick, false);

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
	const checkedStatus = document.checkedStatus.todo;
	for(let i = 0; i < checkedStatus.length; i++) {
		if (checkedStatus[i].checked) {
			showTodos(checkedStatus[i]);
		}
	}
}

/**
*	タスク追加ボタン押下イベント
*/
function addTaskButtonClick(){
	const addTaskName = document.getElementById('addTaskName');
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
	const addTaskName = document.getElementById('addTaskName').value;
	todos.push( {id:setTaskId(), name:addTaskName, state:STATUS.WORKING} );
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
		if (value.id === parseInt(obj.dataset.todoid) && value.state === STATUS.WORKING) {
			value.state = STATUS.COMPLETE;
		}
		return value;
	});
}

/**
*	タスクの表示処理
*	@param state String
*/
function showTodos(checkedStatus){
	let todoList = document.getElementById('todos');
	todoList.textContent = null;

	// すべて表示
	if (checkedStatus.value === STATUS.ALL) {
		todos.map(el => todoList.appendChild(createTodoElements(el)));
	}

	// 作業中または完了の場合はステータスでフィルタして表示
	if (checkedStatus.value === STATUS.WORKING || checkedStatus.value === STATUS.COMPLETE) {
		todos.filter(el => el.state === checkedStatus.value)
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
	let stateName = '';
	if (todo.state === STATUS.WORKING) {
		stateName = '作業中';
	}else if (todo.state === STATUS.COMPLETE) {
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
