<?php

use yii\db\Migration;

/**
 * Class m240715_095105_add_data_to_users_table
 */
class m240715_095105_add_data_to_users_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->insert('{{%users}}', [
            'first_name' => 'Игорь',
            'last_name' => 'Харламов',
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->delete('{{%users}}', [
            'first_name' => 'Игорь',
            'last_name' => 'Харламов',
        ]);

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m240715_095105_add_data_to_users_table cannot be reverted.\n";

        return false;
    }
    */
}
