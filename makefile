dev:
	docker-compose -f docker-compose.dev.yaml up -d --force-recreate
	npx concurrently \
		"cd packages/express-decorators && yarn dev" \
		"cd packages/server && yarn dev"