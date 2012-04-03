class CreateSpiderUrls < ActiveRecord::Migration
  def change
    create_table :spider_urls do |t|
      t.string :mainSpiderUrl
      t.string :subSpiderUrl

      t.timestamps
    end
  end
end
