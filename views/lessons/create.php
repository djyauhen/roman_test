<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Lessons $model */

$this->title = 'Create Lessons';
$this->params['breadcrumbs'][] = ['label' => 'Lessons', 'url' => ['index']];
?>
<div class="lessons-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
