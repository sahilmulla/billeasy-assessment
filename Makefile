CMD?=status

goose_pg:
	goose -dir ./db/pg/migrations postgres "postgres://billeasy:billeasy@localhost:5432/billeasy?sslmode=disable" $(CMD)