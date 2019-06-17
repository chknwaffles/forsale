class ItemSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :comments
  has_many :tags
  attributes :id, :name, :location
end
