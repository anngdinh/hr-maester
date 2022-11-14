migrate:
	npx sequelize-cli db:migrate
migrate-undo:
	npx sequelize-cli db:migrate:undo
migrate-reset:
	npx sequelize-cli db:migrate:undo:all
reset: migrate-reset migrate seed
	


seed-all:
	npx sequelize-cli db:seed:all
seed-undo:
	npx sequelize-cli db:seed:undo:all
seed:
	npx sequelize-cli db:seed:undo:all
	npx sequelize-cli db:seed:all



# npx sequelize-cli seed:generate --name create-custom-field