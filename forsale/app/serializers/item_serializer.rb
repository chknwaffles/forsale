class ItemSerializer < ActiveModel::Serializer
  has_many :comments
  has_many :tags
  attributes :id, :name, :location
end
