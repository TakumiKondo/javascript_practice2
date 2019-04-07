<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" type="text/css" href="style.css">
	<title>todo list js</title>
</head>
<body>
	<h1>ToDoリスト</h1>
	<form name="selectStatus">
		<label>
			<input type="radio" id="all" name="todo" value="all" onclick="showTodos(this.value);" checked>すべて
		</label>
		<label>
			<input type="radio" id="working" name="todo" value="0" onclick="showTodos(this.value);">作業中
		</label>
		<label>
			<input type="radio" id="complete" name="todo" value="1" onclick="showTodos(this.value);">完了
		</label>
	</form>

	<table>
		<thead>
			<td>ID</td>
			<td>コメント</td>
			<td>状態</td>
			<td></td>
		</thead>
		<tbody id="todos">
		</tbody>
	</table>

	<h2>新規タスクの追加</h2>
	<input id="add_task_name" type="text" name="new_task" value="">
	<button id="addTaskButton" onclick="addTaskButtonClick();">追加</button>
	<script type="text/javascript" src="<?php echo 'todo.js?date='.date('YmdHis'); ?>"></script>
</body>
</html>

