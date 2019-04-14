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
	<form id="status" name="checkedStatus">
		<label>
			<input type="radio" id="all" name="todo" value="all" checked>すべて
		</label>
		<label>
			<input type="radio" id="working" name="todo" value="working">作業中
		</label>
		<label>
			<input type="radio" id="complete" name="todo" value="complete">完了
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
	<input id="addTaskName" type="text" name="new_task" value="">
	<button id="addTaskButton">追加</button>
	<script type="text/javascript" src="<?php echo "todo.js?date=".date("YmdHis"); ?>"></script>
</body>
</html>

