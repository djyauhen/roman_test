<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "users_lessons".
 *
 * @property int $user_id
 * @property int $lessons_ids
 * @property string $date
 */
class UsersLessons extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users_lessons';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'lessons_ids', 'date'], 'required'],
            [['user_id', 'lessons_ids'], 'integer'],
            [['date'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'user_id' => 'User ID',
            'lessons_ids' => 'Lessons Ids',
            'date' => 'Date',
        ];
    }

    // Связь между таблицами с пройденными уроками и уроками
    public function getLesson()
    {
        return $this->hasOne(Lessons::class, ['id' => 'lessons_ids']);
    }
}

