dev:
	docker-compose -f docker-compose.dev.yaml up -d --force-recreate --remove-orphans
	npx concurrently \
		"cd packages/type-express && yarn dev" \
		"cd packages/shared && yarn dev" \
		"cd packages/api && yarn dev" \
		"cd packages/client && yarn dev"

clear:
	rm -rf yarn.lock \
	rm -rf node_modules \
	rm -rf packages/client/yarn-error.log \
	rm -rf packages/client/node_modules \
	rm -rf packages/client/dist \
	rm -rf packages/shared/yarn-error.log \
	rm -rf packages/shared/node_modules \
	rm -rf packages/shared/dist \
	rm -rf packages/api/yarn-error.log \
	rm -rf packages/api/node_modules \
	rm -rf packages/api/dist \