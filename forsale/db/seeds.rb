# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.create!(username: 'tigobittes', email: Faker::Internet.unique.email)
user2 = User.create!(username: 'ball harder', email: Faker::Internet.unique.email)
user3 = User.create!(username: 'lets get it', email: Faker::Internet.unique.email)
user4 = User.create!(username: 'suck on deez', email: Faker::Internet.unique.email)

tag1 = Tag.create!(name: 'instrument')
tag2 = Tag.create!(name: 'electronics')

guitar = Item.create!(name: 'Guitar', location: '11 Broadway New York, NY 1004', user_id: user1.id)
mouse = Item.create!(name: 'Gaming mouse', location: '11 Broadway New York, NY 1004', user_id: user2.id)
guitar2 = Item.create!(name: 'Better Guitar', location: '11 Broadway New York, NY 1004', user_id: user3.id)
ps4 = Item.create!(name: 'PS4', location: '11 Broadway New York, NY 1004', user_id: user4.id)

tag1.items.push(guitar)
tag2.items.push(mouse)
tag1.items.push(guitar2)
tag2.items.push(ps4)

guitar.tags.push(tag1)
guitar2.tags.push(tag1)
mouse.tags.push(tag2)
ps4.tags.push(tag2)