dev:
	docker-compose -f docker-compose.dev.yaml up -d --force-recreate
	npx concurrently \
		"cd packages/type-express && yarn dev" \
		"cd packages/shared && yarn dev" \
		"cd packages/server && yarn dev" \
		"cd packages/client && yarn dev"