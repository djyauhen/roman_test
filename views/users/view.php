<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\Users $model */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Users', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="users-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'first_name:ntext',
            'last_name:ntext',
        ],
    ]) ?>

    <h2>Пройденные уроки</h2>
    <table class="table">
        <thead>
        <tr>
<!--            <th>ID</th>-->
            <th>Название урока</th>
            <th>Дата и время прохождения урока</th>
            <!-- Другие столбцы таблицы уроков -->
        </tr>
        </thead>
        <tbody>
        <?php foreach ($completedLessons as $completedLesson): ?>
            <tr>
                <td><?= $completedLesson->lesson->title ?></td>
                <td><?= $completedLesson->date ?></td>
                <!-- Вывод других полей таблицы уроков -->
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

</div>


