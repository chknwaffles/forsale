class CommentSerializer < ActiveModel::Serializer
  belongs_to :item
  belongs_to :user
  attributes :id, :body, :user
end
