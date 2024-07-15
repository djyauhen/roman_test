<?php use yii\helpers\Url;?>


<a href="<?= Url::to(['/users/create']) ?>">Создать пользователя</a>

<table>
    <tr>
        <th>ФИО</th>
    </tr>
    <?php foreach ($users as $user): ?>
        <tr>
            <td><?= $user->first_name . ' ' . $user->last_name ?></td> <!-- Склеиваем имя и фамилию -->
            <td>
                <a href="<?= Url::to(['/users/view', 'id' => $user->id]) ?>">Просмотр деталей</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>